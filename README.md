# GeoCRM Mobile APP using-React Native

Geo CRM is a cutting-edge React Native mobile application designed to provide CRM and CMS. Everything is possible.
(This is the copied repository form my business repository of bitbucket. Forked form Bitbucket)

# Move here 
https://play.google.com/store/search?q=Geo+CRM&c=apps&pli=1
![Screenshot_242](https://github.com/stuartgregorysharpe/CRM.MobileApp.using.ReactNative-GeoCRM/assets/137684294/a7e53274-00f3-4dfa-b6b1-4049c06eb794)


## Youtube Video Associated with My Working

[![Watch the video on YouTube](https://img.youtube.com/vi/CQ2PpI6EPco/maxresdefault.jpg)](https://youtu.be/CQ2PpI6EPco)




Feature 1: Modern Style DashBoard

Feature 2: Learning Module

Feature 3: Shipping, Booking

Feature 4: Office, Report, Galery and so on

...
# Install dependencies:
npm install or yarn

# Support
If you encounter any issues or require support, please open an issue on our GitHub issues page.

# License
This project is licensed under the MIT License - see the LICENSE.md file for details.


#When Uncategorise error
nvm alias default system

# uninstalled package
-@react-native-community/datetimepicker
@react-native-picker/picker

1. Stock List -> GET  /stockmodule/stock-list
2. Movements List ->GET  /stockmodule/movements-list?page_nr=0
3. Returns List -> GET  /stockmodule/returns-list
4. Add Stock field options -> GET  /stockmodule/stock-field-data?action=add_stock
5. Add Stock Submit  ->  POST /stockmodule/add-stock
6. Location Devices -> GET  /locations/location-devices?location_id=1354
7. Transfer User dropdown -> GET   /stockmodule/users
8. POST stockmodule/sell-to-trader
9. POST stockmodule/swop-at-trader
10. POST stockmodule/transfer
11. POST stockmodule/return-device
12. POST stockmodule/return-to-warehouse

# how to generate release apk and aab file
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle 
--assets-dest android/app/src/main/res/

cd android
  
./gradlew assembleRelease
./gradlew bundleRelease


# check sqlite file
adb shell runs the shell
in shell run:
adb shell
run-as package-name(com.geoverse_app_rn)
cat filename.db > /sdcard/filename.db
exist shell session (Ctrl  + D)
adb pull /sdcard/filename.db

adb pull /sdcard/filename.db

online view link
https://sqliteviewer.app/#/maindb.db/table/locations_custom_master_field_data/




# Resolve Error in project build
 1. Could not resolve project :react-native-hms-availability.
    Replace the hmscore library manually

# install guide
1. go to the project folder, and run 'npm install' command in terminal.
2. need to add the node_modules manually
   node_module's name: 'react-native-mordern-datepicker', 'react-native-signature-canvas'
   we need to copy above libraries and replace it in node_modules folder.
   for HMS app, we need to add "@hmscore" library in node_module folder. 
   and for HMS app, we need to add 'agconnect-services.json' file under android/app folder.
3. it is the time to generate apk and aab file for android.
   we need to run following commands in terminal

   react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

   cd android

   ./gradlew assembleRelease
   ./gradlew bundleRelease

   assembleRelease command will generate apk file in android/app/release(android/app/build) folder.
   and bundleRelease will generate aab file in android/app/release(android/app/build) folder.


# Upgrade react-native-paper version 
"react-native-paper": "^4.10.1",

