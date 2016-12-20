// index.js
var Slack = require('@slack/client');
var WebClient = Slack.WebClient;
var RtmClient = Slack.RtmClient;

//
var CLIENT_EVENTS = Slack.CLIENT_EVENTS;
var RTM_EVENTS = Slack.RTM_EVENTS;

//
var bot_api_token = process.env.BOT_API_TOKEN;
var notify_users = process.env.NOTIFY_USERS || [];

//
var rtm = new RtmClient(bot_api_token, { logLevel: 'info' });
var web = new WebClient(bot_api_token);

//
var _notify = function(user, message){
  web.chat.postMessage(user, message, function(err, res) {
    if (err) {console.log('Error:', err);}
    else {console.log("New user joined: ", res);}
  });
}

// connecting
rtm.on(CLIENT_EVENTS.RTM.CONNECTING, function () {
  console.log("Connecting...")
});

// authenticating
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
  console.log("Authenticated...")
});

// connected
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
  console.log("Connected!")
  console.log("\nUsers receiving notifications: ", notify_users)
});

// user joins channel; notify when users join channel
rtm.on(RTM_EVENTS.CHANNEL_JOIN, function () {
  console.log("JOIN!", arguments)

  var message = "A new user has joined the channel."

  //
  notify_users.forEach(function(user) {
    _notify(user, message);
  });
});

// new message
// rtm.on(RTM_EVENTS.MESSAGE, function(message) {
//
// });

// websocket closed
rtm.on(CLIENT_EVENTS.RTM.WS_CLOSED, function () {
  console.log("Socket closed...")
});

// websocket error
rtm.on(CLIENT_EVENTS.RTM.WS_ERROR, function (error) {
  console.log("Socket error: ", error)
});

// connection lost
rtm.on(CLIENT_EVENTS.RTM.DISCONNECT, function (error, code) {
  console.log("Disconnected! ", `(${code}) ${error}`)
});

//
rtm.start();
