import needle from 'needle'
import Discord from 'discord.js'
import chalk from 'chalk'
import consoleStamp from 'console-stamp';
import fs from 'fs'
consoleStamp(console, 'HH:MM:ss.l')

var config = new Object();
// It will parse the necessary data from the JSON file.
const temp = JSON.parse(fs.readFileSync('config.json'));
config.username = temp.username
config.webhook = temp.webhook
config.token = temp.bearer_token;
config.ms = temp.ms

const webhook = new Discord.WebhookClient(config.webhook.split('/')[5], config.webhook.split('/')[6]);

// This function will retrieve the ID to be used after to search the tweet!
async function getId() {
    const endpointURL = 'https://api.twitter.com/2/users/by?usernames='
    const params = {
        "usernames": config.username // The handler you are searching!
    }

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${config.token}`
        }
    })
    
    if(res.body) {
        var id = res.body.data[0].id
        console.log(chalk.green('Successfully retrieved id.'))
        return getTweet(id)
    }  else {
        throw new Error('Unsuccessful request');
    }
    
}

// After returning the ID, it will request to search the latest tweet that handler posted. 
async function getTweet(id) {
    const endpointURL = `https://api.twitter.com/2/users/${id}/tweets`; // Using their ID to find the tweets.
    const params = {
        "tweet.fields": "created_at",
        "expansions": "author_id",
        "user.fields": "created_at"
    }

    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2TweetLookupJS",
            "authorization": `Bearer ${config.token}`
        }
    })

    var result = new Object()
    result['CREATED_AT'] = res.body.data[0].created_at
    result['TEXT'] = res.body.data[0].text

    // The result will search if the tweet contains a link (meaning an image is embedded with it) or not.
    if(result['TEXT'].toString().includes('https://t.co/')) {
        var suffix = res.body.data[0].text.split('https://t.co/')[1]
        var tweetLink = 'https://t.co/' + suffix
        result['TEXT'] =  res.body.data[0].text.split(tweetLink)[0]
        return checkTweet(result, tweetLink)
    } else if(!result['TEXT'].toString().includes('https://t.co/')) {
        result['TEXT'] = res.body.data[0].text
        return checkTweet(result)
    } else if(res.body == undefined) {
        console.log(chalk.red('No Tweets were found.'))    
    } else {
        throw new Error('Unsuccessful request');
    } 

    // Running the first time, it will ping the latest tweet (is normal) and will save it in the result.txt! 
    // After that, it will compare until the script finds a newer tweet.
    async function checkTweet(result, tweetLink) {
        var stream = fs.createWriteStream("result.txt");
        stream.once('open', function(fd) {
        stream.write(result['TEXT']);
        stream.end();
        })
        var oldResult = fs.readFileSync("result.txt")
        if(result['TEXT'] == oldResult) {
        async function delay(time) {
            return new Promise(function(resolve) { 
                setTimeout(resolve, time)
            });
            }
            console.log(`No Newer Tweet Found. Retrying in ${config.ms} ms`)
            await delay(config.ms)
            return getTweet(id)
    
        // I made a distinction between retweet or
        } else if(result['TEXT'].includes('RT')) {
            if(tweetLink == undefined) {
                tweetLink = 'No Image Attached'
            }
            console.log(chalk.yellow('A New Tweet Has Been Found.'))
            const embeds = new Discord.MessageEmbed()
                // You can change the color using the color hex palette. E.G.: #dddddd > white
                .setColor('#dddddd')
                .addFields(
                    { name: 'Twitter Handler', value: `https://twitter.com/${config.username}` },
                    { name: 'Tweet Type', value: 'RETWEET' },
                    { name: 'Tweet Posted at', value: result['CREATED_AT'] },
                    { name: 'Tweet Content', value: result['TEXT'].replace('RT','')},
                    { name: 'Tweet Link', value: tweetLink},
                )
                .setTimestamp()
                // Write your own footer here! To attach an image, paste the url of the image after declaring ','
                .setFooter('Made by Westorm | Check my Github! https://github.com/westorm-alt');
            webhook.send(embeds)
            return getTweet(id)
        } else if(!result['TEXT'].includes('RT')) {
            if(tweetLink == undefined) {
                tweetLink = 'No Image Attached'
            }
            const embeds = new Discord.MessageEmbed()
            // You can change the color using the color hex palette. E.G.: #dddddd > white
            .setColor('#dddddd')
            .addFields(
                { name: 'Twitter Handler', value: `https://twitter.com/${config.username}` },
                { name: 'Tweet Type', value: 'TWEET' },
                { name: 'Tweet Posted at', value: result['CREATED_AT'] },
                { name: 'Tweet Content', value: result['TEXT']},
                { name: 'Tweet Link', value: tweetLink},
            )
            .setTimestamp()
            // Write your own footer here! To attach an image, paste the url of the image after declaring ','
            .setFooter('Made by Westorm | Check my Github! https://github.com/westorm-alt'); 
        webhook.send(embeds)
        return getTweet(id)
        }
    }
    
}

getId()