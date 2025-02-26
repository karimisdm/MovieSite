import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoriteStore = defineStore("favoriteStore",()=>{
     
    const favoriteItems = ref([]);

    const addFavorite = (movie)=>{
      favoriteItems.value.push(movie.id);
    };
    const removeFavorite = (movie)=>{
        favoriteItems.value.forEach((id)=>{
            if(id === movie.id){
                favoriteItems.value.splice(id,1);
            }
        })
    };
    const selectMovies = (movie)=>{
        if(!favoriteItems.value.includes(movie.id)){
            addFavorite(movie);}
        else{
            removeFavorite(movie);
        }    
    }

    return {
        favoriteItems,
        addFavorite,
        removeFavorite,
        selectMovies,
    };   
     
})