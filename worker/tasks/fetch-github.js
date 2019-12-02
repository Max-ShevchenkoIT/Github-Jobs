const fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');

const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json?';

async function fetchGithub() {
  const allJobs = []
  let stop = 1;
  let onPage = 0;

  
  //fetch all pages
  while(stop>0) {
    let page = 'page=' + onPage;
    const res = await fetch(baseURL + page);
    const jobs = await res.json();

    if (jobs.length === 0) {
      stop = 0;

    } else {
      allJobs.push(...jobs);
      console.log('got', jobs.length)
    }
    
    onPage++;
  }

  console.log('jobs total', allJobs.length)

  //filter also
  //мы хотим отфильтровать 
  const jrJobs = allJobs.filter( job => { //фильтруем масив для поиска вакансий только джуниоров
      const jobTitle = job.title.toLowerCase();

      //algo logic
      if (
        jobTitle.includes('senior') ||
        jobTitle.includes('manager') ||
        jobTitle.includes('sr.') ||
        jobTitle.includes('architect')
      ) {
        return false
      }

      return true;
  })

  console.log('filtered', jrJobs.length);


  //set in redis
  const success = await setAsync('github', JSON.stringify(jrJobs));
  console.log({success});
}

module.exports = fetchGithub;