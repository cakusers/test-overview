import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const main = async () => {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question("Masukkan Array: ");
  const numbers = JSON.parse(answer);

  if (!Array.isArray(numbers)) {
    console.log("Input harus berupa array, contoh: [1, 3]");
  }
  if (numbers.length < 2) {
    console.log("Angka yang dimasukkan harus lebih dari 1");
  }

  const missingNumber = findMissingNumber(numbers);

  if (!missingNumber) {
    console.log("Tidak ada angka yang hilang");
  } else {
    console.log(`Angka yang hilang: ${missingNumber}`);
  }

  rl.close();
};

const findMissingNumber = (numbers) => {
  numbers.sort((a, b) => a - b);

  let missingNumber;
  for (let i = 0; i < numbers.length - 1; i++) {
    const element = numbers[i];
    const nextElement = numbers[i + 1];

    if (element + 1 !== nextElement) {
      missingNumber = element + 1;
    }
  }
  return missingNumber;
};

main();
