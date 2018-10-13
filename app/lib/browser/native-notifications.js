'use strict';

const { nativeImage } = require('electron');
const notifier = require("electron-notifications");

exports = module.exports = ({ ipc, iconPath }) => {
  return () => {
    
    function NotificationTrigger(message) {
      var notification = notifier.notify("Teams", {
        message: message,
        icon: iconPath,
        buttons: ["Dismiss"],
        vertical: true
  });
  
      notification.on("clicked", function() {
        notification.close();
      });
    }
    var hasNotification = false;
    document.addEventListener("DOMNodeInserted", function(e) {
      var toast = document.getElementById("toast-container");
      console.log(toast);
      if (toast) {
        if (hasNotification == false) NotificationTrigger(toast);

        hasNotification = true;
      }
    });

  document.addEventListener("DOMNodeRemoved", function() {
      hasNotification = false;
    });
  };
};
