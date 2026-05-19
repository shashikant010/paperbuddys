// File: web/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId. Use the values from your firebase_options.dart / console.
const firebaseConfig = {
  apiKey: "AIzaSyCC0LnM3UTmNS2R-p-jIq8f0PvEK-lOcSg",
  authDomain: "paperbuddy-bbd4f.firebaseapp.com",
  databaseURL: "https://paperbuddy-bbd4f-default-rtdb.firebaseio.com",
  projectId: "paperbuddy-bbd4f",
  storageBucket: "paperbuddy-bbd4f.firebasestorage.app",
  messagingSenderId: "367551683620",
  appId: "1:367551683620:web:d8f89c04e6537470324cb1",
  measurementId: "G-2RXXNEN0EY"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // You can customize the notification display here if needed, 
  // but Flutter handles basic displays automatically if routed properly.
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/icons/Icon-192.png',
    data: payload.data
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

// Handle clicks in background
// Handle clicks in background
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  
  let route = event.notification.data?.route || '/';
  
  // Ensure Flutter Web hash routing is applied
  if (!route.startsWith('/#')) {
    route = route.startsWith('/') ? '/#' + route : '/#/' + route;
  }
  
  // Open the window/tab to the correct hash route 
  event.waitUntil(
    clients.openWindow(route)
  );
});