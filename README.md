# Twitter Sniper Monitor
A simple and open-sourced monitor made for Twitter using their API V2 to check any update from any account you want with discord webhook integration.
## Getting Started and Usage
The following guide will help you to install a copy of the project with ease. 
### Prerequisites
By using my code, I'm expecting you to already have [NodeJS](https://nodejs.org/en/) installed and an editor like [Visual Studio Code](https://code.visualstudio.com). You can use the terminal to initiate the script by simply running `node index.js` after installing the necessary. Let me know if you want me to convert it in an executable and make it a CLI.
- Have at least a Twitter Developer Account with the [Essential](https://developer.twitter.com/en/portal/petition/essential/basic-info) Access (minimum package).
- Read the guide [here](https://developer.twitter.com/en/docs/projects/overview) on how to start and create a project.
- Clone or download the repository first, open your editor and input the following command.
```
npm install
```

In the `config.json` file you will need the following inputs:
- Bearer Token
- Discord Webhook 
- Twitter Username that you want to monitor (you can run one username per instance)
- Delay in ms

If you don't know how webhooks works, you can find a guide [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

### Usage
To start the script just simply use the following command in the terminal.
```
node index.js
```

### Features 
The program will automatically fetch the following data by standard if you have the Essential package:
- Tweet Handler 
- Tweet Time 
- Tweet Content and Link

I'm waiting for the Elevated Access. If / When I'll have the access to it, I will code more stuff I've been having in mind.

### Example Webhook
![TwitterWImg](https://user-images.githubusercontent.com/78883935/175773155-22cfbeb1-979a-410e-bc76-1d1d9635e806.PNG)

### Author
- Westorm - [Twitter](https://twitter.com/bottingoursite) 

If you want to support me, you can donate here.

- [Buy Me a Coffee](https://www.buymeacoffee.com/westorm)
### Issues and Feedback
- Please let me know if you want anything to change! Open a request for any issues or feedback.
