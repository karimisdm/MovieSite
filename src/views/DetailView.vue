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
    <div class="container">
        <div class="flash_back">
            <div class="vector"><img src="/public/angle-left.svg"/></div>
            <div v-if="information" class="flex_detail">
                <div class="movie_image">  
                    <img :src="information.images" alt="pic of movie"/>
                    <div class="flex">
                        <div class="progress_bar">
                            <span class="number"></span>
                            <svg width="150px" height="150px" class="circle">
                               <circle cx="75" cy="75" r="65" stroke="#724CF9" stroke-width="20" fill="none" :stroke-dashoffset="information.imdb_rating"/>
                            </svg>

                        </div>
                        <div>
                            {{ information.imdb_votes }}
                            <span>ratings on IMDB</span>
                        </div>
                    </div>
                    
                </div>
                <div class="details">
                   <strong class="movie_title">{{ information.title }} </strong><br/>
                   <small>{{ information.genres.join(',') }}</small><br/>
                   <p class="movie_description">{{ information.plot }}</p>
                   <ul class="flex_detail">
                    <li class="movie_history">{{ information.rated }}</li>
                    <li class="movie_history">{{ information.released }}</li>
                    <li class="movie_history">{{ information.runtime }}</li>
                   </ul>
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
    background-color: blue;
    padding-left: 25px;
}
.details ul {
    width: 40%;
}
.movie_title {
    font-weight: 700;
    font-size: 48px;
    line-height: 58.09px;
}
.movie_image img{
   width: 208px;
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
</style>