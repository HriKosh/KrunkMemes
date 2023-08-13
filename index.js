//install this package without running
//TODO: make it so that when installing this api it installs axios as well
const axios = require('axios/dist/node/axios.cjs');

// meme getter
async function getmems(subreddit) {
    try {
        //fetch shit
        const response = await axios.get(`https://www.reddit.com/r/${subreddit}/search.json?q=flair_name%3A%22meme%22&restrict_sr=1&sort=hot`);

        const memes = response.data.data.children;

        // process/display da funny pics
        memes.forEach((meme, index) => {
            const memeData = meme.data;
            console.log(`Meme ${index + 1}: ${memeData.title}`);
            console.log(`URL: ${memeData.url}`);
            console.log('---');
        });
    } catch (error) {
        //try catch my love
        console.error('Error fetching memes:', error);
    }
}

//call it with 'KrunkerIO' also works with other subreddits
module.exports = getmems;
