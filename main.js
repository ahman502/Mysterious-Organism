// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)]; 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
}

const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      //get a random base from the array
      let getBase = this.dna[Math.floor(Math.random() * 15)];
      
      //get a random base from 4 dnaBases
      let randomBase = returnRandBase();

      //print the random base selected from the given array
      console.log(`Random base from dna array above: ${getBase}`);

      //if the base from array and the randomly generated base are same, then we call the returnRandBase function again until both bases are different
      while(getBase == randomBase) {

        //assign randomBase variable from above to the new random base generated
        randomBase = returnRandBase();
      }

      //print out the base that needs to be replaced and the base that will replace it
      console.log(`Change base (${getBase}) to another random base: ${randomBase}`);
      
      //get the index of the base that needs to be replaced
      let getBaseIndex = this.dna.indexOf(getBase);

      //print out the index of the base that needs to be replaced
      console.log(`\nIndex of base ${getBase} in the dna array: ${getBaseIndex}`);

      //using the splice method, we remove the base in the index, and insert in it's place the random base we generated, that's why we are using 1 to remove just that one base form the array
      array.splice(getBaseIndex, 1, randomBase);

      //next, we print what base needs to be removed in which index and which base needs to be inserted in that index
      console.log(`Replace base ${getBase} in index ${getBaseIndex} with base ${randomBase}.\n\nMutated specimen DNA: [${this.dna}]`);

      return;
    }, 
    // function to compare dna of two different specimens
    compareDNA(obj) {

      // counter to count similar bases 
      let sameBases = 0;

      // if both specimen's dna is the same, we print it out
      if(this.dna === obj.dna) {
        console.log(`Specimen [${obj.dna}] has an identical DNA sequence`);
      }

      // other wise if the dna is not identical but has some similar bases 
      else {
        // for loop to go over the dna of specimen
        for(let i = 0; i < this.dna.length; i++) {
          // as we go through dna of the specimen we created, we also check the base at different indexes of the specimen object that we passed into our function
          if((this.dna[i] === obj.dna[i])) {
            // if the base at an index of our specimen's dna is the same as the base at an index of the specimen object that we passed in, then we increment the same bases counter by 1
            sameBases++;
          }
        }
        console.log(`This specimen's DNA strand: [${this.dna}]`);
        console.log(`Another specimen's DNA for comparison: [${obj.dna}]`);
        console.log(`\nIdentitcal bases in the two dna strands: ${sameBases}`);
      
        console.log(`Percentage of identical bases: ${((sameBases/this.dna.length) * 100).toFixed(2)}%`);
      }
      return;
    }, 
    // this function will check if a specimen can survive or not given c and g base count
    willLikelySurvive() {

      // a counter to record the number of c and g bases 
      let cORgBase = 0;

      // for loop to go through the dna 
      for(let i = 0; i < this.dna.length; i++) {
        // if the base in the dna strand is c or g, we increment the counter by 1
        if(this.dna[i] === 'C' || this.dna[i] === 'G') {
          cORgBase++;
        }
      }

      // next, we calculate the percentage of c and g bases and truncate it to 2 decimal places
      let cORgBasePercentage = ((cORgBase/this.dna.length) * 100).toFixed(2);

        console.log(`Specimen: [${this.dna}]`);
        console.log(`Number of C or G bases in specimen's DNA array: ${cORgBase}`);
        console.log(`Total length of specimen DNA array: ${this.dna.length}`);

        // if our c or g bases percentage is >= 60%, we return true
        if(cORgBasePercentage >= 60) {
          console.log(`Given specimen's percentage of survival: ${cORgBase}/${this.dna.length} * 100 = ${cORgBasePercentage}%`);
          console.log(`Percentage of survival is >= 60% so specimen WILL survive\n`);
          return true;
        }

        // if our c or g bases percentage is < 60%, we return false
        else {
          console.log(`Given specimen's percentage of survival: ${cORgBase}/${this.dna.length} * 100 = ${cORgBasePercentage}%`);
          console.log(`Percentage of survival is < 60% so specimen will NOT survive\n`);
          return false;
        }
        return;
    }
  };
};

// function to print an array of all specimens that will survive. I use 10 here but you can use 30 to generate more specimens
function survive() {

  // the number to decide how many specimens I want to create
  let upTo = 10;
  // how many out the total specimens (upTo) will survive
  let survivalNumber = 0;
  // empty array to push in all the specimens that will survive
  let willSurviveArray = [];

  // for loop to create instances of pAequor specimen
  for(let i = 0; i < upTo; i++) {
    // if the pAequor specimen can survive then we add it to the array by pushing it
    if((pAequorFactory(i, mockUpStrand())).willLikelySurvive()) {
      // pushing the dna of the specimen instead of the entire specimen object
      willSurviveArray.push((pAequorFactory(i, mockUpStrand())).dna);
      // increment by 1 because a specimen has survived
      survivalNumber++;
    }
  }
  // if none of the specimen can survive and the array is empty, we give a message that none of the specimen will survive
  if(willSurviveArray.length == 0) {
    console.log('Sorry, none of the specimens above will survive.');
  }

  // otherwise, we print out the array with all the specimen that can survive, given their survival percentage is >= 60%
  else {
    console.log(`Out of ${upTo} specimens above, only ${survivalNumber} will survive (Check calculations above):`);
    // print out the array
    console.log(willSurviveArray);
  }
  return;
}

// testing 1
console.log('\t\t>>>>>>>>>>> SPECIMEN 1 <<<<<<<<<<<<\n');

let specimen1 = pAequorFactory(10, mockUpStrand());

// only printing the specimen's specimenNum and dna, not the entire specimen object
console.log(`Speciman Number: ${specimen1.specimenNum}`);
console.log(`Speciman DNA strand: [${specimen1.dna}]`);

console.log('\n======== MUTATE THIS SPECIMEN ========\n');
let mutate1 = specimen1.mutate();

//creating another specimen for dna comparison
let specimen2 = pAequorFactory(8, mockUpStrand());

console.log('\n======== COMPARE THIS SPECIMEN WITH ANOTHER ========\n');
specimen1.compareDNA(specimen2);      //comparing dna of specimen1 and specimen2

console.log('\n======== WILL THIS SPECIMEN SURVIVE? ========\n');
specimen1.willLikelySurvive();

// testing 2
console.log('\t\t>>>>>>>>>>> SPECIMEN 2 <<<<<<<<<<<<\n');
let specimen3 = pAequorFactory(12, mockUpStrand());

// only printing the specimen's specimenNum and dna, not the entire specimen object
console.log(`Speciman Number: ${specimen3.specimenNum}`);
console.log(`Speciman DNA strand: [${specimen3.dna}]`);

console.log('\n======== MUTATE THIS SPECIMEN ========\n');
let mutate3 = specimen3.mutate();

//creating another specimen for dna comparison
let specimen4 = pAequorFactory(30, mockUpStrand());

console.log('\n======== COMPARE THIS SPECIMEN WITH ANOTHER ========\n');
specimen3.compareDNA(specimen4);      //comparing dna of specimen3 and specimen4

console.log('\n======== WILL THIS SPECIMEN SURVIVE? ========\n');
specimen3.willLikelySurvive();

// testing the survive function
console.log('======== FIND SPECIMENS THAT WILL SURVIVE ========\n');
survive();


/* ********************* OUTPUT *********************************** 

            >>>>>>>>>>> SPECIMEN 1 <<<<<<<<<<<<

Speciman Number: 10
Speciman DNA strand: [C,T,A,A,A,T,C,G,T,A,G,G,C,A,C]

======== MUTATE THIS SPECIMEN ========

Random base from dna array above: T
Change base (T) to another random base: A

Index of base T in the dna array: 1
Replace base T in index 1 with base A.

Mutated specimen DNA: [C,A,A,A,A,T,C,G,T,A,G,G,C,A,C]

======== COMPARE THIS SPECIMEN WITH ANOTHER ========

This specimen's DNA strand: [C,A,A,A,A,T,C,G,T,A,G,G,C,A,C]
Another specimen's DNA for comparison: [T,C,C,T,C,G,T,C,A,A,T,A,A,T,T]

Identitcal bases in the two dna strands: 1
Percentage of identical bases: 6.67%

======== WILL THIS SPECIMEN SURVIVE? ========

Specimen: [C,A,A,A,A,T,C,G,T,A,G,G,C,A,C]
Number of C or G bases in specimen's DNA array: 7
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 7/15 * 100 = 46.67%
Percentage of survival is < 60% so specimen will NOT survive

		    >>>>>>>>>>> SPECIMEN 2 <<<<<<<<<<<<

Speciman Number: 12
Speciman DNA strand: [G,C,A,G,A,C,G,A,A,G,G,G,G,T,A]

======== MUTATE THIS SPECIMEN ========

Random base from dna array above: A
Change base (A) to another random base: T

Index of base A in the dna array: 2
Replace base A in index 2 with base T.

Mutated specimen DNA: [G,C,T,G,A,C,G,A,A,G,G,G,G,T,A]

======== COMPARE THIS SPECIMEN WITH ANOTHER ========

This specimen's DNA strand: [G,C,T,G,A,C,G,A,A,G,G,G,G,T,A]
Another specimen's DNA for comparison: [G,C,G,G,T,G,G,T,G,C,G,C,C,T,C]

Identitcal bases in the two dna strands: 6
Percentage of identical bases: 40.00%

======== WILL THIS SPECIMEN SURVIVE? ========

Specimen: [G,C,T,G,A,C,G,A,A,G,G,G,G,T,A]
Number of C or G bases in specimen's DNA array: 9
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 9/15 * 100 = 60.00%
Percentage of survival is >= 60% so specimen WILL survive

======== FIND SPECIMENS THAT WILL SURVIVE ========

Specimen: [G,G,T,G,T,C,C,A,A,C,G,G,C,T,C]
Number of C or G bases in specimen's DNA array: 10
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 10/15 * 100 = 66.67%
Percentage of survival is >= 60% so specimen WILL survive

Specimen: [A,T,A,A,T,A,C,A,C,A,T,T,C,T,T]
Number of C or G bases in specimen's DNA array: 3
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 3/15 * 100 = 20.00%
Percentage of survival is < 60% so specimen will NOT survive

Specimen: [C,T,A,C,G,C,G,C,C,G,A,C,A,T,T]
Number of C or G bases in specimen's DNA array: 9
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 9/15 * 100 = 60.00%
Percentage of survival is >= 60% so specimen WILL survive

Specimen: [T,A,G,C,A,T,A,C,C,G,C,C,C,C,C]
Number of C or G bases in specimen's DNA array: 10
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 10/15 * 100 = 66.67%
Percentage of survival is >= 60% so specimen WILL survive

Specimen: [G,T,C,G,A,C,A,G,T,C,C,T,A,G,A]
Number of C or G bases in specimen's DNA array: 8
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 8/15 * 100 = 53.33%
Percentage of survival is < 60% so specimen will NOT survive

Specimen: [T,C,C,C,T,C,T,A,C,A,T,C,T,A,G]
Number of C or G bases in specimen's DNA array: 7
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 7/15 * 100 = 46.67%
Percentage of survival is < 60% so specimen will NOT survive

Specimen: [C,T,A,G,A,C,T,A,A,T,G,T,T,A,A]
Number of C or G bases in specimen's DNA array: 4
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 4/15 * 100 = 26.67%
Percentage of survival is < 60% so specimen will NOT survive

Specimen: [G,C,A,G,T,T,C,T,A,C,C,C,A,A,A]
Number of C or G bases in specimen's DNA array: 7
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 7/15 * 100 = 46.67%
Percentage of survival is < 60% so specimen will NOT survive

Specimen: [C,G,T,G,T,A,A,A,G,T,A,C,T,T,T]
Number of C or G bases in specimen's DNA array: 5
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 5/15 * 100 = 33.33%
Percentage of survival is < 60% so specimen will NOT survive

Specimen: [A,G,T,G,A,G,T,G,G,G,G,C,T,G,A]
Number of C or G bases in specimen's DNA array: 9
Total length of specimen DNA array: 15
Given specimen's percentage of survival: 9/15 * 100 = 60.00%
Percentage of survival is >= 60% so specimen WILL survive

Out of 10 specimens above, only 4 will survive (Check calculations above):
[ [ 'G', 'A', 'A', 'T', 'G', 'G', 'C', 'C', 'A', 'G', 'A', 'C', 'C', 'T', 'G' ],
  [ 'T', 'A', 'T', 'G', 'G', 'T', 'A', 'G', 'C', 'G', 'C', 'G', 'T', 'G', 'G' ],
  [ 'G', 'A', 'C', 'C', 'T', 'C', 'G', 'A', 'C', 'G', 'A', 'T', 'A', 'C', 'T' ],
  [ 'T', 'T', 'T', 'G', 'G', 'C', 'T', 'G', 'A', 'C', 'A', 'A', 'G', 'A', 'G' ] ]

*/ 
