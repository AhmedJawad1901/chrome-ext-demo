document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.getElementById('save-button');
    const clearButton = document.getElementById('clear-notification');
    const websocketUrlInput = document.getElementById('websocket-url');
    setStatus();
    displayNotifications();

    saveButton.addEventListener('click', function() {
      const websocketUrl = websocketUrlInput.value;
      chrome.storage.sync.set({ 'websocketUrl': websocketUrl }, function() {
        console.log('WebSocket URL saved:', websocketUrl);
      
      });
    });

    clearButton.addEventListener('click', clearNotifications);
  });


  function setStatus()
  {
    chrome.storage.sync.get("status", function (data) {
        const status = data.status;
        const statusText = document.getElementById("status");
        if (status === undefined || status===false)
          {
            console.log("socketurl is undefined")
            statusText.innerText = "Not connected";
            statusText.style.color = "red";
          }
        else
        {
        statusText.innerText = "Connected";
        statusText.style.color = "green";
        }
      });
  }

  chrome.storage.onChanged.addListener(setStatus);


// Function to retrieve and display stored notifications in popup
function displayNotifications() {
    chrome.storage.local.get({ notifications: [] }, function(data) {
      const notifications = data.notifications;
      const notificationsList = document.getElementById("notifications-list");
  
      notifications.forEach(function(notification) {
        const listItem = document.createElement("li");
        listItem.textContent = notification.title;
        // listItem.textContent = notification.title + ": " + notification.message;
        if(notificationsList.firstChild===null)
            notificationsList.appendChild(listItem);
        else
        {
            // notificationsList.firstChild.getRootNode
            notificationsList.insertBefore(listItem, notificationsList.firstChild);
        }
      });
    });
  }
  

  function clearNotifications() {
    chrome.storage.local.remove('notifications', function() {
      console.log('Notifications cleared');
    });

    displayNotifications();
  }