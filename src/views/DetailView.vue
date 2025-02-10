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
                        <div class="circle_score">{{ information.imdb_rating }}</div>
                        <div>{{ information.imdb_votes }}</div>
                    </div>
                    <p>on Metacritic</p>
                </div>
                <div v-if="information" class="details">
                   <strong class="movie_title">{{ information.title }} </strong> 
                   <small>{{ information.genre }}</small><br/>
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
</style>