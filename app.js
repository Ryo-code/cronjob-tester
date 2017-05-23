'use strict';
var express = require('express');
var moment  = require("moment");
var cheerio = require('cheerio');
var request = require('request');

var CronJob = require('cron').CronJob;
var app = express();

//Cronjob arguments: Seconds(0-59) Minutes(0-59) Hours(0-23) Day_Of_Month(1-31) Months(0-11) Day_Of_Week(0-6)

new CronJob('* * * * * *', () => {
  // console.log('1 seconds have elapsed~~!!');
  var rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); // May 22nd 2017, 5:38:04 pm
  console.log("This very moment is: ", rightNow);

  factOfTheDay();

}, null, true, 'America/Chicago');

const factOfTheDay = () => {
  request('https://www.beagreatteacher.com/daily-fun-fact/', function(err, resp, html) {
    if (!err){
      var $ = cheerio.load(html);
      var factContent = $('span:contains("Random Fact of the Day:")').parent().parent().next().text() //It's weird because of the way their HTML is structured
      console.log("Random fact:", factContent);
    }else{
      console.log("Error!", err);
    }
  });
}

const everyMorning = new CronJob('00 15 08 * * 0-6', () => {
  // This cronjob will run at 08:15:00(AM) everyday
  console.log("BEEP BOOP, it's 8:15~");
  console.log("This very moment is: ", rightNow)
}, null, true, 'America/Chicago');

app.get("/", (req, res) => {
  res.send("Good luck with CRON JOB");
})

app.listen(3002,  () => {
    console.log('Making some pancakes on port:', 3002);
});
