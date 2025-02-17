<script setup>
import { ref } from 'vue';



const showMore= ref(true);
const showOther = ref(false);
const showMovieGenre = ()=>{
   showMore.value = !showMore.value;
};
const detailMovie = ref(null);
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
getMoviesDetail();

</script>

<template>
  <div class="container">
    <h1 class="site_name">IAMDb</h1>
    <div class="search_bar">
      <img src="/public/searchIcon.svg" alt="icon for search" title="search" class="search_icon"/>
      <input type="text" id="search" name="search" class="search_section" />
      <img src="/public/microphoneIcon.svg" alt="icon for microphone" class="microphone_icon"/>
    </div>
    
    <div v-if="detailMovie" class="genre_movie">
        <ul>
          <li v-for="genre in detailMovie.genres">
            <button>{{ genre }}</button>
          </li>
        </ul>

    </div>
  </div>

</template>
<style>
.site_name {
  font-family: Inter;
  font-size: 140px;
  font-weight: 900;
  line-height: 169.43px;
  text-align: center;
  color: #FFFFFF;
}
.search_bar {
  position: relative;
}
.search_icon {
  position: absolute;
  left: 15px;
  top: 25%;
}
.microphone_icon {
  position: absolute;
  right: 15px;
  top: 25%;
  border-left: solid 2px black;
  padding-left: 15px;
}

.search_section {
  width: 100%;
  height: 48px;
  padding: 12px 16px 12px 16px;
  gap: 0px;
  border-radius: 16px;
  background-color: #222C4F;
  border: solid 1px #222C4F;
}

.genre_movie {
  width: 100%;
  text-align: center;
  margin-top: 25px;
  padding: 0px 117px;
}

.btn_genre {
  height: 27px;
  padding: 6px 12px 6px 12px;
  border-radius: 8px;
  background-color: #222C4F;
  color: white;
  border: 0px;
  margin-left: 8px;
  margin-top: 8px;
}

.showMore {
  display: inline;
}
.beforeShow {
  display: none;
}

@media (max-width:500px) {
  .site_name {
    font-size: 100px;
    padding-top: 45%;
  }
  .genre_movie {
    padding: 0px 10px;
  }

  
}
</style>


