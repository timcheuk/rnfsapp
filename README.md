#### 1. Install Android Studio

[Download and install Android Studio](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`



#### 2. Install the Android SDK

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the `Android 10 (Q)` SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "Configure" button and select "SDK Manager".



#### 3. Configure the ANDROID_HOME environment variable

create a new `ANDROID_HOME` user variable that points to the path to your Android SDK

`npm install -g npx`

create the project environment

`npx react-native init rnfsapp`

cd rnfsapp

`git init`

`git clone https://github.com/timcheuk/rnfsapp.git`

`git branch -M main`

Global environment, install npx first