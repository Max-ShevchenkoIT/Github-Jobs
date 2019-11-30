var express = require('express');
var app = express();
const port = 3001;

var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {

  const jobs = await getAsync('github');
  return res.send(jobs);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});



