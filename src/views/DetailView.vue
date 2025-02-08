<script setup>
import { ref } from 'vue';


const getInformationMovie = async ()=>{
   const information = ref(null);
    const response= await fetch("https://moviesapi.codingfront.dev/api/v1/movies/1");
    if(response.ok){
        const result = await response.json();
        information.value  = result;
    }else {
        return;
    }
};
getInformationMovie();


</script>




<template>
    <div class="container">
        <div class="flash_back">
            <div class="vector"><img src="/public/angle-left.svg"/></div>
            <div class="flex_detail">
                <div class="movie_image">Pic</div>
                <div v-if="information">Details:

                    {{ information }}
                </div>

            </div>

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
</style>