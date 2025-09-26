---
title: "Progressive Web Application"
description: "A comprehensive guide covering progressive web application"
date: "2025-09-20"
category: "Development"
image: "/assets/images/pwa/hero.png"
tags: ["javascript","azure","ai","ml"]
---

## Building a Progressive Web Application

![](/assets/images/pwa/progressive-web-apps-logo.svg)
*Progressive Web Apps Logo by Diego González-Zúñiga is licensed under CC*


## Start a project

Create a GitHub project/repository.

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.26.13-pm-1380x488.png)
*Start a project*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.26.40-pm-1382x1052.png)
*Name the project "clock"*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.27.31-pm-1376x808.png)
*Click the "Create repository" button*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.33.03-pm-1836x999.png)
*Click on the "Code" dropdown. Select the "Open with GitHub Desktop" button.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.33.17-pm-1030x640.png)
*Open the project using GitHub Desktop*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.36.39-pm-1836x1260.png)
*The repository has been cloned to the laptop.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-1.38.16-pm-1836x549.png)
*add an index.html page*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.01.07-pm-1824x1128.png)
*Add the Clock.jpg image*


## The clock code is available here:

[https://www.geeksforgeeks.org/how-to-create-analog-clock-using-html-css-and-javascript/](https://www.geeksforgeeks.org/how-to-create-analog-clock-using-html-css-and-javascript/)


## Create an Azure Static Web App

Navigate to the Azure Portal

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.05.56-pm-1800x422.png)
*Use the filter to locate "Static Web Apps"*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.06.15-pm-1800x302.png)
*Create a Static Web App*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.06.40-pm-1794x1086.png)
*Create the Static Web App in a new Resource Group*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.07.04-pm-1802x1080.png)
*Select the "Free" hosting plan. Click the "Sign in with GitHub" button.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.07.26-pm-1028x1206.png)
*Allow Azure to access GitHub*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.07.54-pm-1794x1086.png)
*Select the clock repository we created eariler*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.08.44-pm-1798x1090.png)
*Specify the build details.*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.09.07-pm-1800x1086.png)
*Click the "Create" button*

![](/assets/images/pwa/screen-shot-2021-07-22-at-5.22.07-pm-1836x1064.png)
*A GitHub Action is able to publish content from GitHub to Azure*


## The clock application files have been moved

from here: [https://github.com/Haddley/clock](https://nice-island-028ba9d10.azurestaticapps.net/)

to here: [https://nice-island-028ba9d10.azurestaticapps.net/](https://nice-island-028ba9d10.azurestaticapps.net/)

![](/assets/images/pwa/screen-shot-2021-07-22-at-8.43.57-pm-1836x1126.png)
*Web page runs and shows clock*


## Adding the Progressive Web Application manifest and service worker

To convert our web page and assets to a Progressive Web Application we need to add a manifest and a service worker.

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.30.13-pm-1814x1284.png)
*The manifest file describes the Progressive Web Application*

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.31.24-pm-1830x380.png)
*We add a manifest file reference to the index.html web page*

![](/assets/images/pwa/screen-shot-2021-07-22-at-8.54.03-pm-1836x452.png)
*We add code to the index.html page that will register the service worker.*


## PWA asset generator

We use the pwa-asset-generator to generate a set of application images and icons from the Clock.jpg file.

```bash
% npx pwa-asset-generator Clock.jpg icons
```

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.37.42-pm-1836x1104.png)
*pwa-asset-generator*

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.39.16-pm-1836x1144.png)
*The <link rel=apple... tags are copied from the terminal to head section of the index.html page*

![](/assets/images/pwa/screen-shot-2021-07-22-at-6.39.49-pm-1836x1145.png)
*Details of the generated icons are copied to the manifest.json file*


## Service Worker

To have our app run offline we define an 'install' and 'fetch' event handler.

The install handler ensures that the offline.html file is copied to the browser cache.

The fetch handler ensures that the cached file is used.

The combination of the install handler and the fetch handler ensures that a network connection is not needed to run the app.

[https://developers.google.com/web/fundamentals/primers/service-workers](https://developers.google.com/web/fundamentals/primers/service-workers)

![](/assets/images/pwa/screen-shot-2021-07-24-at-4.11.16-pm-1836x1109.png)
*The service worker has been registered*

![](/assets/images/pwa/screen-shot-2021-07-24-at-4.12.18-pm-1836x1107.png)
*The offline.html file has been copied to Cache Storage*


## iOS

Installing the Progressive Web Application on an Apple mobile phone

![](/assets/images/pwa/221112865-970014710226853-8664174310082239425-n-750x1334.jpg)
*Using "Add to Home Screen" to add the application to iPhone Home Screen*

![](/assets/images/pwa/app-749x411.jpg)
*The Clock application on the iPhone Home Screen*

![](/assets/images/pwa/221614587-799111130749627-6154123063083796691-n-750x1334.jpg)
*The Clock applications runs on iPhone when there is no Internet connection*


## Android

Installing the Progressive Web Application on an Android mobile phone

![](/assets/images/pwa/218393640-224505342860807-4269059075052798195-n-720x607.png)
*Install app menu item*

![](/assets/images/pwa/218456919-367382621414522-3645697656728876533-n-720x446.png)
*Confirm*

![](/assets/images/pwa/217628966-181149494000738-7175079271432635419-n-720x613.png)
*The application has been added to the Android Home Screen*

![](/assets/images/pwa/218449402-540617857358530-1249974336792165683-n-720x459.png)
*The running application*


## MacBook

Installing the Progressive Web Application on a MackBook

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.52.52-pm-1836x1126.png)
*The Clock app can be "installed" onto a MacBook*

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.53.04-pm-924x376.png)
*Confirm the Install*

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.53.22-pm-1604x1166.png)
*The Clock Application running on the MacBook*


## Windows 10

Installing the Progressive Web Application on a Windows 10 laptop

![](/assets/images/pwa/microsoftteams-image-1-1293x715.png)
*The Clock app can be "installed" onto a Windows 10 laptop*

![](/assets/images/pwa/microsoftteams-image-2-611x345.png)
*Confirm the Install*

![](/assets/images/pwa/microsoftteams-image-3-1248x1019.png)
*Launching the Clock application from the start menu*

![](/assets/images/pwa/microsoftteams-image-4-1092x584.png)
*The Clock Application running on the Windows 10 laptop*


## Lighthouse

The Lighthouse tab in Google Chrome DevTools is able to provide feedback on the Progressive Web Application.

![](/assets/images/pwa/screen-shot-2021-07-22-at-9.18.29-pm-1836x1009.png)
*Lighthouse report*


## sw.js

```text
const CACHE_NAME = 'clock-cache-v1';
const urlsToCache = [
  '/offline.html',
];
const OFFLINE_URL = "offline.html";


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


this.addEventListener('fetch', event => {
  if (event.request.method === 'GET' &&
    event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
        return caches.match(OFFLINE_URL);
      })
    );
  }
  else {
    event.respondWith(fetch(event.request));
  }
});
```

## offline.html

```html
<!DOCTYPE html>
<html lang="en-US">

<head>

    <meta charset="UTF-8">

    <title>Clock</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="apple-mobile-web-app-capable" content="yes">

    <meta name="description" content="Clock app">
    <style>
        #clockContainer {
            position: relative;
            margin: auto;
            height: 40vw;
            width: 40vw;

            background: url("data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAEsASwBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oACAEBAAA/APf6KKKKKKKKKKKCQBk1jah4r0TTCVuL+IyD/lnGd7fkK5q8+J9omRZafNL6NKwQfkMmsS5+JGtS58lLW3HbCFj+ZP8ASs9vFXiW8J239yc9oYwP/QRTd/im653atJn3koGneJjz5Gpn/gTf40otPE8XIj1RfoX/AMacNT8T2nW51NMf3wxH6irEPjnxBbnD3iye0sS/0wa17X4lXiYF3p8Mg9YnKH9c1vWXxA0a5ws5mtWP/PRMr+YzXR2l9aX0fmWtzFMvrG4NWKKKKKKKKKKKKKKKKKKKKKKKq32o2em25nvbmOCMd3OM/T1/CuI1b4mRIWj0m1Mh6edPwv4KOT+OK5GfVPEHiWUxmW5uQT/qoRhB+A4/OtGx8AajOA11NDar/dHzt+Q4/WugtPAekwYM7T3Lf7TbR+Q/xrZttE0u0x5Gn2yEd/LBP5mtBE2jCLgf7IxT/LkP8LUvkSf3DR5Ug/gNG2QdmFQS2sE4KzQRSA9nQH+dZlz4V0W5yTYrGT3iJT+XFYl34AiOWs710PZZl3D8x/hWFc+G9b0l/OSFzt5822YnH5c1d03x1q9iQlyy3cY4Il4cf8CH9c12uk+MtK1QrGZTbTn/AJZzcZPs3Q10Oc0UUUUUUUUUUUUUUUUUVHPPFbQvNPIkcSDLO5wAPrXAa98SFQtBosYc9PtMi8f8BXv9T+Vclbadrfii6NwTLOScG4mbCr9D/QV12meBLC1CvfMbuX+791B+HU/jXUwW6RRiK3iVEHRI1wB+Aq2lo5+8QtTLaRjrlvrUqxovRQPwp2cDPQV5P8Q/jXYeFbuLT9FS21S9BJuP3h8uEemV6tnt2xzXdab4khl8D2viXUdltE9gt5OFyQgKbiB3NeSn49a3qUt3NoXg6S5sbVd8sjO7sif3n2jC/rXffDn4lWXxAs7nZatZ31rt863Z942noytgZGQe3FdsQO4zTDEh/hx9KjaAfwn86jMbr2/EVnahomnamD9qtkZ+0i/K4/EVyGp+B7mANJp8n2hP+eb4D/4H9KpaX4l1fQJfs7FniQ4a3nz8v07j+Veh6J4o0/W1CRv5VzjmCQ8/h6/hW1RRRRRRRRRRRRRRRWL4g8T2Hh+DM7eZcMMxwIfmb3PoPevLNR1jWPFt+sJDSZOY7aL7q+//ANc102i+Bre2Cz6oVuJevkj7i/X+9/KuxihyqxxIAqjACjAA/pVyO0UcyHJ9B0qwqhRhQAPaloorP13TTrOgahpgm8k3dtJB5mM7NykZx3xmvmb4s/DvSfAGkaHHYyTXFzcvN9ouJjy+0LgBRwo5Pvz1r37wdZWuo/DHQrS9t47i2l0yBZIpV3Kw2DgjvXnHjfx14f8AA8F74X8EaZb/ANq3ZMdwbWP5IWI24wPvPzjA4Hfnitj4KfD2+8Jafd6pq6GG+v1VVtieYYxz83+0T27YHevVzSUd6SmtGrdRUTRFeRyKztS0iy1WLZdwhiB8rjhl+hrhNX8LXukMbi3LT26nIkQYZPqB/MVr+H/HMkRS21YmSPotwBll/wB71Hv1rv4pY54llidXjcZVlOQRT6KKKKKKKKKKKK47xZ42i0ffZWBWW/6M3VYfr6n2/OuC0rRNR8TXr3Ekj+WWzNcyc5PoPU+3avSdL0iz0i2EFpFjP33PLOfc/wBK2IrQnDScD0ryvx38Yrrwd41ttEXRtlnE8clzPKctLE3UxgdMc8nuCMCvW7a5hvLWK5t5FlgmQSRupyGUjII/CpaKKKK8t+MvgLWvHMGjpo4tibRpTJ50uz7wXGODnoa6MaRr2n/CuDR9MaFNch02O1RzJhEkChSwbHYZI46gV4lpvwY+I2j6gL/T7mxt7tcgTJd/MM9cEr1969S+HOh+P9K1a8l8Xat9stHg2wp9p8za+4c4wMcZr0c9KSg0lFeS/ET4xN4P8WWmkafZw3wiXdfozEMC2NqKR0bHJ4PUCvULSU3thb3MlvJbSSxq7QyY3xkjO1scZHSnMpXrXKa74Qiu91zpyrFcdWi6K/09D+lc/ouv33hy7aCRHaANiW3fgqfUeh/nXp+n6hbanaJc2sgeNvzB9COxq1RRRRRRRRRRXDeNPGf9n79M0yQG7IxLMv8Ayy9h/tfy+tcn4a8Ly6zILu73pZZznPzSnvg+nqa9MtrZIYkt7eJUjQYVFGABWlDAsXPVvWpq88+Kvw3Pj3TrN7KSGDU7WQBJZchTEx+ZTgZ46j6H1rpPBfht/CXha00V9Qlvvs4IEsihcZOdoHZR2yTW/RRRRRSGikpO1JQaSivH9O+Cr23xM/4SHUNTGpaeJGu9sy4lafOVDgcFQecjHQDFev0h5FRsmOR0rE13w/b6zDu4julHyS46+zeo/lXFWF/qHhfVWVkKkHEsLH5XH+ehr1DTdSttVskurZ9yNwQeqn0PvVyiiiiiiiiuO8beLf7HhNhZOPt8i/Mw/wCWKnv9T2/OuL8L+Gn1mf7XdhhZI3JJ5lb0z6epr0+CAYWKJAqqMAAYCitGKJYlwOvc+tPpaKKKKKKKKQ0UlJSUGkoopKSio2XnIrJ1zRIdZtdpwlwg/dS+nsfauI0vUr3wxqzq6MADtnhJ+8PUe/oa9StLuG+tY7m3cPFIMqRU9FFFFFFYnifxBF4f0ppzhriTKwRn+JvU+w6mvLNF0q68TaxJJcSOY93mXMx6nPYe5/QV6rbWyRRR21vGEjQBUVegFakUSxJgde59akpKWiiiiiiiikNFJRTaDSUUUlIaKTvTCO9YPiTQV1W286FQLyIfKf74/un+lc54V15tIvfstyxFpK2GDf8ALNumf8a9NByMiiiiiio5547aCSeZwkcalmY9AB1NeLaxqN34t8RAwqTvbyreM/wr7/zP/wBavSNH0uHSNOjtIBnHLvjl2PU1vQQ+UmT949amopKWiiiiiiiikopKQ0lBpKKKSkNFJSU0iuL8X6JsY6nbr8rHE6jsezf41qeC9bN3bf2dcNmaFcxkn7yen1H8q6yiiiivPfiRrxRE0W3flwJLgg9v4V/Hr+VReBtF+zWh1Sdf3s4xED/Cnr+P8vrXdWkWT5hHA6VcoooooooooooopKQ0UhpKKSikNFJRTaDSUyWJJonilUMjgqynuDXm13BceHNdBiJ3RMHiY/xL7/qDXp1hexahYw3cJ+SRc49D3H4VZooqtqN9FpunXF7OcRwoXPv7fj0rxjT7efxR4lJnJJmcyzsP4V7j+QFetQxD5Io1CqAAAOgArzT4vfEHxJ4L1PSo9GtGjslBkmuJod0M5PAiz2wOTyDyPSug+HPxU0/x8HtBaTWmpwx+ZLFgvGVyBlX+p6HB+tegUUUUUUUUUUUhopKKSkpKKKSikpKSs3XtdsPDejXGranI8dpAAXZELnk4AAHqTivItK+Otxrfj3T7C20kx6NPJ5LLtMlw2eA5xwADyQM8Z5Ne3d6wfFml/btLM8a5mtssMdSvcf1/Cs3wNqnlzyabI3yyfvIv94dR+I5/Cu7oorz74matsgttJjbmQ+dLj+6OFH55P4UngTS/sulNfOuJbo/L7IOn5nJ/Ku3tI8KXPU8CnXdnbX9rJa3lvFcW8o2vFKgZWHoQaxvDHgrQvB7Xx0Wz+z/bJBJIC5bGBwozyFGSce5roaKKKKKKKKKSikopDSUUlFFJRSUhpKrahYW2qadc2F5GJba5iaKVD3UjBrG8K+CNA8HWvlaRZKkrDElzJ800n1b09hgV0NGMjBGR3Fea6jbyaD4gJh48txLCfVeoH8xXp9pcx3lpFcxHKSoGH41NQTgV4hqs8niXxdJ5ZJFxOIovZBwD+QzXq9vAkMUVvEuERQij2HArUUBVAHQU6iloooooooopKKKSikpKSiikopDRSUlFJRQK5jxpY+ZZw3qj5om2N/unp+v86s+B77ztNls2OWgfK/7rc/zzXU1jeK9QOm+Gb64U4cx+Wn+83yj+dedeALHztZlumHy20fy/7zcD9M16farmQt6CrlFLRRmjNLRRRSUZopKKKTNJQaSiikopKKbRSUUUneodQtBe6fcWzf8ALRCo+vb9cVxHhK6Np4gjjY4EwMTD36j9RXpNcF8T7zZp9jZA/wCtlMjD2UYH6tSeA7TyNAacj5riUt+A4H9a7S3XEefU1MDS0UZpaKKKKKKKTNFFJSUUlFFJRSGikNJRSUUUlPB4Fecauh0zxJMycbJhMn0PzV6dG6yRrIpyrAEfQ15R8SLrzfEiQ54gt1GPckn/AArtdDtvsmhWMGMFYFz9SMn+dbqDCKPQU6lzS0UUZozRmijNGaKKSikopKKKKSikopKSikopDRTk5zXFeNINupwTY/1kWD9Qf/r11nh+c3GgWTk5IjCn8OP6V5T4qY3njS9XrmdYh+AC16qqBSqDoMLV6loopc0tFFFFFFJRmkoozSUUUUlFIaKQ0lBpKKKSilj61zXjaLNpaS/3ZGX8xn+lXvB0wOghGP3JWA/n/WvNn/0nx0xPO/Uf/Z69ZjGZR9aj13WLfw/oV9q92GMFpC0rKvVsdAPcnA/GvEdM8ffFPxdY6lrmhW+nQ6dZMd0HlqScDcVUtyxAwT09q774V/Ef/hPdLuEvII4NUsyvnLFnZIrdHUHpyCCP8a9BoopaM0ZozRmkooornfGfjPTPBOinUNQLOztsgt48b5n9B6Adz2/KvDrv48+L7i5MlnY6ZbQZ+WJomkOPdiwz+AFehfDz4wW3i2+XSNVtUsNVcfutjExT45IXPKt7HOcda9QopKKSikopKSiikNeS+LPGvjm48bjw14U0j7MgYoL28tjtlIGWYMw2hBg+pP44qj4O+JvidfiH/wAIf4rgtZZ2laDzbdApjkAJH3eGU49MjNe0R/erF8YJu0QH+7Mp/nWLoF4bexkTcR+9J/QVymm/N42hz3vj/wChGvWov9Yv1qr4m0SPxJ4Z1HRpZDEt5A0fmAZ2HqD+BArw3wzo3xM8GadrGgWNhp7WE5eSS+knVkg+TDOMNn7o6Fc8dKr/ALOMch8VaxIM+UtiFb0yZBj+Rr6PpaM0UUUUUUUUlfNvx5u57j4hWdnKT9nt7FGiXtl2Ysf0A/CvI7i5m+0MA7KFOAAcYq/b3k9rNY6hAxS6hlSSNh13KwINfbqMWjViMEgEj0zS0UlFFJSUUlFFJXP65f22q2N5oOm+IbS11i4ieOHZcAyRMOSQqndkAGvA9F+0/DP4yx2eqJBq088scZu23GQCbH7xcnhvm5znvzzmvp1RiTHpxWR4sH/Egk/66J/OuQsDiFuv3u30FY1oPJ8bxg/w35H/AI+a9Zj/ANYv1qS9s4NQsbiyuk8y3uI2ikTONysMEZrxf/hRWsac99baH4yltdNvhsnieJtzpz8rbThup546mvRPAngPTfAekSWdk7z3E7B7i5kADSEdBgdFHOB7murooopaSiiiiiivL/jB8PLrxbZ2+raQofVbFCnkk48+LOdoP94HJHrk+1fOF5bSWt00Go6fPBdIcNHLGyNn3Br0b4afDPU/EWt2mratZSWmi2rrKBMhU3JByFVTztzjJ6Y4FfTFFJRRTaKKSiikory3xX8Hhqnij/hJPD2sto2pM/mviMlTJ3dSCCpPccg8+tN8M/B5rDxSviTxJrj6zqCSCVAUIXeOjMScnHGBwOBXqiffFZPi040Fh6yoK5bTIGkt3IB+/j9BWFqY+yeN7hugS+3/AIbgf616uOJB9atUZpaKKKKKKKKKKKKKayKxBZVYjoWAOKXrRSZoopKSiikoopKKSkp8X3/wrC8ZPt0qFO7TD9Aag8LWXn6U7kdZj/IVx3jmE2/i26cDHmKko/75A/mK9ItZhPaQTDpJGr/mM1oA5GaWijNLRRRRRRRRSUZooopKKKSkopKKKKSikopKki6k1y/jSXmzh/3nP6CtjwrF5Xh+Anq5Z/1/+tXI/Eq126hY3YHEkbRk+6nI/nW54UuftPhqzOctGpiP/ATj+WK6KM5QU7NLRRRRmjNGaM0ZozRRRRSZoopM0lFFJRRRSUUlFIaKmiHy59a4XxXP5utugOREip+PU/zrudPt/s2nW0GMFI1B+uOa574gWX2nw4Z1GWtpFk/A8H+f6Vh+ALvMF5ZE8qwlUex4P8hXcwngipaKKM0UtFFFFFJmjNFFFJmikoopKKKKSikNFJRSVZ4RMk4CjJNed2ynVvESEjImn3n/AHc5/kK9KqvfWqX1hPayfdmjZD+IryTw5cPpPiaJJvly5t5Qe2Tj+YFepodrCp80ZpaKKKKKKKKKKKTNFJRRmkoooopKKQ0UUlFLGNzj25qn4iu/smizkHDy/ul/Hr+maw/Bln5l5PdkfLEuxfqf/rD9a7WivKfHWmmx8QG5QYjuh5gI7OOG/ofxrtdE1AanpFvdZ+crtk9mHB/x/GtZTlRS0UuaM0ZozRRmjNGaM0UlFFGaKSlpKKKSikoopKOlIanhXC5PeuN8X3vnX6Win5IFy3+8f/rYrpfD1j9h0aFGGJJP3j/U/wD1sVq0Vz3jLSf7U0GQxrme3/ex+px1H4j+QrkPA2qCC9k0+RvkuPmjz/fHb8R/KvQUODj1ryb4qfFvUPCWovoelacY7wxrJ9tuQCm1hwY179xk9weKZ8F18cSXWoal4gFw+mX6iRZL1yJGkHAZFPO0jjsOBivYaKKKKKKKKKKKSiiiiikzRRSUUUlYHjO21u98I6ja+HjEupTRGNDI+zCnhtp7NjIGeOa8I8I+P/G/g3XLfwzqVhc3waRYUsLrIlXJwPLc9vTOV+lfS0al2AIwe/OcU+9u47CyluX+7Gucep7CuD0i0fWNcUzfMCxlmPtnP6nAr0eiiivI/E2lvoPiAvb5SJ2863Yfw88j8D+mK77SNSj1XTYrtMBmGHX+6w6ilvNC0nU9RtNRvdOt7i7swRBLKgYx564zx2/DtWl3oopc0UUZozRmkoooooooopM0UUlFJRRSVXmsbS4ube5mtoZZ7YloJXQFoiRg7T1HBrQiTauT1Nch4t1Pzp1sIm+SI7pD6t2H4Vs+F9N+w6b50i4muMMc9QvYf1/Gt2iiisXxRoo1vSXiQD7RF88JPr6fj0rgPC2sHSNSMFwSlvMdsgb+BugP9DXpSnHNSZooooooooooooooopM0UUmaKKSiikzSVJEm45PQVX1nU10uwaXgyt8sS+rev0FcjoGmtqupmSbLRRnfKx/iPp+Jr0LpRRRRRXnvjnw/5Mp1a2T925xcKB91v7349/erPhDXvtcA065f9/EP3TE/fUdvqP5V1gNOpKKKWiiiiiiikzRRRSZooopM0UUlJTkUu2B+NTSyRWtu0sjBI0GWY9hXAX93ca9qy+WhO47IY/Qe/wDM13Wl6dHplilvHyRy7f3m7mrtFFFFFMliSeJ4pUDxuCrKehB7V5Vr+iT+HNUWWBnEDNvt5R1UjsfcfqK7Lw/rses2mGwl1GP3qev+0Pb+VbWaM0UZpaKKSjNGaKKKKTNFFFJmiikopKVVLnAqyqrGh5AA5JNcR4h1s6jN9mtyfsqHqP8Alo3r9PSt7w3on9nw/abhf9KkHQ/wL6fX1rfoooooooqrqFhb6nZSWtym6Nx+IPYj3ry2/sL/AML6urK5BU5hmA4cf56iu60PXINZtsjCXCD95Fnp7j1Fa1FFZXiDxFpfhfS/7R1e5Fva+Yse7aWJZjwABye5+gNXLHULPVLOO8sLqG6tpBlJYXDKfxFWaKKKKTNGaKKKTNFFJWFa+MdAv/Eb6BaanDPqKRtI0cR3KADyN3QsOuB2zW5RSqhc4H51ZVVjQ8gAckmuN8QeIPtha0tGxb9Hcf8ALT2+n86veG/D5jK394nz9Yo2HT/aPv6V1VFFFFFFFFFVNS0221Wza2uk3IeQR1U+oPrXmOpaVqHhjUkkV2ABzDcJ0b2Pv6iuv0HxJBqqrBNtivAPudn91/wrepK+e/jd/wAJHr3jPTdEi025Sw3LFZNt+S4mf7zZHHHTB5ABPevafCXhu28JeGbPRrXDCFcyyAf62Q8s34np7AVt5ooooorG1Lxb4c0e6+y6lrun2lx3ilnUMPqO341pWt5bX1slzZ3EVxBIMpLE4dWHsRxU2aKKSjNJXzR438Kap4G+KFlf+GraV1u5vtNhHChbD5+eLA7c9P7rV9I2k0txZQTT27200kau8DkExMRkqSOODxVqOItyeBUsksVrA0krrHGgyWY8CuJ1vxDJqRNvbbktc4/2pPr7e1afh/w35ZS8vk+frHEe3uff2rqqKKKKKKKKKKKhu7SC+tnt7mJZInGCrV5zr3hW50hzc2pea0ByGH3o/r/jVzRfGDIFt9TJZeizgZI/3h3+tdlFJHPEskTq8bDKspyDSsgOOAcHIz2NFFFFJmjNc/451mbQPA+s6pbNtuILY+U391yQqn8Cc/hXzN4WufBkej6tc+LIb6/1K5YpALfJeIYy0xJIGdxHXPQ8c17d8GrXw7BoV4/hzWL+8ikkUz214qo0D4PIVem4d8kHHtXpdJRmkoopVjLsCF5HQ+lTpCq8nk1T1PWbTS0/etvlI+WJfvH6+grjLu/v9eu1j2s3P7uGPovv/wDXNdRonhuLT9txc7ZbrqP7qfT1PvW/RRRRRRRRRRRRRQRkYNcnrfguC7LXGnFYJjyYz9xvp6H9K5SC71Xw5dmIh4WzloZBlW9//riut0vxZY322O4P2Wc8Yc/IT7H/ABrf4YA9QehpCnpTSCOoooorB8a6LL4h8F6vpMGPPubYiIE4BcEMo/EgD8a8H+GPjDw/4J07xDpviWyljvJjjY1vuMgCkGJs/d5Pfjmtz9njS71brWdWMTx2EkSwIT0kcNu49do7+9e80lFFPWN27Y+tSrAo68mmXd7a2EXmXMyRL2B6n6DvXKan4tlmDR2CmJP+erfeP0Haqem6Be6rJ50haOJjkzSclvoO9drp2l2umQ7LePBP3nPLN9TV2iiiiiiiiiiiiiiiiq17YWuoQGG6hSVPRhyPoe1cbqngaWMtJpsvmL/zykOGH0PQ/jWLb6jq+gzeTulix/yxmXKn6A/0ro7HxrbyALewNC39+P5l/LqP1robXULO9XNtcxS+ytz+XWrBQdxSGMdjTfLPYik8pvb86oXnh/S9RmE19pVjdSjo89ujt+ZGaux2whiWKKNI41GFRAFCj2A6U/ym9qUQ+rU8RKOuTTvlRd3CgdSeKzLvxFplnkG481x/DF8369K56+8X3cwK2sa26f3j8zf4CqVpo+p6xL5xVyG6zTE4/wAT+FdVpvheysSsk3+kTDu4+UfQf41u0UUUUUUUUUUUUUUUUUUUVDc2lveRGK5hSVD/AAuua5y+8D2UxLWkslux/hPzr+vP61z114S1ezbdHEJwOjQtz+RwagTV9a0xtjXFxHj+Cdcj/wAerSg8aXq/663gl91ypq/F43tz/rbKVf8AccH/AAq0njHTG+8twv1jB/kakHizSf8AnpL/AN+jQfFulAcPMfpEahfxlYL9yC4c/QD+tVZfGp6Q2I+ryf4Cs+fxXqc3CPHDn/nmnP65qutrrGrNkpdTg93JC/rxWraeDLl8G7uEiX+6g3H8+ldBY+HtOsCGSASSD+OX5j/gK1aKKKKKKKKKKKKKKKKKKKKKKKKKa8aSLtdFZfRhkVnT+H9JuCS9jCCe6Db/ACqhP4O0oqWQTp7LJn+eawbzQLW3LbJJjg45I/wrP/s+LP33/Mf4VJDpsMjgF5PwI/wrdsvC1hPgvJcH6MB/StWLwrpEXJt2kP8AtuTWjBp9nbY8i1hjI7qgz+dWaKKKKKKKKKKKKKK//9k=");

            background-size: 100%;
        }

        #hour,
        #minute,
        #second {
            position: absolute;
            background: black;
            border-radius: 10px;
            transform-origin: bottom;
        }

        #hour {
            width: 1.8%;
            height: 25%;
            top: 25%;
            left: 48.85%;
            opacity: 0.8;
        }

        #minute {
            width: 1.6%;
            height: 30%;
            top: 19%;
            left: 48.9%;
            opacity: 0.8;
        }

        #second {
            width: 1%;
            height: 40%;
            top: 9%;
            left: 49.25%;
            opacity: 0.8;
        }
    </style>

    <script>

        setInterval(() => {
            d = new Date();
            hr = d.getHours();
            min = d.getMinutes();
            sec = d.getSeconds();
            hr_rotation = 30 * hr + min / 2;
            min_rotation = 6 * min;
            sec_rotation = 6 * sec;

            hour.style.transform = `rotate(${hr_rotation}deg)`;
            minute.style.transform = `rotate(${min_rotation}deg)`;
            second.style.transform = `rotate(${sec_rotation}deg)`;

            hour.style.visibility = "visible";
            minute.style.visibility = "visible";
            second.style.visibility = "visible";
        }, 1000);

    </script>
</head>

<body>

    <div id="clockContainer">
        <div id="hour"></div>
        <div id="minute"></div>
        <div id="second"></div>
    </div>

</body>

</html>
```
## References

- [Create an Analog Clock using HTML, CSS and JavaScript](https://www.geeksforgeeks.org/how-to-create-analog-clock-using-html-css-and-javascript/)

