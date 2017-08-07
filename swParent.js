importScripts('/public/scripts/serviceworker-cache-polyfill.js');
//importScripts('/public/scripts/push/libs/idb-keyval.js');
//importScripts('/public/scripts/push/analytics-sw.js');


// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// var appRequest = new Request('/indexParent', {
//     credentials: 'include'
// });

var dataCacheName = 'parentIndex-v1';
var cacheName = 'parentIndex';
var filesToCache = [
    '/',
    '/app/views/login.html',
    '/public/scripts/recapchaController.js',
    '/app/views/indexParent.html',
    '/public/css/styleParent.css',
    '/public/scripts/parent/studentInfo.js',
    '/public/scripts/parent/scroll.js',
    '/public/scripts/parent/custom-file-input.js',
    '/public/scripts/parent/controllers/chatController.js',
    '/public/scripts/parent/controllers/marksController.js',
    '/public/scripts/parent/controllers/pupilController.js',
    '/public/scripts/parent/controllers/recapchaController.js',
    '/public/scripts/parent/controllers/upDownloadController.js',
    '/public/scripts/parent/core/pupilCore.js',
    '/public/scripts/parent/directives/chatDirective.js',
    '/public/scripts/parent/directives/uploadDirective.js',
    '/public/scripts/parent/filters/chatFilter.js',
    '/public/scripts/parent/schedule/jquery-3.0.0.min.js',
    '/public/scripts/parent/schedule/main.js',
    '/public/scripts/parent/schedule/modernizr.js',
    '/public/scripts/parent/services/chatService.js',
    '/public/scripts/parent/services/marksService.js',
    '/public/scripts/parent/services/pupilService.js',
    '/public/scripts/parent/services/scheduleService.js',
    '/public/scripts/parent/services/upDownloadService.js',
    '/public/scripts/parent/services/usersService.js',
    '/public/scripts/shared/ng-table/ng-table.min.css',
    '/public/scripts/shared/ng-table/ng-table.min.js',
    '/public/scripts/shared/angular-table.js',
    '/public/scripts/shared/angular-table.min.js',
    '/public/scripts/shared/partialController.js',
    '/public/scripts/shared/pupilService.js',
    '/public/scripts/shared/scheduleService.js',
    '/public/scripts/shared/upDownloadController.js',
    '/public/scripts/shared/upDownloadService.js',
    '/public/scripts/shared/uploadDirective.js',
    '/public/scripts/shared/usersService.js'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
            // .catch(function(err) {
            //     console.log(err);
            // });
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    /*
     * Fixes a corner case in which the app wasn't returning the latest data.
     * You can reproduce the corner case by commenting out the line below and
     * then doing the following steps: 1) load app for first time so that the
     * initial New York City data is shown 2) press the refresh button on the
     * app 3) go offline 4) reload the app. You expect to see the newer NYC
     * data, but you actually see the initial data. This happens because the
     * service worker is not yet activated. The code below essentially lets
     * you activate the service worker faster.
     */
    //return self.clients.claim();
});

// self.addEventListener('fetch', function(e) {
//     console.log('[Service Worker] Fetch', e.request.url);
//     e.request.referrer = "http://localhost:8080/indexParent";
//     var dataUrl = 'localhost:8080/login';
//     if (e.request.url.indexOf(dataUrl) > -1) {
//         /*
//          * When the request URL contains dataUrl, the app is asking for fresh
//          * weather data. In this case, the service worker always goes to the
//          * network and then caches the response. This is called the "Cache then
//          * network" strategy:
//          * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
//          */
//         e.respondWith(
//             caches.open(dataCacheName).then(function(cache) {
//                 return fetch(e.request).then(function(response) {
//                     cache.put(e.request.url, response.clone());
//                     return response;
//                 });
//             })
//         );
//     } else {
//         /*
//          * The app is asking for app shell files. In this scenario the app uses the
//          * "Cache, falling back to the network" offline strategy:
//          * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
//          */
//         e.respondWith(
//             caches.match(e.request).then(function(response) {
//                 //e.request.referrer = 'http://localhost:8080/indexParent';
//                 return response || fetch(e.request);
//             })
//         );
//     }
// });


// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         // try to return untouched request from network first
//         fetch(event.request.url, {
//             mode: 'no-cors'
//         }).catch(function() {
//             // if it fails, try to return request from the cache
//             //return caches.match(event.request).then(function(response) {
//             //  if (response) {
//             //    return response;
//             //}
//             // if not found in cache, return default offline content
//             if (event.request.headers.get('accept').includes('text/html')) {
//                 return caches.match('sw-offline-content');
//             }
//         })
//         //})
//     );
// });




self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'The school №14';
    const options = {
        body: event.data.text(),
        icon: '/public/img/logo-192x192.png',
        badge: '/public/img/badge-72x72.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});



self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
        clients.openWindow('http://localhost:8080')
    );
});




/* eslint-env browser, serviceworker */
// Until(
// clients.openWindow('http://localhost:8080')
// );
// });




/* eslint-env browser, serviceworker */
