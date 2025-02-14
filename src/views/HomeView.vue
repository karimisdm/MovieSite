<script setup>
import { ref } from 'vue';



const showMore= ref(true);
const showOther = ref(false);
const showMovieGenre = ()=>{
   showMore.value = false;
   setTimeout(()=>{
    showOther.value = true;
   },1000)
};

</script>

<template>
  <div class="container">
    <h1 class="site_name">IAMDb</h1>
    <div class="search_bar">
      <img src="/public/searchIcon.svg" alt="icon for search" title="search" class="search_icon"/>
      <input type="text" id="search" name="search" class="search_section" />
      <img src="/public/microphoneIcon.svg" alt="icon for microphone" class="microphone_icon"/>
    </div>
    <div class="genre_movie">
      <button class="btn_genre" id="crime">Crime</button>
      <button class="btn_genre">Drama</button>
      <button class="btn_genre">Action</button>
      <button class="btn_genre">Biography</button>
      <button v-if="showMore" class="btn_genre showMore" @click="showMovieGenre()">Show More</button>
      <button v-if="!showMore" class="btn_genre">History</button>
      <button v-if="!showMore" class="btn_genre">Adventure</button>
      <button v-if="!showMore" class="btn_genre">Fantasy</button>
      <button v-if="!showMore" class="btn_genre">Western</button>
      <button v-if="!showMore" class="btn_genre">Comedy</button>
      <button v-if="!showMore" class="btn_genre">Sci-Fi</button>
      <button v-if="!showMore" class="btn_genre">Romance</button>
      <button v-if="!showMore" class="btn_genre">Mystery</button>
      <button v-if="!showMore" class="btn_genre">Family</button>
      <button v-if="!showMore" class="btn_genre">War</button>
      <button v-if="!showMore" class="btn_genre">Thriller</button>
      <button v-if="!showMore" class="btn_genre">Horror</button>
      <button v-if="!showMore" class="btn_genre">Music</button>
      <button v-if="!showMore" class="btn_genre">Animation</button>
      <button v-if="!showMore" class="btn_genre">Film-Noir</button>
      <button v-if="!showMore" class="btn_genre">Sport</button>
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


