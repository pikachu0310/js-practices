#!/usr/bin/env node

import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const now = new Date();

const month = args.m ? args.m - 1 : now.getMonth();
const year = args.y ? args.y : now.getFullYear();

const startOfMonth = new Date(year, month, 1);
const endOfMonth = new Date(year, month + 1, 0);

console.log(`      ${month + 1}月 ${year}`);
console.log("日 月 火 水 木 金 土");

const dayOfWeek = startOfMonth.getDay();
let calendarOutput = " ".repeat(dayOfWeek * 3);

const isEndOfWeek = (dayOfWeek, date) => (dayOfWeek + date) % 7 === 0;

for (let date = 1; date <= endOfMonth.getDate(); date++) {
  calendarOutput += `${String(date).padStart(2, " ")} `;

  if (isEndOfWeek(dayOfWeek, date)) {
    calendarOutput += "\n";
  }
}

if (!calendarOutput.endsWith("\n")) {
  calendarOutput += "\n";
}

console.log(calendarOutput);
