# KrunkMemes

An API to fetch [Krunker](https://krunker.io/) Memes from [r/KrunkerIO](https://www.reddit.com/r/KrunkerIO).
**STILL IN DEVELOPMENT / DOES NOT WORK AS INTENDED** 

## How To Use
*First Install the package*:-
```batch
npm install krunkmemes --save
```
_Now_,
```js
// Importing the package.
const KrunkerMemes = require('krunkmemes')

//Then to get the memes, you have to use:-
const postFilterLimit = 100
KrunkerMemes.get(postFilterLimit, (data)=>{
    // Do anything with the data now.
    console.log(data)
})
```
_Here `postFilterLimit` is the amount of posts on [r/KrunkerIO](https://www.reddit.com/r/KrunkerIO) it should filter to find memes. By default, it is set to 100, Max is 100 and Min is 0._

> Note: This api only works for the latest posts on [r/KrunkerIO](https://www.reddit.com/r/KrunkerIO), you probably won't get _that_ many memes using this. An updated version would be made soon:tm:

## Response Data
*The Response Data is an [**Object**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). The data is located inside the `data` key as an [**Array**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of the Response Object.*

_Sample Response -_
```js
{
  data: [
    {
      author: 'reddit_author_username1',
      image: 'https://abcdef.png',
      upvoteRatio: 0.98,
      upvotes: 100,
      downvotes: 1,
      postedTime: 1650908160,
      redditURL: '/r/KrunkerIO/comments/abcd/efgh/',
      postTitle: 'efgh'
    },
    {
      author: 'reddit_author_username2',
      image: 'https://ghijklm.png',
      upvoteRatio: 1,
      upvotes: 6,
      downvotes: 0,
      postedTime: 1650896150,
      redditURL: '/r/KrunkerIO/comments/abcde/fghij',
      postTitle: 'fghij'
    }
  ],
  errors: []
}
```
> -> The postedTime is UTC epoch.
> -> Rest is pretty self explanatory.
> -> Notice the errors array? It contains the Reddit URL of the meme posts it could not get the images of.


## So Basically that's it! 💖


