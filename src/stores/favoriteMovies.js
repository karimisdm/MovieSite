import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoriteStore = defineStore("favoriteStore",()=>{
     
    const favoriteItems = ref([]);

    const addFavorite = (movieId) => {
        if (!favoriteItems.value.includes(movieId)) {
            favoriteItems.value.push(movieId);
        }
    };

    const removeFavorite = (movieId) => {
       favoriteItems.value.forEach((element)=>{
              if(element === movieId){
                favoriteItems.value.splice(favoriteItems.value.indexOf(element),1);
              }});

       }

        // favoriteItems.value = favoriteItems.value.filter((id) => {id !== movieId});


    const selectMovies = (movie) => {
        if (!favoriteItems.value.includes(movie.id)) {
            addFavorite(movie.id);
        } else {
            removeFavorite(movie.id);
        }
    };

    return {
        favoriteItems,
        addFavorite,
        removeFavorite,
        selectMovies,
    };   
     
})