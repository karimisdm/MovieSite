<script setup>
import { ref } from 'vue';


const detailMovie = ref(null)
const getMoviesDetail = async ()=>{
    const response = await fetch("https://moviesapi.codingfront.dev/api/v1/movies?page={page}");
    if(response.ok){
        const result = await response.json();
        console.log(result);
        detailMovie.value = result;
    }else{
        return;
        
    }
};
const getFilteredMovieNames = ()=>{
    const arrName =[];
    // detailMovie.foreach((movie)=>{
        detailMovie.data.foreach((title)=>{
            arrName.push(title);

        });
    return arrName;

}

</script>
<template>
    <div class="container">
        <div class="result">
            <div class="vector"><img src="/public/angle-left.svg"/></div>
            <div class="title_res">Result</div>
            <div class="space"></div>
        </div>
        <div class="search_bar">
            <img src="/public/searchIcon.svg" alt="icon for search" title="search" class="search_icon" />
            <input type="text" id="search" name="search" class="search_section" />
            <img src="/public/microphoneIcon.svg" alt="icon for microphone" class="microphone_icon" />
        </div>
        <div class="movies">
            <ul v-if="detailMovie">
                <li v-for="movie in detailMovie.data">
                    <div class="movies_detail">
                       <img :src="movie.images" class="movies_img"/>
                       {{ movie.title }}
                    </div>
                </li> 
            </ul>
        </div>
        <button @click="getMoviesDetail">Get</button>      
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
}
.vector img {
    margin-top: 23%;
    margin-right: 10%;
}
.space {
    width: 40px;
}
.movies li {
    display: flex;
    margin-top: 25px;
    height: 137px;
}
.movies_img {
    width: 137px;
    object-fit: cover;
    border-radius: 18px;
}
.movies_detail {
    width: 50%;
    display: flex;
}
</style>