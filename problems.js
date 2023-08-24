/***
 *
 *        EASY  QUESTIONS
 *
 */

// 1 - Am I Perfect?

function perfectNumber(num) {
  if (isNaN(num)) {
    return `Invalid! ${num} is not a Number`;
  }

  if (num <= 0) {
    return "Invalid"; // Numbers less than or equal to 0 are considered invalid
  }

  let factorsSum = 0;

  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      factorsSum += i;

      if (i !== num / i) {
        //checking whether num/i is also a factor
        factorsSum += num / i;
      }
    }
  }

  factorsSum -= num; // Exclude the number itself from the sum of factors

  if (factorsSum === num) {
    return "Perfect";
  } else if (factorsSum > num) {
    return "Abundant";
  } else {
    return "Deficient";
  }
}

// 2-  Shorten me!

function shortenString(input) {
  let result = "";
  let count = 1;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === input[i + 1]) {
      count++;
    } else {
      if (count > 1) {
        result += count;
      }
      result += input[i];
      count = 1;
    }
  }

  return result;
}

// Function to unshorten a string
function unshortenString(input) {
  let result = "";
  let count = "";

  for (let char of input) {
    if (!isNaN(char)) {
      count += char;
    } else {
      if (count === "") {
        result += char;
      } else {
        result += char.repeat(parseInt(count, 10));
        count = "";
      }
    }
  }

  return result;
}

// Test cases
const originalString = "AAAAAAAAAAABWWWWWWWWWWWBB";
const shortenedString = "11AB11W2B";

const encodedString = shortenString(originalString);
console.log(encodedString); // Output: "11AB11W2B"

const decodedString = unshortenString(shortenedString);
console.log(decodedString); // Output: "AAAAAAAAAAABWWWWWWWWWWWBB"

/****
 *
 *      MEDIUM QUESTIONS
 *
 */

// 1 - Greater than and less than in a matrix

function findSpecialValues(matrix) {
  const specialValues = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const currentValue = matrix[row][col];
      let isSpecial = true;

      // Check if currentValue is greater than or equal to every element in its row
      for (let c = 0; c < matrix[row].length; c++) {
        if (matrix[row][c] > currentValue) {
          isSpecial = false;
          break;
        }
      }

      // Check if currentValue is less than or equal to every element in its column
      for (let r = 0; r < matrix.length; r++) {
        if (matrix[r][col] < currentValue) {
          isSpecial = false;
          break;
        }
      }

      if (isSpecial) {
        specialValues.push(currentValue);
      }
    }
  }

  return specialValues;
}

// Example matrix
const matrix = [
  [7, 8, 7],
  [5, 4, 2],
  [8, 6, 7],
];

const specialValues = findSpecialValues(matrix);
console.log(specialValues); // Output: [5]

/****
 *
 *      HARD QUESTIONS
 *
 */

// 1 - Catch the fish

function countHitFishes(K, L, M, N, Total) {
  let hitCount = 0;

  for (let i = 1; i <= Total; i++) {
    if (i % K === 0 && i % L !== 0 && i % M !== 0) {
      hitCount++;
    } else if (i % L === 0 && i % M !== 0) {
      hitCount++;
    } else if (i % M === 0) {
      hitCount++;
    } else if (i % N === 0) {
      hitCount++;
    }
  }

  return hitCount;
}

// Test cases
console.log(countHitFishes(1, 2, 3, 4, 12)); // Output: 12
console.log(countHitFishes(2, 3, 4, 5, 24)); // Output: 17
