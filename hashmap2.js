'use strict';

class Hashmap2 {
  constructor(initialCapacity=8){
    this._slots = [];
    this.length = 0;
    this._capacity = initialCapacity;
  }

  static _hashString(string){
    let hash = 5381;
    for (let i=0; i<string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }


  set(item){
    let key = Hashmap2._hashString(item);
    let node = new hashNode(item);
    if(this._slots[key]){
      node.next = this._slots[key];
    }
    this._slots[key] = node;
  }
}

class hashNode{
  constructor(value){
    this.value = value;
    this.next;
  }
}

module.exports = Hashmap2;