<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';
import { useFavoriteStore } from '@/stores/favoriteMovies';
import Detail from './Detail.vue';

const route = useRoute();
const router = useRouter();
const detailMovie = ref(null);
const genre = ref(route.params.genre);
const value = ref(route.params.value);
const searchQuery = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const movies = ref([]);
const transcript = ref('');
const isRecording = ref(false);
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition();

const getMoviesDetail = async (query = "", page = 1) => {
    let url = "";
    if (genre.value) {
        url = `https://moviesapi.codingfront.dev/api/v1/genres/${genre.value}/movies?q=${query}&page=${page}`;
    } else if (query) {
        url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${query}&page=${page}`;
    } else {
        url = `https://moviesapi.codingfront.dev/api/v1/movies?page=${page}`;
    }

    try {
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            if (page === 1) {
                movies.value = result.data;
            } else {
                movies.value = [...movies.value, ...result.data];
            }
            let item_per_page = result.metadata.per_page; 
            if (item_per_page > 1) {
                totalPages.value = Math.ceil(result.metadata.total_count/item_per_page); 
            }
        } else {
            console.error("Failed to fetch movies:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

const debouncedSearch = debounce(async (query) => {
    currentPage.value = 1;
    await getMoviesDetail(query, currentPage.value);
}, 300);

watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery.trim());
});

onMounted(() => {
    getMoviesDetail();
    if (route.params.value) {
        searchQuery.value = route.params.value;
        getMoviesDetail(route.params.value);
    };
    sr.continuous = true;
  sr.interimResults = true;

  sr.onstart = ()=>{
    isRecording.value = true;
  };

  sr.onend = ()=>{
    isRecording.value = false;
  };

  sr.onresult = (evt)=> {
    const t = Array.from(evt.results).map(result => result[0]).map(result => result.transcript).join(' ');

    transcript.value = t ;
    searchQuery.value = t;
  };
});
const ToggleMic = ()=>{
  if(isRecording.value){
    sr.stop();
  }else {
    sr.start();
  }
};

const nextPage = async () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        await getMoviesDetail(searchQuery.value, currentPage.value);
    }
};

const favoriteStore = useFavoriteStore();
const { favoriteItems, selectMovies } = favoriteStore;
</script>

<template>
    <div class="container">
        <div class="result">
            <RouterLink to="/"><div class="vector"><img src="/public/angle-left.svg"/></div></RouterLink>
            <div class="title_res">Result</div>
            <div class="space"></div>
        </div>
        <div class="search_bar">
            <img src="/public/searchIcon.svg" alt="icon for search" title="search" class="search_icon" />
            <input v-model="searchQuery" type="text" id="search" name="search" class="search_section" />
            <img src="/public/microphoneIcon.svg" alt="icon for microphone" class="microphone_icon" @click="ToggleMic"/>
        </div>
        <div class="movies" v-if="movies.length">
            <ul>
                <li v-for="movie in movies" :key="movie.id" class="flex_items">
                    <RouterLink :to="{ name: 'detail', params: { id: movie.id } }" class="router">
                        <div class="movies_detail flex">
                            <div><img :src="movie.images" class="movies_img" /></div>
                            <div class="movies_information">
                                <div><strong class="movies_title">{{ movie.title }}</strong></div>
                                <div class="movies_genre"><span>{{ movie.genres.join(',') }}</span></div>
                                <div class="movie_desc flex_desc">
                                    <small class="movie_year">{{ movie.year }}</small>
                                    <div class="dot"></div>
                                    <small class="movie_year">{{ movie.country }}</small>
                                    <div class="dot"></div>
                                    <div class="flex_star">
                                        <div class="star"></div>
                                        <div><small>{{ movie.imdb_rating }}</small></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RouterLink>
                    <div>
                        <button @click="selectMovies(movie)" class="btn_favorite">
                            <span v-if="!favoriteItems.includes(movie.id)">
                                <img src="../assets/images/heart_icon.svg" width="24px" />
                            </span>
                            <span v-else><img src="../assets/images/heartColored_icon.svg" width="24px" /></span>
                        </button>
                    </div>
                </li>
            </ul>
            <div><button @click="nextPage" :disabled="currentPage >= totalPages" class="pagination">Next Page</button></div>
        </div>
        <div v-else>
            <Detail />
        </div>
    </div>
</template>

<style>
.result {
    width: 100%;
    color: white;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.78px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.title_res {
    flex-grow: 4;
}
.vector {
    width: 40px;
    height: 40px;
    border-radius: 16px;
    background-color: #222C4F;
    text-align: center;
}
.vector img {
    margin-top: 23%;
}
.space {
    width: 40px;
}
.movies li {
    display: flex;
    margin-top: 25px;
    height: 137px;
}
.movies li:not(:last-child) {
    border-bottom: solid 1px #222C4F;
}
.movies_img {
    width: 137px;
    object-fit: cover;
    border-radius: 18px;
    height: 100%;
}
.movies_title {
    font-size: 28px;
    font-weight: 700;
    line-height: 33.89px;
    text-align: left;
}
.movies_detail {
    padding-bottom: 5px;
    height: 100%;
}
.movies_genre {
    font-size: 12px;
    font-weight: 300;
    line-height: 14.52px;
    opacity: 40%;
    margin-top: -2px;
}
.flex_star {
    display: flex;
    align-items: center;
}
.star {
    width: 14px;
    height: 14px;
    background-color: #F2C94C;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    margin-right: 3px;
}
.btn_favorite {
    width: 30px;
    height: 30px;
    background-color: #070D23;
    border: #070D23;
}
.btn_favorite:hover img {
    background-image: url(../assets/images/icon.svg);
}
.flex_items {
    display: flex;
    justify-content: space-between;
}
.router {
    text-decoration-line: none;
    color: white;
}

.movie_desc {
    font-size: 18px;
    opacity: 80%;
    margin-top: 12px;
}
.movies_information {
    padding: 3px 15px;
    margin-top: 13px;
}
.flex_desc {
    display: flex;
    align-items: center;
}
.dot {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: #222C4F;
    margin: 0 15px;
}
.pagination {
    background-color: #222C4F;
    color: white;
    padding: 10px 16px;
    margin-left: 40%;
    margin-top: 15px;
    margin-bottom: 20px;
    border-radius: 12px;
    border: solid #222C4F;
    font-size: 18px;
    text-align: center;
}
@media (max-width: 500px) {
    .movies_title {
        font-size: 24px;
    }
    .movies_img {
        width: 122px;
        height: 123px;
    }
    .movie_desc {
        margin-top: 10px;
    }
    .movies li {
        height: auto;
        margin-top: 0px;
        padding: 17px 7px;
    }
    .flex_desc {
        flex-wrap: wrap;
    }
    .movies_information {
        margin-top: 0px;
    }
    .btn_favorite {
        width: 24px;
        height: 24px;
    }
    .result {
        margin-top: 17px;
    }
    .pagination {
        font-size: 14px;
        padding: 7px 14px;
    }
}
</style>