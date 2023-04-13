"use strict"
/* 
  1. Informasi yang dibutuhkan adalah dimensi dari kotak tambangnya yang dimasukkan dengan inputan pada terminal
      posisi dari uang atau diamon yang didapatakan dari method, serta jumlah stamina yang d dapatkan dari method.
  2. algoritma :

*/

const sizes = process.argv.slice(2);
const inHeigth = Number(sizes[0]);
const inWidth = Number(sizes[1]);

class MineGame {
  // your code here 
  #position;
  constructor(heigth, width, miner = '☻') {
    this.heigth = heigth;
    this.width = width;
    this.miner = miner;
    this.money = 0;
    this.diamond = 0;
    this.stamina = this.randomStamina();
    this.#position = this.randomPosition();
  }
  set position(coordinate){
    this.#position = coordinate;
  }
  get position() {
    return this.#position;
  }
  // buat method untuk validasi, nama di bebaskan tapi dibuat yang benar peruntukannya
  validation() {
    let result1 = (this.heigth < 2 || this.heigth > 8) ? false : true;
    let result2 = (this.width < 2 || this.width > 8) ? false : true;
    if (!result1) {
      console.log('Tinggi hanya mulai dari 2 sampai 8');
      return false;
    }
    if (!result2) {
      console.log('Lebar hanya mulai dari 2 sampai 8');
      return false;
    }

    if (result1 && result2) return true;
  }

  randomStamina() {
    let stamina = Math.floor(Math.random() * 5 + 6);
    return stamina;
  }

  randomPosition() {
    let posEmojiX = Math.floor(Math.random() * this.width);
    let posEmojiY = Math.floor(Math.random() * this.heigth);
    return [posEmojiY, posEmojiX];

  }

  generateBoard() {
    let board = [];
    for (let i = 0; i < this.heigth; i++) {
      let column = [];
      for (let j = 0; j < this.width; j++) {
        let simbol;
        let value = Math.random();
        if (value < 0.8) simbol = ' ';
        if (value >= 0.8 && value < 0.9) simbol = '$';
        if (value >= 0.9) simbol = '♦︎';
        column.push(simbol);
      }
      board.push(column);
    }
    let posMiner = this.#position;
    // console.log(posMiner)
    board[posMiner[0]][posMiner[1]] = this.miner;
    return board;
  }

  play() {
    if (this.validation()) {
      //ambil value
      let box = this.generateBoard();
      let [row,column] = this.#position;
      //looping
      while(this.stamina>=0){
        console.log(`Position row ${row} and column ${column}`);
        // hitung money dan diamon
        if(box[row][column]==='$') this.money++;
        if(box[row][column]==='♦︎') this.diamond++;
        box[row][column] = this.miner;
        //bikin join
        let squareBox;
        for (let i =0; i<box.length;i++){
          squareBox = `| ${box[i].join(' | ')} |`;
          console.log(squareBox);
        } 
        box[row][column] = ' ';
        this.info();
        //kondisi pojok
        this.sleep(1000);
        if (row === (this.heigth-1) && (column===this.width-1))  this.stamina = 0 ;
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

  info() {
    console.log(`☻ stamina : ${this.stamina} | money : ${this.money} | diamond : ${this.diamond}`);
  }

  sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  clearScreen() {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }


}

// Release 4 s/d 6  (gunakan argv)
const game = new MineGame(inHeigth, inWidth)
// console.log(game);
// console.log(game.generateBoard())
// console.log(game.position)
// game.position=[1,1]
// game.play()

// game.sleep(700)
// game.clearScreen()


/**
 * NOTE : 
 * Saat mengerjakan Part 2 Release 1 - 3 
 * - silahkan dicomment / dihapus testcase part 1 
 * - tambahkan module.exports 
 */

module.exports = MineGame;