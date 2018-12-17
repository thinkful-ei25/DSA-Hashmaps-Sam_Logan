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

  get(key){
    const index = this._findSlot(key);
    if(this._slots[index]=== undefined){
      throw new Error('Key error');
    }
    let output = [];
    let slot = this._slots[index];
    output.push(slot.value);
    while(slot&&slot.next){
      if(slot.next){
        output.push(slot.next.value);
        slot = slot.net;
      }
    }
    return output;
  }

  set(key, value){
    const loadRatio = (this.length + 1)/this._capacity;
    if(loadRatio > Hashmap2.MAX_LOAD_RATIO){
      this._resize(this._capacity*Hashmap2.SIZE_RATIO);
    }
    let index = this._findSlot(key);
    let node = new hashNode(key,value);
    if(this._slots[index]){
      node.next = this._slots[index];
    }
    this._slots[index] = node;
    this.length++;
  }

  remove(key){
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if(slot === undefined){
      throw new Error('Key error');
    }
    this._slots[index]=undefined;
    this.length --;
  }

  _findSlot(key){
    const hash = Hashmap2._hashString(key);
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
    this._slots = [];
    for(let i =0; i<oldSlots.length; i++){
      let slot = oldSlots[i];
      if(slot!==undefined){
        this.set(slot.key,slot.value);
      }
      
      while (slot&&slot.next) {
        if(slot.next){
          this.set(slot.next.key, slot.next.value);
        }
        slot = slot.next;
        
      }
      
    }
  }

}

Hashmap2.MAX_LOAD_RATIO = 0.9;
Hashmap2.SIZE_RATIO = 3;

class hashNode{
  constructor(key, value){
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

module.exports = Hashmap2;