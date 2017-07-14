'use strict';
var express = require('express');
var moment  = require("moment");
var cheerio = require('cheerio');
var request = require('request');

var CronJob = require('cron').CronJob;
var app = express();

//Interesting docs: https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm

//Cronjob arguments: Seconds(0-59) Minutes(0-59) Hours(0-23) Day_Of_Month(1-31) Months(0-11) Day_Of_Week(0-6)
//Note: You gotta be careful with the * vs 0.

new CronJob('* * * * * *', () => {
  const rightNow = moment().format('MMMM Do YYYY, h:mm:ss a'); //"May 22nd 2017, 5:38:04 pm"
  console.log("Runs every second...", rightNow)
}, null, true, 'America/Chicago');

new CronJob('0 * * * * *', () => {
  console.log("Run every minute, on the first second of each minute");
}, null, true, 'America/Chicago');

new CronJob('30 * * * * *', () => {
  console.log("Also run every minute, but on the 30th second of each minute");
}, null, true, 'America/Chicago');

new CronJob('* 0 * * * *', () => {
  console.log("Run every second on the first minute of each hour...");
  console.log("I assume you didn't mean to do this, silly. Why would you do this??")
}, null, true, 'America/Chicago');

new CronJob('0 0 * * * *', () => {
  console.log("Run once an hour, on the hour --->");
}, null, true, 'America/Chicago');

new CronJob('0 0 0 * * *', () => {
  console.log("Run every day at midnight --->");
}, null, true, 'America/Chicago');

new CronJob('0 0 08 * * *', () => {
  console.log("Run every day at 8:00 AM --->");
}, null, true, 'America/Chicago');

new CronJob('0 0 08 1 * *', () => {
  console.log("Run at 8:00 AM on the first of every month --->");
}, null, true, 'America/Chicago');

const everyMorning = new CronJob('0 15 08 * * *', () => {
  // This cronjob will run at 08:15:00(AM) everyday
  console.log("BEEP BOOP, it's 8:15AM~");
}, null, true, 'America/Chicago');

app.get("/", (req, res) => {
  res.send("Good luck with CRON JOB");
})

/*
//I think this is in Ruby, but it's an interesting way of seeing it.
//"run at 8:00 PM, every weekday (Monday through Friday), but only in November"
  cron 'name_of_cron_entry' do 
    minute '0'
    hour '20'
    day '*'
    month '11'
    weekday '1-5'
    action :create
  end
*/

app.listen(3002,  () => {
    console.log('Making some pancakes on port:', 3002);
});
