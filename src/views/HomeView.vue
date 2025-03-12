
<script setup>
import { computed, onMounted, ref, watch} from 'vue';
import _ from 'lodash';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
const secondRouter = useRouter();
const genres = ref(null);
const transcript = ref('');
const isRecording = ref(false);
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const sr = new Recognition();



const getMovieGenres = async ()=>{
    const response = await fetch("https://moviesapi.codingfront.dev/api/v1/genres");
    if(response.ok){
        const result = await response.json();
        genres.value = result;
    }else{
        return;
        
    }
};
onMounted(()=>{
  getMovieGenres();

  sr.continuous = true;
  sr.interimResults = true;

  sr.onstart = ()=>{
    isRecording.value = true;
  };

  sr.onend = ()=>{
    isRecording.value = false;
  };

  sr.onresult = (evt)=> {
    const t = Array.from(evt.results).map(result => result[0]).map(result => result.transcript).join(' ');

    transcript.value = t ;
    query.value = t;
  }
});


const showMore= ref(false);

const getGenre = computed(()=>{
  return _.uniq(genres.value.flatMap(genre => genre.name));
});

const displayGenres = computed(()=>{
  return showMore.value ? getGenre.value : getGenre.value.slice(0,3);
});
const showMovieGenre = ()=>{
   showMore.value = !showMore.value;
};

const FindSpecialGenre = (genre)=>{
  router.push(`/list/${genre.toLowerCase()}`);
   
};
const query = ref("");

watch(query, (()=>{
  if(query.value.trim() && query.value.length >=3){
    secondRouter.push(`/lst/${query.value.trim()}`);
  }
}));

const ToggleMic = ()=>{
  if(isRecording.value){
    sr.stop();
  }else {
    sr.start();
  }
};

</script>

<template>
  <div class="container">
    <div class="main">
    <h1 class="site_name">IAMDb</h1>
    <div class="search_bar">
      <img src="/public/searchIcon.svg" alt="icon for search" title="search" class="search_icon"/>
      <input v-model="query" type="text" id="search" name="search" class="search_section"/>
      <img src="/public/microphoneIcon.svg" alt="icon for microphone" class="microphone_icon" @click="ToggleMic"/>
    </div>
    
    <div v-if="genres" class="buttons_container">
      <ul class="genre_movie">
        <li v-for="genre in displayGenres">

           <button @click="FindSpecialGenre(genre)" class="btn_genre">{{ genre }}</button>

        </li>
        <li>
          <button  v-if="!showMore" @click="showMovieGenre" class="btn_genre">showMore</button>
        </li>
      </ul>
    </div>
    <div v-else class="loading">
          is Loading...
    </div>
  </div>
  </div>

</template>
<style >
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
  font-size: 18px;
  color: white;
  padding-left: 37px;
}

.genre_movie {
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  padding: 0px 117px;
  justify-content: center;
}

.btn_genre {
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
.main {
  margin-top: 20%;
}
.loading {
  text-align: center;
  padding-top: 15px;
}

@media (max-width:500px) {
  .site_name {
    font-size: 100px;
    padding-top: 45%;
  }
  .genre_movie {
    padding: 0px 10px;
  }
  .main {
    margin-top: 1%;
  }

  
}
</style>


