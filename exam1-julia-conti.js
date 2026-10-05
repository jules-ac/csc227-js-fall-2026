// assignment: exam-1
// student: Julia Conti
// downloaded: 10/5/2026, 6:59:17 PM

// ===== Problem 1: Hallway Lights (5/5 worlds matched at last run) =====
function problem_1() {
function turnRight(k) {
  for (let i=0;i<3;i++) { k.turnLeft(); }  
}

function ascend(k) {
  if (k.facingEast()) {
   k.turnLeft();
   if (k.frontIsClear()) {
    k.move();
    k.turnLeft();  
   }
  }
  else if (k.facingWest()) {
   turnRight(k);
   if (k.frontIsClear()) {
    k.move();
    turnRight(k); 
   }
  }
}

function lightRow(k) {
  while (k.frontIsClear()) {
   if (k.cornerColorIs("Red")) { k.paintCorner("Yellow") }
   if (k.beepersPresent()) { k.pickBeeper(); };
   k.move();
  }
  if (k.cornerColorIs("Red")) { k.paintCorner("Yellow") };
  if (k.beepersPresent()) { k.pickBeeper(); };
}

function main(k) {
  while (k.frontIsClear()) {
    lightRow(k);
    ascend(k);
  }
  if (k.beepersInBag()) { k.putBeeper(); }
}
  return main;
}
// ===== end Problem 1 =====

// ===== Problem 2: Sorting Stones (6/6 worlds matched at last run) =====
function problem_2() {
function turnAround(k) {
 k.turnLeft();
 k.turnLeft(); 
}

function nextBucket(k) {
  turnAround(k);
  while (k.frontIsClear()) { k.move(); };
  k.turnLeft();
  k.move();
  k.move();
  k.turnLeft();
  k.move();
}

function fillBucket(k, b) {
  for (let i=0;i<b;i++) {
   k.putBeeper();
   if (k.frontIsClear()) { k.move(); }
  }
}

function main(k) {
 let red = 0;
 let green = 0;
 let blue = 0;
 
 k.move();
 while (k.frontIsClear()) {
  if (k.beepersPresent()) {
   if (k.cornerColorIs("Red")) { red++; }
   else if (k.cornerColorIs("Green")) { green++; }
   else if (k.cornerColorIs("Blue")) { blue++; }
   k.pickBeeper();
  }
  k.move();
  if (k.beepersPresent()) {
   if (k.cornerColorIs("Red")) { red++; }
   else if (k.cornerColorIs("Green")) { green++; }
   else if (k.cornerColorIs("Blue")) { blue++; }
   k.pickBeeper();
  }
 }
 nextBucket(k);
 fillBucket(k, red);
 nextBucket(k);
 fillBucket(k, green);
 nextBucket(k);
 fillBucket(k, blue);
}
  return main;
}
// ===== end Problem 2 =====

// ===== Problem 3: Treasure Map (7/7 worlds matched at last run) =====
function problem_3() {
function moveSquares(k, n) {
 for (let i=1;i<n;i++) { k.move(); }
}

function beepersOnSquare(k) {
 let b=0;
 while (k.beepersPresent()) {
  k.pickBeeper();
  b++;
 }
 return b;
}

function resetToStart(k) {
  k.turnLeft();
  k.turnLeft(); 
  k.move();
  k.turnLeft();
  k.turnLeft();
}

function main(k) {
 let avenue = beepersOnSquare(k);
 k.move();
 let street = beepersOnSquare(k);
 
 resetToStart(k);

 moveSquares(k, avenue);
 k.turnLeft();
 moveSquares(k, street);
  
 if (avenue>street) { k.paintCorner("Red"); }
 else if (avenue<street) { k.paintCorner("Blue"); }
 else if (avenue==street) { k.paintCorner("Green"); }
  
 while (k.beepersInBag()) { k.putBeeper(); } 
}
  return main;
}
// ===== end Problem 3 =====
