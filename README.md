# COVID-19 HELP APP


- Make sure you connect React Native App with your cloud Firestore database.

Installing 

(Using a terminal)
- Copy the repo to your local machine with 'git clone https://github.com/hajersouissi/covid.git'
cd into the top level folder
- Make sure you have the Metro bundler running with 'react-native start'
  - iOS: On a mac, run the app in a simulator with 'react-native run-ios --simulator="YOUR DEVICE NAME". You may have to set   up a new device in Xcode.
  - Android: Make sure your Android Home path is setup correctly and run the app in the emulator with 'react native run-android' 

You will probably get errors switching between branches. Make sure you run these commands before running the code:

- Install project packages in the top level folder with 'npm install' in your terminal
- cd into the 'ios; folder and run 'pod install' in the terminal.
If you still get package related errors, try deleting the Podfile.lock and/or the package-lock.json file before running the commands above.
