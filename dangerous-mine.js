"use strict"
const size = process.argv.slice(2);
const inHeigth = Number(size[0]);
const inWidth = Number(size[1]);

const MineGame = require('./index');

/*
 * Challenge Mine Game Part 2 
 * Release 1 - 3 :
 * - Inheritance 
 * - Polymorphism 
 */

class DangerousMine extends MineGame{
  constructor(heigth, width){
    super(heigth,width,'☺︎');
  }

  randomStamina(){
    let stamina = Math.floor(Math.random() * 10 + 11);
    return stamina;
  }
  generateBoard(){
    let board = super.generateBoard();
    let posMiner = this.position;
    let status = true;
    // agar bom tidak di posisi miner
    while(status){
      let posBoom = this.randomPosition();
      if (posBoom[0]!==posMiner[0] && posBoom[1]!==posMiner[1]){
        status=false;
      }
      if (!status) board[posBoom[0]][posBoom[1]] = '⌖';
    }
    return board;
  }

  play(){
    if (this.validation()) {
      //ambil value
      let box = this.generateBoard();
      let [row,column] = this.position;
      //looping
      while(this.stamina>=0){

        //ketika ketemu boom
        if(box[row][column] === '⌖'){
          console.log('BOOM!! BOOM!! BOOM!!');
          this.stamina=0;
        } 
        console.log(`Position row ${row} and column ${column}`);
        // hitung money dan diamon
        if(box[row][column]==='$') this.money++;
        if(box[row][column]==='♦︎') this.diamond++;
        box[row][column] = this.miner;
        //bikin join
        let squareBox
        for (let i =0; i<box.length;i++){
          squareBox = `| ${box[i].join(' | ')} |`;
          console.log(squareBox);
        } 
      
        box[row][column] = ' ';
        this.info();
        //kondisi pojok
        this.sleep(1000);
        if (row === (this.heigth-1) && (column===this.width-1))  this.stamina = 0
        
        if( column===(this.width-1)){
          column=0 ;
          row++;
        } else {
          column++;
        }

        this.stamina--; 
        let x =  (this.stamina < 0) ? null :this.clearScreen();  
      }
    }
  }
 
}

// TEST CASE Mine Game Part 2 
const gameDangerousMine = new DangerousMine(inHeigth,inWidth)  // isi parameter sesuai kebutuhan
gameDangerousMine.play()
