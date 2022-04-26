const {
    get
} = require('https')
const fetch = (msglimit, callback) => {
    if (typeof (callback) === 'function') {
        let url = "https://www.reddit.com/r/krunkerio.json?limit=100"
        if (msglimit != undefined && msglimit != 0) {
            if (typeof (msglimit) === 'number') {
                let numbStr = msglimit.toString()
                if (numbStr.includes('.')) {
                    numbStr = numbStr.split('.')[0]
                    url = "https://www.reddit.com/r/krunkerio.json?limit=" + numbStr
                } else {
                    url = "https://www.reddit.com/r/krunkerio.json?limit=" + numbStr
                }
            } else {
                throw "KrunkMemes -> Invalid Parameter for Post Limit Received"
            }
        }
        get(url, e => {
            let resdata = []
            e.on('data', chunk => {
                resdata.push(chunk)
            });
            e.on('end', () => {
                const res = JSON.parse(Buffer.concat(resdata))
                let memes = []
                let errors = []
                const jsonMemeResponse = (data, url) => {
                    return {
                          author: data.data.author
                        , image: url
                        , upvoteRatio: data.data.upvote_ratio
                        , upvotes: data.data.ups
                        , downvotes: data.data.downs
                        , postedTime: data.data.created_utc
                        , redditURL: data.data.permalink
                        , postTitle: data.data.title
                    }
                }
                let data = res.data.children
                for (let i = 0; i < data.length + 1; i++) {
                    if (i === data.length) {
                        const return_obj = {
                              data: memes
                            , errors: errors
                        }
                        callback(return_obj)
                    } else {
                        if (data[i].data.link_flair_text.toLowerCase() === "meme" && data[i].data.is_video != true) {
                            let img = data[i].data.url
                            if (img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.webp')) {
                                memes.push(jsonMemeResponse(data[i], img))
                            } else {
                                let thumb = data[i].data.thumbnail
                                if (thumb.endsWith('.png') || thumb.endsWith('.jpg') || thumb.endsWith('.webp')) {
                                    memes.push(jsonMemeResponse(data[i], thumb))
                                } else {
                                    errors.push(data[i].data.permalink)
                                }
                            }
                        }
                    }
                }
            })
        }).on("error", (err) => {
            throw "KrunkMemes -> Error While Fetching Memes -> " + err
        })
    } else {
        throw "KrunkMemes -> Invalid Parameter for Callback Function Received"
    }
}
module.exports.get = (limit, callback) => {
    fetch(limit, callback)
}