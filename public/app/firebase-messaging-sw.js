importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase inside the Service Worker with your Web config
firebase.initializeApp({
  apiKey: "AIzaSyC9KAJpEJpOzLv-TnQkk6BnnXqdK473YbY",
  authDomain: "paperbuddy-bbd4f.firebaseapp.com",
  projectId: "paperbuddy-bbd4f",
  storageBucket: "paperbuddy-bbd4f.firebasestorage.app",
  messagingSenderId: "367551683620",
  appId: "1:367551683620:web:008804bf19578016324cb1",
  databaseURL: "https://paperbuddy-bbd4f-default-rtdb.firebaseio.com"
});

const messaging = firebase.messaging();

// Handle background notifications on Web
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || payload.data?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'You have a new update.',
    icon: '/icons/Icon-192.png',
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const route = event.notification.data?.route || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(self.location.origin + '/#' + route);
      }
    })
  );
});