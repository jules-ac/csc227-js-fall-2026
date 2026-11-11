// assignment: exam-2
// student: Julia Conti
// downloaded: 11/11/2026, 6:48:51 PM

// ===== Problem 1: Word Swap (6/6 worlds matched at last run) =====
function problem_1() {
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

// ===== Problem 2: Color Swap (5/5 worlds matched at last run) =====
function problem_2() {
function turnRight(k) {
 for (let i=0;i<3;i++) { k.turnLeft(); } 
}

function faceUp(k) {
  if (k.facingEast()) { k.turnLeft(); }
  if (k.facingWest()) { turnRight(k); }
}

function recolorTile(k, key) {
  let keyKeys = Object.keys(key);
  for (let i=0;i<keyKeys.length;i++) {
   if (tileColor(k)===keyKeys[i]) { k.paintCorner(key[keyKeys[i]]); break; } 
  }
}

function recolorRow(k, key) {
  while (true) {
    recolorTile(k, key);
    if (!k.frontIsClear()) { break; }
    k.move(); 
  }
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
  k.move();
  let key = readKey(k);
  
  while (k.frontIsClear()) { k.move(); }
  k.turnLeft();
  k.move();
  k.turnLeft();

  while (true) {
    recolorRow(k, key);
    faceUp(k);
    if (!k.frontIsClear()) { return; }
    k.move();
    k.turnLeft();
    if (!k.frontIsClear()) { k.turnLeft(); k.turnLeft(); }
    }
}
  return main;
}
// ===== end Problem 2 =====
