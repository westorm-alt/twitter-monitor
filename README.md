# Twitter Sniper Monitor
A simple and open-sourced monitor made for Twitter to check any update from any account you want with discord webhook integration.
## Getting Started and Usage
The following guide will help you to install a copy of the project with ease. 
### Prerequisites
By using my code, I'm expecting you to already have [NodeJS](https://nodejs.org/en/) installed and an editor like [Visual Studio Code](https://code.visualstudio.com). You can use the terminal to initiate the script by simply running `node index.js` after installing the necessary. Let me know if you want me to convert it in an executable and make it a CLI.
- Clone or download the repository first, open your editor and input the following command.
```
npm install
```

In the `config.json` file you will need the following inputs:
- Bearer Token
- Discord Webhook 
- Twitter Username that you want to monitor (you can run one username per instance)
- Delay in `ms`

If you don't know how webhooks works, you can find a guide [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
### Features 
The program will automatically fetch the following data by standard if you have the Essential package:
- Tweet Handler 
- Tweet Time 
- Tweet Content and Link

If you have instead the Elevated package it will retrieve more information such as:
- Profile Pic
- More to come...

### Issues and Feedback
- Coming Soon!
