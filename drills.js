'use strict';
const Hashmap = require('./hashmap');


function permutationPalindrome(s){
  const map = new Hashmap();
  for(let i=0; i<s.length; i++){
    let count = 0;
    try{
      if(map.get(s.charAt(i))){
        count = map.get(s.charAt(i));
      }
    } catch(err){
      count = 0;
    }
    map.set(s.charAt(i),count+1);
  }
  let n =0;
  for(let i =0; i<s.length; i++){
    let key = s.charAt(i);
    n += map.get(key)%2;
  }
  return (n <=1);
}

function main(){
  // const lor = new Hashmap();
  // lor.set('Hobbit', 'Bilbo');
  // lor.set('Hobbit', 'Frodo');
  // lor.set('Wizard', 'Gandolf');
  // lor.set('Human', 'Aragon');
  // lor.set('Elf', 'Legolas');
  // lor.set('Maiar', 'The Necromancer');
  // lor.set('Maiar', 'Sauron');
  // lor.set('LadyOfLight', 'Galadriel'); 
  // lor.set('HalfElven', 'Arwen'); 
  // lor.set('Ent', 'Treebeard');

  //console.log(lor.get('Maiar'));
  //console.log(lor);

  const answer = permutationPalindrome('racecar');
  console.log(answer);
  const answer2 = permutationPalindrome('carrace');
  console.log(answer2);
}

main();