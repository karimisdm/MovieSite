<script setup>
import { ref } from 'vue';

const information = ref(null);
const getInformationMovie = async ()=>{
    const response= await fetch("https://moviesapi.codingfront.dev/api/v1/movies/1");
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
                    <img :src="information.images" alt="pic of movie" width="200px"/>
                    <div class="flex">
                        <div>circle-</div>
                        <div>rating</div>
                    </div>
                    <p>on Metacritic</p>
                </div>
                <div class="details">
                    {{ information.title }} 
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
.movie_image img{
    width: 208;
    height: 312;
    border-radius: 18px;
}
</style>