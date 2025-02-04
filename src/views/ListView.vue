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
            <ul>
                <li>
                    <div v-if="detailMovie" style="display: flex;">
                        {{ detailMovie.data[0].title}}
                        <img :src="detailMovie.data[0].images"  width="300px"/>
                    </div>      
                </li>
                <li>
                    <div v-if="detailMovie" style="display: flex;">
                        {{ detailMovie.data[1].title}}
                        <img :src="detailMovie.data[1].images"  width="300px"/>
                    </div>      
                </li>
                <li>
                    <div v-if="detailMovie" style="display: flex;">
                        {{ detailMovie.data[2].title}}
                        <img :src="detailMovie.data[2].images"  width="300px"/>
                    </div>      
                </li>
                <li>
                    <div v-if="detailMovie" style="display: flex;">
                        {{ detailMovie.data[3].title}}
                        <img :src="detailMovie.data[3].images"  width="300px"/>
                    </div>      
                </li>
                <li>
                    <div v-if="detailMovie" style="display: flex;">
                        {{ detailMovie.data[4].title}}
                        <img :src="detailMovie.data[4].images"  width="300px"/>
                    </div>      
                </li>
             
            </ul>
        </div>
        <button @click="getMoviesDetail">Get</button><br/>

          
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
</style>