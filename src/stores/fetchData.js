import { defineStore } from "pinia";
import { ref } from "vue";



export const useFetchDataStore = defineStore("movieStore",()=>{

  const genres = ref(null);
  const getMovieGenres = async ()=>{
        const response = await fetch("https://moviesapi.codingfront.dev/api/v1/genres");
        if(response.ok){
            const result = await response.json();
            genres.value = result;
        }else{
            return;
            
        }
    };
    return {
        genres,
        getMovieGenres,
    }
});

