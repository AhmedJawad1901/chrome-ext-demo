const button = document.createElement('button');
button.textContent = 'Greet me!'
document.body.insertAdjacentElement('afterbegin', button);

button.addEventListener('click', () => {
    console.log("clicked")
    chrome.runtime.sendMessage('', {
      type: 'notification',
      options: {
        title: 'Just wanted to notify you',
        message: 'How great it is!',
        iconUrl: './images/notification.png',
        type: 'basic'
      }
    });
  });



  // ---- ===================

//   const socket = new WebSocket("ws://localhost:3000");

// // Listen for WebSocket connection open event
// socket.addEventListener("open", function (event) {
//   console.log("WebSocket connected");
// });

// // Listen for messages from the WebSocket server
// socket.addEventListener("message", function (event) {
//   console.log("Message received:", event.data);

//   // Check if the message is a notification
//   if (event.data === "HTTP request received") {
//     chrome.notifications.create({
//       type: "basic",
//       iconUrl: "./images/notification.png",
//       title: "HTTP Request Notification",
//       message: "An HTTP request was received."
//     });
//   }
// });

// // Listen for WebSocket errors
// socket.addEventListener("error", function (error) {
//   console.error("WebSocket error:", error);
// });

// // Listen for WebSocket connection close event
// socket.addEventListener("close", function (event) {
//   console.log("WebSocket disconnected");
// });