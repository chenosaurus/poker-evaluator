var fs = require('fs');

//generate mapping of 3 card hands & ranks

var ranks = [];
var buffer = new Buffer(7100);

//initialize empty array
for (var i = 0; i <= 13; i++) {
  for (var j = 0; j <= 13; j++) {
  	for (var k = 0; k <= 13; k++) {
  		if (!ranks[i]) {
        ranks[i] = [];
  		}
      if (!ranks[i][j]) {
        ranks[i][j] = [];
      }
      if (!ranks[i][j][k]) {
        ranks[i][j][k] = undefined;
      }
  	}
  }
}

var rank = 455; // highest rank = 455 = AAA  lowest rank = 1, 234
var trips = 0;
var pairs = 0;
var highcards = 0;

//3 of a kind
var handType = 4;
for (var i = 13; i >= 1; i--) {

  //write to buffer
  var addr = getAddress(i, i, i);
  var val = getVal(rank, handType);
  console.log(i, i, i, rank, addr, val);
  buffer.writeUInt16LE(val, addr);

  if (i == 2) {
    console.log(addr, val);
  }

  ranks[i][i][i] = rank--;
  trips++;
}

//pairs
handType = 2;
for (var i = 13; i >= 1; i--) {
  for (var j = 13; j >= 1; j--) {
    if (i == j) {
      continue;
    }

    //write to buffer
    var addr = getAddress(i, i, j);
    var val = getVal(rank, handType);
    console.log(i, i, j, rank, addr, val);
    buffer.writeUInt16LE(val, addr);

    ranks[i][i][j] = rank--;
    pairs++;
  }
}

//high card
handType = 1;
for (var i = 13; i >= 1; i--) {
  for (var j = i-1; j >= 1; j--) {
    for (var k = j-1; k >= 1; k--) {

      //write to buffer
      var addr = getAddress(i, j, k);
      var val = getVal(rank, handType);
      console.log(i, j, k, rank, addr, val);
      buffer.writeUInt16LE(val, addr);

      ranks[i][j][k] = rank--;
      highcards++;
    }
  }
}

function getVal(rank, handType) {
  return (handType << 12) + rank;
}

function getAddress(i, j, k) {
  return ((i << 8) + (j << 4) + k) * 2;
}

console.log('enumerated ' + trips + ' trips, ' + pairs + ' pairs, ' + highcards + ' high cards');


fs.writeFileSync('./data/3CardHandRanks.dat', buffer);

var ranks2 = fs.readFileSync('./data/3CardHandRanks.dat');

for (var i = 0; i < buffer.length; i++) {
  if (buffer[i] != ranks2[i]) {
    console.log('error');
  }
}