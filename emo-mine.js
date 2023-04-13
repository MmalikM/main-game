"use strict"
const sizes = process.argv.slice(2);
const inHeigth = Number(sizes[0]);
const inWidth = Number(sizes[1]);

const MineGame = require('./index')
/*
 * Challenge Mine Game Part 2 
 * Release 1 - 3 :
 * - Inheritance 
 * - Polymorphism 
 */

class EmoMine  extends MineGame{
  constructor(heigth, width){
    super (heigth,width,'☹︎');
  }
 
  randomStamina(){
    let stamina = super.randomStamina()
    return stamina+5;
  }
}

// TEST CASE Mine Game Part 2 
const gameEmoMine = new EmoMine(inHeigth,inWidth)  // isi parameter sesuai kebutuhan
// console.log(gameEmoMine);
gameEmoMine.play()