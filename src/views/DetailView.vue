<script setup>
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { useFavoriteStore } from '@/stores/favoriteMovies';



const route = useRoute();
const movieId = route.params.id;
const information = ref(null);
const getInformationMovie = async ()=>{
    const response= await fetch(`https://moviesapi.codingfront.dev/api/v1/movies/${movieId}`);
    if(response.ok){
        const result = await response.json();
        information.value  = result;
    }else {
        return;
    }
};
onMounted(()=>{
    getInformationMovie();
});

const {favoriteItems,selectMovies}= useFavoriteStore();

</script>

<template>
    <div class="image_header" v-if="information">
        <img :src="information.images" alt="picture of movie" class="dynamic_image"/>
        <div class="gradient_header"></div>
    </div>
    <div class="container">
        <div class="wrapper">
           <div class="flash_back return_section">
              <RouterLink to="/list"><div class="vector"><img src="/public/angle-left.svg" alt="picture of angle"/></div></RouterLink>   
            </div>
            <div v-if="information" class="flex_detail">
                <div class="movie_image">  
                    <img :src="information.poster" alt="pic of movie"/>
                    <div class="flex_bar">
                        <div class="progress_bar">
                            <span class="number">{{ information.imdb_rating }}</span>
                            <svg width="100px" height="100px" class="box">
                              <circle cx="50" cy="50" r="40" stroke="#724CF9" stroke-width="20" fill="none" :stroke-dashoffset="(251 - (information.imdb_rating / 10) * 251)"/>
                            </svg>
                        </div>
                        <div class="rate">
                            <span class="votes">{{ information.imdb_votes }}</span>
                            <p class="text_vote">rating on IMDB</p>
                        </div>
                    </div>
                    <div class="metrics">
                       <p> {{Math.round(information.imdb_rating*10)}}% on Rotten Tomatoes</p>
                       <p>{{ information.metascore}}/100 on Metacritic</p>
                    </div> 
                </div>
                <div class="details">
                    <div class="flex_detail">
                       <div><strong class="movie_title">{{ information.title }} </strong></div> 
                       <div>
                        <div @click ="selectMovies(information)" class="favorite">
                          <span v-if="!favoriteItems.includes(information.id)"><img src="../assets/images/heart_icon.svg" width="24px"/></span> 
                          <span v-else><img src="../assets/images/heartColored_icon.svg" width="24px"/></span>
                        </div>
                       </div> 
                    </div>
                   <div class="genres"><small>{{ information.genres.join(',') }}</small></div>
                   <p class="movie_description">{{ information.plot }}</p>
                   <ul class="flex_detail scores">
                    <li class="movie_history">{{ information.rated }}</li>
                    <li class="movie_history">{{ information.released }}</li>
                    <li class="movie_history">
                        <div class="flex_detail">
                            <div class="clock_icon"><img src="../assets/images/clock.svg"/></div>
                            <div>{{ information.runtime }}</div> 
                        </div>
                        
                    </li>
                   </ul>
                   <div class="detail_box">
                    <strong class="text_Detail">Details</strong>
                    <ul class="costs">
                        <li>
                            <div class="flex_detail">
                                <div class="costs_text">Directors</div>
                                <div class="costs_name">{{ information.director }}</div>
                            </div>
                        </li>
                        <li>
                            <div class="flex_detail">
                                <div class="costs_text">Writers</div>
                                <div class="costs_name">{{ information.writer }}</div>
                            </div>
                        </li>
                        <li>
                            <div class="flex_detail">
                                <div class="costs_text">Actors</div>
                                <div class="costs_name">{{ information.actors }}</div>
                            </div>
                        </li>
                        <li>
                            <div class="flex_detail">
                                <div class="costs_text">Country</div>
                                <div class="costs_name">{{ information.country }}</div>
                            </div>
                        </li>
                        <li>
                            <div class="flex_detail">
                                <div class="costs_text">Language</div>
                                <div class="costs_name">{{ information.language }}</div>
                            </div>
                        </li>
                        <li>
                            <div class="flex_detail">
                                <div class="costs_text">Awards</div>
                                <div class="costs_name">{{ information.awards }}</div>
                            </div>
                        </li>
                    </ul>
                   </div>
                </div>
            </div>
            <br/>
        </div>
    </div>
    
</template>
<style scoped>
.flash_back {
    width: 100%;
}
.return_section {
    margin-bottom: 220px;
}
.flex_detail {
    display: flex;
    justify-content: space-between;
}
.detail_box {
    margin-top: 20px;
}
.details {
    flex-grow: 2;
    padding-left: 30px;
}
.text_Detail {
    font-weight: 700;
    font-size: 28px;
    line-height: 50px;
    padding: 15px 20px 15px 0;
}

.movie_title {
    font-weight: 700;
    font-size: 48px;
    line-height: 58.09px;
}
.movie_image {
    flex-grow: 1;
}
.movie_image img{
   width: 235px;
   height: 312px;
   border-radius: 18px;
}
.scores {
    width: 240px;
}
.movie_history {
    font-weight: 400;
    font-size: 12px;
    line-height: 14.52px;
    border-radius: 8px;
    padding: 6px 12px;
    background-color: #222C4F;
    margin-top: 10px;
    margin-bottom: 10px;
}
.movie_description {
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-align: justify;
    color: #FFFFFF99;
}
.flex_bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 22px;
}
/* progress bar*/
.progress_bar {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    color: grey;
    outline: 2px solid #724CF9;
    outline-offset: -1px;
}
.progress_bar::after,
.number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.progress_bar::after {
    content: '';
    width: 60px;
    height: 60px;
    border-radius: inherit;
    outline: inherit;
}
.number {
    font-weight: 700;
    font-size: 24px;
    line-height: 29.05px;
    letter-spacing: 0%;
    text-align: center;
    color: white;
}
.box {
    stroke-dasharray: 251;
    transform: rotate(-90deg);
    animation: 2s linear forwards;
}
.votes {
    font-size: 16px;
    opacity: 80%;
}
.text_vote {
    font-size: 14px;
    opacity: 60%;
}
.rate {
    width: 100px;
}

.costs {
    margin-top: 10px;
}
.costs li {
    padding-top: 20px;
    padding-bottom: 7px;
}

.costs_text {
    width: 40%;
    font-weight: 700;
    font-size: 16px;
    line-height: 19.36px;
    opacity: 80%;
}
.costs_name {
    width: 60%;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.94px;
    opacity: 60%;
}
.costs li:not(:last-child) {
    border-bottom: 1px solid  #222C4F;
}
.image_header {
   position: relative;
   width: 100%;
}
.dynamic_image{
    width: 100%;
    height: auto;
    object-fit: cover;
    margin-top: -120px; 
}
.gradient_header {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(7, 13, 35, 0) 0%, rgba(7, 13, 35, 0.7) 28.5%, rgba(7, 13, 35, 0.9) 60%, #070D23 99%);
    right: 0;
    bottom: 0;   
}
.wrapper {
    position: absolute;
    top: 50px;
    left: 200px;
    right: 200px;
    padding-bottom: 100px;
}
.genres {
    font-weight: 300;
    font-size: 12px;
    line-height: 14.52px;
    opacity: 40%;
    margin-top: -5px;
}
.favorite {
    margin-top: 22px;
}
.metrics {
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    opacity: 50%;
    margin-top: 20px;
}
.clock_icon {
    padding-right: 4px;
}


</style>