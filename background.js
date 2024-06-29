var prevSock;
function connectToWebSocket(websocketUrl) {
  const socket = new WebSocket(websocketUrl);

  socket.addEventListener("open", function (event) {
    console.log("WebSocket connected");
    chrome.storage.sync.set({ 'status': true });
  });

  // Listen for messages from the WebSocket server
  socket.addEventListener("message", function (event) {
    console.log("Message received:");

    var data;
    try {
      data = JSON.parse(event.data);
    } catch (e) {
      console.log("Error in parsing event data. ", e.message);
    }
    console.log(data);

    if (event.data === "HTTP request received") {
      // chrome.notifications.create({
      //   type: "basic",
      //   iconUrl: "./images/notification2.png",
      //   title: "HTTP Request Notification",
      //   message: "An HTTP request was received.",
      // });
      createAndStoreNotification("HTTP Request Notification", "An HTTP request was received.");
    } else {
      // chrome.notifications.create({
      //   type: "basic",
      //   iconUrl: "./images/notification2.png",
      //   title: data.data["event_type"].toString(),
      //   message: JSON.stringify(data.data.user_data),
      // });

      createAndStoreNotification(data.data["event_type"].toString(), JSON.stringify(data.data.user_data));
    }

    // localStorag

  });

  socket.addEventListener("error", function (error) {
    console.error("WebSocket error:", error);
  });

  socket.addEventListener("close", function (event) {
    console.log("WebSocket disconnected");
  });

  return socket;
}

function connectToSocket(){
  // Retrieve WebSocket URL from Chrome's storage
chrome.storage.sync.get("websocketUrl", function (data) {
  const websocketUrl = data.websocketUrl;
  if (websocketUrl === undefined)
    {
      console.log("socketurl is undefined")
      chrome.storage.sync.set({ 'status': false });
    }
  else console.log(websocketUrl);


  try{
  if(prevSock===undefined || prevSock !== websocketUrl)
  {
    connectToWebSocket(websocketUrl);
    chrome.storage.sync.set({ 'status': true });
    prevSock = websocketUrl;
  }
  // document.getElementById("status").innerText = "Connected";
  }catch(e){
    console.log("Failed to connect to socket url.");
    chrome.storage.sync.set({ 'status': false });
  }
});
}

chrome.storage.onChanged.addListener(connectToSocket);
connectToSocket();




function createAndStoreNotification(title, message) {
  // Create the notification
  chrome.notifications.create({
    type: "basic",
    iconUrl: "./images/notification2.png",
    title: title,
    message: message
  });

  // Store the notification data in Chrome storage
  chrome.storage.local.get({ notifications: [] }, function(data) {
    var notifications = data.notifications;
    notifications.push({ title: title, message: message });
    if(notifications.length>5)
      notifications = notifications.slice(-5);
    chrome.storage.local.set({ notifications: notifications });
  });
}
