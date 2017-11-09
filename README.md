EXCEL TO PARSE PLATFORM PROJECT
================

The program converts an excel file containing the list of schools in the Philippines under UNDP and uploads into DevLive’s Parse database under the Project class.

Environment Setup
---
* Install the following NPM modules using your command line:
  - [parse](https://www.npmjs.com/package/parse): `npm install parse`
  - [excel](https://www.npmjs.com/package/excel): `npm install excel`
  - [node-fetch](https://www.npmjs.com/package/node-fetch): `npm install node-fetch`
* Save the excel file inside your project folder. Reference this in the `readExcel.js` module:
	```const file = 'excel file name';```
* Login to your [Back4App Account](https://www.back4app.com/) and go to the DevLive server to retrieve the App ID and Javascript Key to initialize Parse.
* Create a new file called `config.js` and insert the code and provide the following:
  ```js
  const config = {
    APP_ID: 'Your APP_ID',
    JS_KEY: 'Your JS_KEY',
    API_KEY: 'Your API KEY'
  }
  module.exports = config;
  ```

Running the Program
---
* To insert data from the excel file into the Parse database, run the program `import.js` using node:
```node import.js```
* To update the data, run the program `update.js` using node:
```node update.js```
* Check the DevLive server to see if the data has been successfully saved.

References
---
* [Parse Platform Javascript guide](http://docs.parseplatform.org/js/guide/)
* [Parse Javascript SDK documentation](http://parseplatform.org/Parse-SDK-JS/api/index.html)
* Google Maps API Geocoding
