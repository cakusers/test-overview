import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const main = async () => {
  const operators = ["+", "-", "*"];

  const rl = readline.createInterface({ input, output });
  const answerNumbers = await rl.question("Masukkan Deret Angka: ");
  const answerTarget = await rl.question("Masukkan Target: ");
  const numbers = answerNumbers.split(",").map(Number);
  const target = Number(answerTarget);

  const expressions = generateExpressions(numbers, operators);
  const result = getOperation(expressions, target);

  if (!result) {
    console.log("Tidak ditemukan operasi sesuai target");
  } else {
    console.log(result);
  }

  rl.close();
};

// Cari Operasi Penyelesaian
const getOperation = (expressions, target) => {
  for (let i = 0; i < expressions.length; i++) {
    const expression = expressions[i];
    const standardCalculationResul = eval(expression);
    if (standardCalculationResul === target) {
      return expression;
    }

    const [sumFirstCalculationResult, sumExpression] =
      sumFirstCalculation(expression);
    if (sumFirstCalculationResult === target) {
      return sumExpression;
    }

    const [diffFirstCalculationResult, diffExpression] =
      differenceFirstCalculation(expression);
    if (diffFirstCalculationResult === target) {
      return diffExpression;
    }
  }
};

// Melakukan Operasi yang Mengutamakan Penjumlahan
const sumFirstCalculation = (expression) => {
  const tokens = expression.split(/([+\-*/])/);
  const newTokens = [...tokens];
  let tempIndex;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "+") {
      tempIndex = i;
      // Hitung penjumlahan
      const leftNumber = Number(tokens[i - 1]);
      const rightNumber = Number(tokens[i + 1]);
      const sumResult = leftNumber + rightNumber;

      tokens.splice(i - 1, 3, sumResult);
      i--;

      // Beri tanda kurung
      newTokens.splice(tempIndex - 1, 0, "(");
      newTokens.splice(tempIndex + 3, 0, ")");
    }
  }

  // Hitung sisa operasi
  let result = Number(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseFloat(tokens[i + 1]);

    if (operator === "-") {
      result -= nextNumber;
    } else if (operator === "*") {
      result *= nextNumber;
    }
  }

  return [result, newTokens.join("")];
};

// Melakukan Operasi yang Mengutamakan Pengurangan
const differenceFirstCalculation = (expression) => {
  const tokens = expression.split(/([+\-*/])/);
  const newTokens = [...tokens];
  let tempIndex;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "-") {
      tempIndex = i;
      // Hitung pengurangan
      const leftNumber = Number(tokens[i - 1]);
      const rightNumber = Number(tokens[i + 1]);
      const sumResult = leftNumber - rightNumber;

      tokens.splice(i - 1, 3, sumResult);
      i--;

      // Beri tanda kurung
      newTokens.splice(tempIndex - 1, 0, "(");
      newTokens.splice(tempIndex + 3, 0, ")");
    }
  }

  // Hitung sisa operasi
  let result = Number(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseFloat(tokens[i + 1]);

    if (operator === "+") {
      result += nextNumber;
    } else if (operator === "*") {
      result *= nextNumber;
    }
  }

  return [result, newTokens.join("")];
};

// Cari Permutasi Angka (Tanpa duplikat angka)
const getPermutations = (arr) => {
  if (arr.length <= 1) return [arr];
  let output = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    // Sisa array selain elemen saat ini
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    const remainingPerms = getPermutations(remaining);

    for (let p of remainingPerms) {
      output.push([current, ...p]);
    }
  }
  return output;
};

// Cari Kombinasi Operator (Bisa berulang)
// Jumlah operator = jumlah angka - 1
const getOperatorCombinations = (ops, slots) => {
  if (slots === 0) return [[]];
  const output = [];
  const combinations = getOperatorCombinations(ops, slots - 1);

  for (let op of ops) {
    for (let combination of combinations) {
      output.push([op, ...combination]);
    }
  }
  return output;
};

//  Menggabungkan Permutasi Angka dan Kombinasi Operator
function generateExpressions(nums, ops) {
  const numPermutations = getPermutations(nums);
  // Jumlah slot operator adalah jumlah angka dikurangi 1
  const opCombinations = getOperatorCombinations(ops, nums.length - 1);

  const results = [];

  // Loop setiap kemungkinan urutan angka
  numPermutations.forEach((numSet) => {
    // Loop setiap kemungkinan kombinasi operator
    opCombinations.forEach((opSet) => {
      let expression = "";

      // Rakit menjadi string: Angka -> Operator -> Angka
      for (let i = 0; i < numSet.length; i++) {
        expression += numSet[i];
        // Jika masih ada operator tersisa, tambahkan operator
        if (i < opSet.length) {
          expression += `${opSet[i]}`;
        }
      }
      results.push(expression);
    });
  });

  return results;
}

main();
