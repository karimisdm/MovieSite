<script setup>

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
      <button class="btn_genre">Crime</button>
      <button class="btn_genre">Drama</button>
      <button class="btn_genre">Action</button>
      <button class="btn_genre">Biography</button>
      <button class="btn_genre showMore">Show More</button>
      <button class="btn_genre beforeShow">History</button>
      <button class="btn_genre beforeShow">Adventure</button>
      <button class="btn_genre beforeShow">Fantasy</button>
      <button class="btn_genre beforeShow">Western</button>
      <button class="btn_genre beforeShow">Comedy</button>
      <button class="btn_genre beforeShow">Sci-Fi</button>
      <button class="btn_genre beforeShow">Romance</button>
      <button class="btn_genre beforeShow">Mystery</button>
      <button class="btn_genre beforeShow">Family</button>
      <button class="btn_genre beforeShow">War</button>
      <button class="btn_genre beforeShow">Thriller</button>
      <button class="btn_genre beforeShow">Horror</button>
      <button class="btn_genre beforeShow">Music</button>
      <button class="btn_genre beforeShow">Animation</button>
      <button class="btn_genre beforeShow">Film-Noir</button>
      <button class="btn_genre beforeShow">Sport</button>

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
  padding: 0px 100px;
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


