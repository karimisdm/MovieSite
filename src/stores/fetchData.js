import { defineStore } from "pinia";
import { computed, ref } from "vue";



export const useFetchDataStore = defineStore("movieStore",()=>{

  const allMovies = ref(null);
  const getMovies = async ()=>{
        const response = await fetch("https://moviesapi.codingfront.dev/api/v1/movies?page={page}");
        if(response.ok){
            const result = await response.json();
            allMovies.value = result.data;
        }else{
            return;
            
        }
    };
//    const searchQuery = ref("") 
//    const searchMovieByName = computed((allMovies)=>{
//      return allMovies.value.filter((movie)=>{
//           return movie.title.include(searchQuery.value);
//     })});

    return {
        allMovies,
        getMovies,
        // searchMovieByName,
        // searchQuery,
    }
});



