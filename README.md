# Raspberry_with_Angular_2_home_automation

# Requirements
- Raspberry model B plus
- [4 Array module](https://www.google.bg/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjp9OCg5JLSAhXBVRoKHcwLAUIQjRwIBw&url=https%3A%2F%2Fsainsmart.wordpress.com%2Ftag%2Farduino-projects%2F&psig=AFQjCNFiUFqfPiZS2s5eYdKOsTYGp1x3lA&ust=1487271492996748)

## Raspberry requirements
- [Raspberian](https://www.raspberrypi.org/downloads/raspbian/)
- [NodeJS](https://nodejs.org/en/download/)
- [Johny Five](http://johnny-five.io/)
- [Raspi-io](https://github.com/nebrius/raspi-io) 
When you install them, watch carefully for other dependencies.

## Descriptiion
The idea is to log into a website where you can chouse the name, type and the pin of your device. After you set the devices you can control them (switch on/off) and set timer.
#### Used technologies
- NodeJS
- Express 
- MongoDB
- Angular 2
- Johny Five
- socket-io
- Auth0

##### Frontend
Created with Angular 2 QuickStart. Also [ng2-bootstrap](https://valor-software.com/ng2-bootstrap/#/) was used for the modals, timepicker, tabs and etc.

##### Backend
Express is the perfect server side with routing and middleware.

##### Database
The database is a representation of the configured devices for specific user.
MongoDB is the a good solution for database.Every device has the following fields: 
- id (contains the oid given )
- gpio (on which pin it's connected) 
- icon (the class represetation of the type ) 
- type 
- onTimer (true if the timer is running) 

##### Johny Five io
Without Johny Five the project should be very difficult to implement on Javascript. Johny Five is basically the js representation of a library, supporting more than 50 boards. Read more about this framework on the [official](http://johnny-five.io/) page.
##### socket-io
This API is used for bi-directional comunnication channel, based on sockets. In the current projects this is used for the timer implementation.
##### Auth0
Auth0 is a authentification framework.

## Installation
1) Clone the project on the raspberry
2) Register in mlab and create new document
3) Copy the  MongoDB URI and paste it in routers/index.js (line 5)
4) In index.js change the avaibleGPIOs array with the pins connected on your raspberry
5) Go to your project folder and run: node server
6) Type localhost:4444 or your-ip-address:4444 to log into your web application
7) Create an account in Auth0, register your application and include http://localhost:4444 in the "Allowed Callback URLs" setting
8) Copy the Client ID and Domain and change them in /relay/app/authentication/auth.service.ts file
9) open other shell, go to relay folder and rebuild angular project: npm start
10) Enjoy

## Control from anywhere 
The idea is to control your devices with the raspberry using the best and the latest technologies. So if you are not in home, but you want to turn on the lights or the air conditioner, you need to use port folwarding (functionallity providen from your router). What you need to do is basically to tell on which port your raspberry IP will be calling. 
Example:
Your internet provider gives you IP: 77.70.71.33 . Your home internet connection is set to DHCP. 
Your Raspberry get the IP: 192.168.100.2 . 
When you configure your router port option for 77.70.71.33:8080 to be forward to 192.168.100.2:4444 , every time you type 77.70.71.33:8080 in your browser , it will refer you to 192.168.100.2:4444. 

## Presentation
On the following [link]() you can find a presentation, based on this project.
