<script setup>
import { ref } from 'vue';

const information = ref(null);
const getInformationMovie = async ()=>{
    const response= await fetch("https://moviesapi.codingfront.dev/api/v1/movies/3");
    if(response.ok){
        const result = await response.json();
        information.value  = result;
    }else {
        return;
    }
};

</script>

<template>
    <div class="image_header" v-if="information">
        <img :src="information.images" alt="picture of movie" class="dynamic_image"/>
        <div class="gradient_header"></div>
    </div>
    <div class="container">
        <div class="wrapper">
           <div class="flash_back">
              <div class="vector"><img src="/public/angle-left.svg"/></div>
            </div>
            <div v-if="information" class="flex_detail">
                <div class="movie_image">  
                    <img :src="information.poster" alt="pic of movie"/>
                    <div class="flex">
                        <div class="progress_bar">
                            <span class="number">{{ information.imdb_rating }}</span>
                            <svg width="150px" height="150px" class="circle">
                               <circle cx="75" cy="75" r="65" stroke="#724CF9" stroke-width="20" fill="none" :stroke-dashoffset="(information.imdb_rating * 100)"/>
                            </svg>

                        </div>
                        <div class="rate">
                            <span class="votes">{{ information.imdb_votes }}</span>
                            <p class="text_vote">rating on IMDB</p>
                        </div>
                    </div>
                    
                </div>
                <div class="details">
                   <strong class="movie_title">{{ information.title }} </strong><br/>
                   <small>{{ information.genres.join(',') }}</small><br/>
                   <p class="movie_description">{{ information.plot }}</p>
                   <ul class="flex_detail scores">
                    <li class="movie_history">{{ information.rated }}</li>
                    <li class="movie_history">{{ information.released }}</li>
                    <li class="movie_history">{{ information.runtime }}</li>
                   </ul>
                   <div>
                    <strong>Details</strong>
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
            <button @click="getInformationMovie">MovieFeatures</button>
        </div>
    </div>
    
</template>
<style scoped>
.flesh_back {
    width: 100%;
}
.flex_detail {
    display: flex;
    justify-content: space-between;
}
.details {
    flex-grow: 2;
    padding-left: 25px;
    margin-top: 220px;
}
.scores {
    width: 50%;
}
.movie_title {
    font-weight: 700;
    font-size: 48px;
    line-height: 58.09px;
}
.movie_image {
    flex-grow: 1;
    margin-top: 220px;
}
.movie_image img{
   width: 235px;
   height: 312px;
   border-radius: 18px;
}
.movie_history {
    border-radius: 8px;
    padding: 6px 12px;
    background-color: #222C4F;
    margin-top: 10px;
    margin-bottom: 10px;
}
.movie_description {
    margin-top: 15px;
    margin-bottom: 15px;
}
/* progress bar*/
.progress_bar {
    position: relative;
    width: 150px;
    height: 150px;
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
    width: 110px;
    height: 110px;
    border-radius: inherit;
    outline: inherit;
}
.number {
    font-size: 21px;
    font-weight: bold;
}
.circle {
    stroke-dasharray: 410;
    /* stroke-dashoffset: 70; */
    transform: rotate(-90deg);
    animation: 2s linear forwards;
}
.votes {
    font-size: 16px;
}
.text_vote {
    font-size: 14px;
    opacity: 60%;
}
.rate {
    width: 100px;
}

.costs_text {
    width: 40%;
}
.costs_name {
    width: 60%;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.94px;
    letter-spacing: 0%;
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
    /* border: solid red; */
    position: absolute;
    top: 50px;
    left: 200px;
    right: 200px;
}


</style>