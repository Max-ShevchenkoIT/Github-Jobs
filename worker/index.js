var CronJob = require('cron').CronJob;

var fetchGithub = require('./tasks/fetch-github')
fetchGithub();
//звездочки это то как часто вы хотите чтобы ваша работа выполнялась
new CronJob('*/20 * * * *', fetchGithub, null, true, 'America/Los_Angeles');