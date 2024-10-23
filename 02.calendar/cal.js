#!/usr/bin/env node
import minimist from 'minimist';
import dayjs from 'dayjs';
import 'dayjs/locale/ja.js';

const args = minimist(process.argv.slice(2));
const month = args.m ? parseInt(args.m, 10) - 1 : dayjs().month();
const year = args.y ? parseInt(args.y, 10) : dayjs().year();

const startOfMonth = dayjs(new Date(year, month, 1));
const endOfMonth = dayjs(new Date(year, month + 1, 0));

console.log(`      ${month + 1}月 ${year}`);
console.log('日 月 火 水 木 金 土');

let dayOfWeek = startOfMonth.day();
let calendarOutput = ' '.repeat(dayOfWeek * 3);

for (let date = 1; date <= endOfMonth.date(); date++) {
    calendarOutput += String(date).padStart(2, ' ') + ' ';

    if ((dayOfWeek + date) % 7 === 0) {
        calendarOutput += '\n';
    }
}

if (calendarOutput.trim().length % 21 !== 0) {
    calendarOutput += '\n';
}

console.log(calendarOutput);
