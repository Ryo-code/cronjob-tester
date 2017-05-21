'use strict';
var express = require('express');
var CronJob = require('cron').CronJob;

var app = express();


/* The arguments in Cronjob:
In order, here is what they represent (along with the allowed values).
  1) Seconds:     0–59
  2) Minutes:     0–59
  3) Hours:       0–23
  4) Day of Month:1–31
  5) Months:      0–11
  6) Day of Week: 0–6        */
new CronJob('* * * * * *', function() {
    
    console.log('A second has elapsed!!')

}, null, true, 'America/Los_Angeles');



app.get("/", (req, res) => {
  res.send("Good luck with CRON JOB")
})

app.listen(3002, function () {
    console.log('Making some pancakes on port:', 3002);
});
