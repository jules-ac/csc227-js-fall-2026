// assignment: exam-2
// student: Julia Conti
// downloaded: 11/9/2026, 8:00:38 PM

// ===== Problem 1: Word Swap (6/6 worlds matched at last run) =====
function problem_1() {
// The letter code: a pile of n beepers stands for LETTERS[n].
// Slot 0 is a space and is never used, so "A" is 1, "B" is 2, … "Z" is 26.
const LETTERS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// The swap list: a word found on the left is replaced by its partner on the right.
const SWAP = {
  HOT: "COLD",  UP: "DOWN",   YES: "NO",   FAST: "SLOW",
  I: "YOU",     GOOD: "BAD",  ON: "OFF",   WET: "DRY",
  BIG: "TINY",  CAT: "DOG",   SUN: "MOON", NEW: "OLD",
};

function main(k) {
  let currLetterIndex = 0;
  let origWord = "";
  
  k.move();
  let currAve = 2;
  while (k.beepersPresent()) {
      currLetterIndex = 0;
      while (k.beepersPresent()) {
        k.pickBeeper();
        currLetterIndex++;
      }
      origWord += LETTERS[currLetterIndex];
      k.move();
      currAve++;
  }
  
  while (currAve<7) {
    k.move();
    currAve++;
  }
  
  let swappedWord = SWAP[origWord];
  let currLetter = '';
  
  for (let i=0;i<swappedWord.length;i++) {
    currLetter = swappedWord[i];
    currLetterIndex = LETTERS.indexOf(currLetter);
    for (let i=0;i<currLetterIndex;i++) { k.putBeeper(); }
    k.move();
  }
}
  return main;
}
// ===== end Problem 1 =====

// ===== Problem 2: Color Swap (0/5 worlds matched at last run) =====
function problem_2() {
// The colors that appear in these worlds.


function turnRight(k) {
 for (let i=0;i<3;i++) { k.turnLeft(); } 
}

function walkFloorAndFaceUp(k, key, colors) {
  while (k.frontIsClear()) {
    
    // need conditional here to check if tile color has a key in the key object. could not figure out in time
    k.paintCorner(key[tileColor(k)]);
    k.move();
  }
  if (k.facingEast()) { k.turnLeft(); }
  if (k.facingWest()) { turnRight(k); }
}

function readKey(k) {
  let key = {};
  let fromColor = "";
  let toColor = "";
  while (tileColor(k)!="") {
  fromColor = tileColor(k);
  k.move();
  toColor = tileColor(k);
  key[fromColor] = toColor;
  if (!k.frontIsClear()) { break; }
  k.move();
 }
 return key;
}

function tileColor(k) {
 for (let i=0;i<COLORS.length;i++) {
  if (k.cornerColorIs(COLORS[i])) { return COLORS[i]; } 
 }
 if (k.cornerColorIs("")) { return ""; }
}

const COLORS = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Magenta", "Pink"];

function main(k) {
  
  // needed to fix loops so the last tile in a row is accounted for
  let key = {};
  k.move();
  key = readKey(k);
  while (k.frontIsClear()) { k.move(); }
  k.turnLeft();
  k.move();
  k.turnLeft();
  while (k.frontIsClear()) {
    walkFloorAndFaceUp(k, key, COLORS);
    if (!k.frontIsClear()) { return; }
    k.move();
    k.turnLeft();
    if (!k.frontIsClear()) { k.turnLeft(); k.turnLeft(); }
    }
}
  return main;
}
// ===== end Problem 2 =====
