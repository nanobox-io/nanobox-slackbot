# Nanobox Slackbot (nanobot)

Nanobot is a very simple Slack bot with one purpose (atm). Notify users when someone joins a channel.

**HEADS UP** - A Slack bot must be *invited* (`/invite @bot_name`) to a channel before it can listen for events in that channel.

## Environment Variables

Nanobot makes use of two environment variables:

```bash
# This is your Slack bot api token.
BOT_API_TOKEN=slackbot-api-token

# This is a comma delimited list of channels|groups|usernames/id's
# which will get notified when someone joins the channel.
SUBSCRIBERS=@username,#channel,etc.
```

## Run the app

```bash
# clone the code
git clone https://github.com/nanobox-io/nanobox-slackbot.git

# cd into the app
cd nanobox-slackbot
```

### Locally

```bash
# add your slack bot api token
nanobox add evar local BOT_API_TOKEN=slackbot-api-token

# add your notify users
nanobox add evar local SUBSCRIBERS=@username,#channel,etc.

# run the app
nanobox run node index.js
```

### In Production

To run nanobot in production follow the guides on <a href="http://guides.nanobox.io/nodejs/generic/launch-your-app/", target="\_blank">launching a nodejs app with nanobox</a>.

**HEADS UP** - Make sure you <a href="http://guides.nanobox.io/nodejs/generic/production-evars/", target="\_blank">add the environment variables</a> from above via your dashboard.
