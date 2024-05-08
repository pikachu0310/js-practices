#!/usr/bin/env node

// 1から20までの数をループ
for (let i = 1; i <= 20; i++) {
  let output = "";

  if (i % 3 === 0) {
    output += "Fizz";
  }

  if (i % 5 === 0) {
    output += "Buzz";
  }

  // 数が"Fizz"でも"Buzz"でもない場合、数字をそのまま出力
  if (output === "") {
    output = i;
  }

  console.log(output);
}
