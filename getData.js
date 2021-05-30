var api_key = "";
var client_id = "";
fetch("keys.json")
.then((response) => {
  return response.json();
})
.then((result) => {
  api_key = result.api_key;
  client_id = result.client_id;
})
.catch((err)=>{
  console.log("Credentials not found: " + err);
});

function authenticate() {
  return gapi.auth2.getAuthInstance()
    .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly"})
    .then(function() { console.log("Sign-in successful"); },
      function(err) { console.error("Error signing in", err); });
}

function loadClient() {
  gapi.client.setApiKey(api_key);
  return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
    .then(function() { console.log("GAPI client loaded for API"); },
      function(err) { console.error("Error loading GAPI client for API", err); });
}

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: client_id});
});

function getProfile() {
  return gapi.client.gmail.users.getProfile({
    "userId": "me"
  })
  .then(function(response) {
    console.log("Response", response);
  },
  function(err) { console.error("Execute error", err); });
}

function getMessages(pageToken) {
  return gapi.client.gmail.users.messages.list({
    "userId": "me",
    "maxResults": 50,
    "pageToken": pageToken
  })
  .then(response => {
    // console.log("Response:", response);
    // console.log(response.result.messages);
    return response.result.messages;
  })
  .catch(err => {
    console.log("Could not get the messages:" + err);
    return -1;
  });
}

function getMessage(id) {
  return gapi.client.gmail.users.messages.get({
    "userId": "me",
    "id": id
  })
  .then(function(response) {
    // console.log("Response message", response);
  },
  function(err) { console.error("Execute error", err); });
}


