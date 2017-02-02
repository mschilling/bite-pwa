importScripts('https://www.gstatic.com/firebasejs/3.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.0/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '389337808613'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
    icon: payload.data.image_url,
    data: {
      bite: payload.data.bite
    }
  };

  self.addEventListener('notificationclick', function(event){
    event.notification.close();
    // Check if the current is already open
    event.waitUntil(
      clients.matchAll({
        type: "window"
      }).then(function(clientList){
        for(var i = 0; i < clientList.length; i++){
          var client = clientList[i];
          if(client.url == '/' && 'focus' in client)
            return client.focus();
        }
        if(clients.openWindow){
          return clients.openWindow('https://bite.move4mobile.io/main');
        }
      })
    )
  });

  return self.registration.showNotification(notificationTitle,
    notificationOptions);


});
// [END background_handler]
