'use strict';

class Hashmap{
  constructor(initialCapacity=8){
    this.length = 0;
    this._slots =[];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string){
    let hash = 5381;
    for (let i=0; i<string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key){
    const index = this._findSlot(key);
    if(this._slots[index]=== undefined){
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value){
    const loadRatio = (this.length + this._deleted + 1)/this._capacity;
    if(loadRatio > Hashmap.MAX_LOAD_RATIO){
      this._resize(this._capacity * Hashmap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key){
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if(slot === undefined){
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length --;
    this._deleted++;
  }

  _findSlot(key){
    const hash = Hashmap._hashString(key);
    const start = hash % this._capacity;
    for(let i=start; i<start+this._capacity;i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if(slot === undefined || slot.key == key){
        return index;
      }
    }
  }

  _resize(size){
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._deleted = 0;
    this._slots = [];
    for(const slot of oldSlots){
      if(slot !== undefined && !slot.deleted){
        this.set(slot.key, slot.value);
      }
    }
  }

}

Hashmap.MAX_LOAD_RATIO = 0.9;
Hashmap.SIZE_RATIO = 3;

module.exports = Hashmap;