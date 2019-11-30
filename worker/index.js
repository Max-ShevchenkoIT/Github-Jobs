var CronJob = require('cron').CronJob;

var fetchGithub = require('./tasks/fetch-github')

//звездочки это то как часто вы хотите чтобы ваша работа выполнялась
new CronJob('*/1 * * * *', fetchGithub, null, true, 'America/Los_Angeles');