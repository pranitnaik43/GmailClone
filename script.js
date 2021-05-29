function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly"})
    .then(function() { console.log("Sign-in successful"); },
      function(err) { console.error("Error signing in", err); });
}
function loadClient() {
  gapi.client.setApiKey("AIzaSyCemD5swL6ri_s1RtVgdaFQ5WRxsaa6CGQ");
  return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
    .then(function() { console.log("GAPI client loaded for API"); },
      function(err) { console.error("Error loading GAPI client for API", err); });
}
function getProfile() {
  return gapi.client.gmail.users.getProfile({
    "userId": "me"
  })
  .then(function(response) {
    // Handle the results here (response.result has the parsed body).
    console.log("Response", response);
  },
  function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "975452158954-q00t3poa8rah3j90u91565p5ndk4d702.apps.googleusercontent.com"});
});





// function start() {
//   // 2. Initialize the JavaScript client library.
//   gapi.client.init({
//     'apiKey': 'AIzaSyCemD5swL6ri_s1RtVgdaFQ5WRxsaa6CGQ',
//     // clientId and scope are optional if auth is not required.
    // 'clientId': '975452158954-q00t3poa8rah3j90u91565p5ndk4d702.apps.googleusercontent.com',
    // 'scope': 'https://www.googleapis.com/auth/gmail.readonly',
//   }).then(function() {
//     // 3. Initialize and make the API request.
//     return gapi.client.request({
//       'path': 'https://www.googleapis.com/gmail/v1/users/me/profile',
//       'maxResults': 1000,
//       'userId': 'me',
//       'format': 'full',
//     })
//     // console.log(gapi, gapi.client);
//     // gapi.client.gmail.users.messages.list({
//       // 'maxResults': 1000,
//       // 'userId': 'me',
//       // 'format': 'full',
//     // })
//   }).then(function(response) {
//     console.log(response.result);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
// };
// // 1. Load the JavaScript client library.
// gapi.load('client', start);






