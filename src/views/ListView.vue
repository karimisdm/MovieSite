<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash';
import { useFavoriteStore } from '@/stores/favoriteMovies';

const route = useRoute();
const router = useRouter();
const detailMovie = ref(null);
const genre = ref(route.params.genre);
const value = ref(route.params.value);
const searchQuery = ref("");

const getMoviesDetail = async (query = "") => {
    let url = "";
    if (genre.value) {
        url = `https://moviesapi.codingfront.dev/api/v1/genres/${genre.value}/movies?page={page}`;
    } else if (query) {
        url = `https://moviesapi.codingfront.dev/api/v1/movies?q=${query}&page={page}`;
    } else {
        url = "https://moviesapi.codingfront.dev/api/v1/movies?page={page}";
    }

    try {
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            detailMovie.value = result;
        } else {
            console.error("Failed to fetch movies:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

const debouncedSearch = debounce(async (query) => {
    if (query.length == 0) {
        await getMoviesDetail('');
        //router.replace(`/lst/${query}`);
    } else {
        await getMoviesDetail(query);
    }
}, 300);

watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery.trim());
});

onMounted(() => {
    getMoviesDetail();
    if (route.params.value) {
        searchQuery.value = route.params.value;
        getMoviesDetail(route.params.value);
    }
});

const favoriteStore = useFavoriteStore();
const {favoriteItems , addFavorite, removeFavorite,selectMovies} = favoriteStore;

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
            <input v-model="searchQuery"  type="text" id="search" name="search" class="search_section" />
            <img src="/public/microphoneIcon.svg" alt="icon for microphone" class="microphone_icon" />
        </div>
        <div class="movies">
            <ul v-if="detailMovie">
                <li v-for="movie in detailMovie.data" class="flex_items">
                  <RouterLink :to="{name:'detail', params:{id:movie.id} }" class="router">
                    <div class="movies_detail flex">
                       <div><img :src="movie.images" class="movies_img"/></div>
                       <div class="movies_information">
                         <div><strong class="movies_title">{{ movie.title }}</strong></div>
                         <div><span class="movies_genre">{{ movie.genres.join(',') }}</span></div> 
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
                    <button @click ="selectMovies(movie)" class="btn_favorite">
                      <span v-if="!favoriteItems.includes(movie.id)"><img src="../assets/images/heart_icon.svg" width="24px"/></span> 
                      <span v-else><img src="../assets/images/heartColored_icon.svg" width="24px"/></span>
                    </button> 
                </div>
                </li> 
            </ul>
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
    margin-top: -8px;   
}
.flex_star {
    display: flex;
    align-items: center;
}
.star {
    width: 14px;
    height: 14px;
    background-color:#F2C94C;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    margin-right: 3px;
}
.btn_favorite {
    width: 30px;
    height: 30px;
    background-color: #070D23;
    border: #070D23; 
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
</style>