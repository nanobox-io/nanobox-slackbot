// index.js
var Slack = require('@slack/client');
var WebClient = Slack.WebClient;
var RtmClient = Slack.RtmClient;

//
var CLIENT_EVENTS = Slack.CLIENT_EVENTS;
var RTM_EVENTS = Slack.RTM_EVENTS;

//
var bot_api_token = process.env.BOT_API_TOKEN;
var subscribers = (process.env.SUBSCRIBERS || "").split(" ");

//
var rtm = new RtmClient(bot_api_token, { logLevel: "info" });
var web = new WebClient(bot_api_token);

//
var _notify = function (user, message) {
  web.chat.postMessage(user, message, function(err, res) {
    if (err) {console.log("postMessage failed: ", err);}
  });
}

// connecting...
rtm.on(CLIENT_EVENTS.RTM.CONNECTING, function () {
  process.stdout.write("Connecting....... ");
});

// authenticated
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log("Success!");
  console.log("Authenticating... Success!")
});

// connected
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  console.log("Connected!")
  console.log("\nSubscribers: ", subscribers)
});

// new channel message
rtm.on(RTM_EVENTS.MESSAGE, function(message) {

  // notify when someone joins the channel
  if (message.subtype == "channel_join") {
    subscribers.forEach(function(sub) {
      _notify(sub, `<@${message.user}> has joined <#${message.channel}>`);
    });
  }
});

//
rtm.on(CLIENT_EVENTS.RTM.WS_CLOSED, function () {console.log("Socket closed...")});
rtm.on(CLIENT_EVENTS.RTM.WS_ERROR, function (error) {console.log("Socket error: ", error)});
rtm.on(CLIENT_EVENTS.RTM.DISCONNECT, function (error, code) {console.log("Disconnected! ", `(${code}) ${error}`)});

//
rtm.start();
