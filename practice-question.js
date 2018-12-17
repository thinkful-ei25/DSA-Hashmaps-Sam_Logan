'use strict';
function twoMovies(flight_length, movie_lengths){
  const map = new Map();
  let firstMovie, secondMovie = 0;
  for(let i=0; i<movie_lengths.length; i++){
    firstMovie = movie_lengths[i];
    secondMovie = flight_length - firstMovie;
    if(map.get(secondMovie)){
      return true;
    }
    map.set(firstMovie, true);
  }
  return false;
}

const answer = twoMovies(120, [80,20,60,40]);
console.log(answer);