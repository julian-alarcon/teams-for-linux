'use strict';

const { nativeImage } = require('electron');
const notifier = require("electron-notifications");

function notificationTrigger(message) {
  let notification = notifier.notify("Teams", {
    message: message,
    buttons: ["Dismiss"],
    vertical: true
  });
  notification.on("clicked", function () {
    notification.close();
  });
}

exports = module.exports = ({ ipc, iconPath }) => {
  setTimeout(() => {
    var targetNode = document.documentElement || document.body;

    var config = { attributes: true, childList: true, subtree: true };

    var callback = function (mutationsList) {
      for (var mutation of mutationsList) {
        if (mutation.type == 'childList') {
          if (mutation.target.id === "toast-container") {
            //investigate how to get it from the toast message itself
            let message = mutation.target.innerText;
            notificationTrigger(message);
            console.log('A child node has been added or removed.', mutation);
          }
        }
      }
    };

    var observer = new MutationObserver(callback);

    observer.observe(targetNode, config);
  }, 7000);
};

