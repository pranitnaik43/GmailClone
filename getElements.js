function createMyElement(tag, value="", classes="", id="") {
  var element = document.createElement(tag);
  if(value!="")
    element.innerHTML = value;
  if(classes!="")
    element.setAttribute("class", classes);
  if(id!="")
    element.setAttribute("id", id);
  return element;
}

var mailPage = [""];
var currPage = 0;

function getDate(dateStr) {
  var date = new Date(dateStr);
  return date.toDateString();
}

function ClearPageBody(){
  var pageBody = document.querySelector('#pageBody');
  while (pageBody.hasChildNodes()) {  
    pageBody.removeChild(pageBody.firstChild);
  }
}

function getTable() {
  var m = getMessages("");
  // console.log(m);
  var table = createMyElement('table', '', 'table table-hover', 'myTable');
  var tableContents = ['From', 'Subject', 'Date'];
  var pageToken = mailPage[currPage];
  gapi.client.gmail.users.messages.list({
    "userId": "me",
    "maxResults": 50,
    "pageToken": pageToken
  })
  .then(response => {
    // console.log("Response:", response);
    var messages = response.result.messages;
    messages.forEach(element => {
      gapi.client.gmail.users.messages.get({
        "userId": "me",
        "id": element.id
      })
      .then(function(response) {
        var message = response.result;
        // console.log(message);
        var tr = createMyElement('tr', '', "", element.id);
        tableContents.forEach(item => {
          message.payload.headers.forEach(header => {
            if(header.name == item){
              var val = header.value;
              if(item=="Date"){
                val = getDate(header.value);
              }
              var td = createMyElement('td', val);
              tr.append(td);
              tr.addEventListener('click', (e) => ShowMail(e));
            }
          });
        });
        table.append(tr);
      },
      function(err) { console.error("Execute error", err); });
    });
  })
  ClearPageBody();
  var pageBody = document.getElementById('pageBody');
  pageBody.append(table);
}

function createMailViewer(messageId) {
  gapi.client.gmail.users.messages.get({
    "userId": "me",
    "id": messageId
  })
  .then(function(response) {
    var message = response.result;
   
    var sender, date, time, subject, data="";
    message.payload.headers.forEach(item => {
      if(item.name=="From")
        sender = item.value;
      else if(item.name=="Subject")
        subject = item.value;
      else if(item.name=="Date")
        date = item.value;
        // time = getTime(item.value);
    })
    body = message.payload.body;
    if(body.size>0){
      data = atob(body.data.replace(/-/g, '+').replace(/_/g, '/'));
    }

    var mailViewer = createMyElement('div');
    var senderLabel = createMyElement('h4', 'Sender: '+sender);
    var subjectLabel = createMyElement('h3', 'Subject: '+subject);
    var dateDiv = createMyElement('div', date);
    var bodyDiv = createMyElement('p', data);

    mailViewer.append(senderLabel, subjectLabel, dateDiv, bodyDiv);
    // console.log(mailViewer);
    var pageBody = document.querySelector('#pageBody');
    // return mailViewer;
    pageBody.append(mailViewer);
  }).catch(error=>{
    console.log(error);
  });
}

function ShowMail(e) {
  try{
    e.preventDefault();
    e.stopImmediatePropagation();   //prevent bubbling
    // alert(e.target.id);
    ClearPageBody();
    var id = e.target.parentNode.id;
    createMailViewer(id);
  }
  catch(error){
    console.log(error);
  }
  
}
