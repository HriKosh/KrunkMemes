const https = require('https');

function getmems(callback) {
  const Memes = [];
  const URL = [];

  const options = {
    hostname: 'www.reddit.com',
    path: `/r/KrunkerIO/search.json?q=flair_name%3A%22meme%22&restrict_sr=1&sort=new`,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const response = JSON.parse(data);

      const memes = response.data.children;
      memes.forEach((meme, index) => {
        const memeData = meme.data;
        if (memeData.url && memeData.url.includes('.jpg' || '.png' || '.jpeg' || 'webp')) {
          Memes.push(`Meme: ${memeData.title}`);
          URL.push(`URL: ${memeData.url}`);
        }
      });

      callback(Memes, URL);
    });
  });

  req.on('error', (error) => {
    console.error('Error meme-ing:', error);
  });

  req.end();
}


module.exports = getmems;