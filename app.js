'use strict';
var express = require('express');
var moment = require("moment");
var CronJob = require('cron').CronJob;
moment().format('MMMM Do YYYY, h:mm:ss a'); // May 22nd 2017, 5:38:04 pm

var app = express();


/* The arguments in "new Cronjob()":
In order, here is what they represent (along with the allowed values).
  1) Seconds:     0–59
  2) Minutes:     0–59
  3) Hours:       0–23
  4) Day of Month:1–31
  5) Months:      0–11
  6) Day of Week: 0–6
  note: the "*" as an argument means "each"        */
//Seconds(0-59) Minutes(0-59) Hours(0-23) Day_Of_Month(1-31) Months(0-11) Day_Of_Week(0-6)

//this works when using "require('cron').CronJob"
new CronJob('* 30 * * * *', () => {
    console.log('30 minutes have elapsed~~!!');
}, null, true, 'America/Los_Angeles');


// const example = new CronJob(‘00 00  06 *  * 1–5’, () => {
//     console.log("00 seconds, 00 minutes,")
//     console.log("at hour 6, on every day of the month,");
//     console.log("from days 1 through 5 (so not running on Sat/Sundays).")
// }, null, true, '');


var job2 = new CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    console.log('job 2 ticked');
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

// job2.start(); // job 2 started

const everyMorning = new CronJob('00 15 08 * * 0-6', () => {
  // This cronjob will run at 08:15:00(AM) everyday
  console.log("BEEP BOOP, it's 8:15 mothafuckaa~");
}, null, true, 'America/Chicago');

const mornin = new CronJob('00 20 01 * * *', () => {
  // This cronjob will run at 01:20:00(AM) everyday
  console.log("BEEP BOOP, it's 1:20AM mothafuckaa~");
}, null, true, 'America/Chicago');


app.get("/", (req, res) => {
  res.send("Good luck with CRON JOB");
})

app.listen(3002,  () => {
    console.log('Making some pancakes on port:', 3002);
});
