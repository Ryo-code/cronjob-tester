'use strict';
var express = require('express');
var moment  = require("moment");
var cheerio = require('cheerio');
var request = require('request');

var CronJob = require('cron').CronJob;
var app = express();

//Cronjob arguments: Seconds(0-59) Minutes(0-59) Hours(0-23) Day_Of_Month(1-31) Months(0-11) Day_Of_Week(0-6)
new CronJob('* * * * * *', () => {
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"May 22nd 2017, 5:38:04 pm"
  console.log(rightNow)
}, null, true, 'America/Chicago');

new CronJob('0 * * * * *', () => {
  console.log("Every minute");
}, null, true, 'America/Chicago');

new CronJob('30 * * * * *', () => {
  console.log("Also every minute, but on the 30th second");
}, null, true, 'America/Chicago');

new CronJob('* 0 * * * *', () => {
  console.log("Every hour --->");
}, null, true, 'America/Chicago');

new CronJob('* * 0 * * *', () => {
  console.log("Every day @ midnight --->");
}, null, true, 'America/Chicago');

new CronJob('* * 08 * * *', () => {
  console.log("Every day at 8:00 AM --->");
}, null, true, 'America/Chicago');


const everyMorning = new CronJob('00 15 08 * * 0-6', () => {
  // This cronjob will run at 08:15:00(AM) everyday
  console.log("BEEP BOOP, it's 8:15~");
  console.log("This very moment is: ", rightNow);
}, null, true, 'America/Chicago');

app.get("/", (req, res) => {
  res.send("Good luck with CRON JOB");
})

app.listen(3002,  () => {
    console.log('Making some pancakes on port:', 3002);
});
