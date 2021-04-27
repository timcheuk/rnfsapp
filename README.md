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
Global environment, install npx first

`npm install -g npx`

create the project environment

`npx react-native init rnfsapp`

cd rnfsapp

`git init`

`git clone https://github.com/timcheuk/rnfsapp.git`

`git branch -M main`

Start react native js server and run android with another cmd

`npx react-native start`

`npx react-native run-android`

Simulator should start antomatically if your android Studio installed correctly. If not, change the setting and device.

`npm install --save @react-native-google-signin/google-signin`

`npm install --save @react-navigation/drawer`

DELETE yarn.lock and package.json.lock

`npm install --save @react-navigation/native`

`npm install --save react-native-elements`

`npm install --save react-native-webview`

`npm install --save react-native-safe-area-context`

`npm install --save react-native-screens`

`npm install --save cliui`

`npm install --save react-native-vector-icons`

`npm install --save react-native-reanimated`

`npm install --save react-native-gesture-handler`

#### 3. Update for google authentication
### Update android/build.gradle with

android/build.gradle

	buildscript {
	ext {
	    googlePlayServicesAuthVersion = "17.0.0"
	}
	
	dependencies {
	classpath("com.android.tools.build:gradle:4.1.0")
	classpath 'com.google.gms:google-services:4.3.5'
	}

make sure repositories included google()

### Update android/app/build.gradle with
dependencies {
...
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.0.0'
}

apply plugin: 'com.google.gms.google-services' // <--- this should be the last line

###Check that react-native link linked the native module, only if you used react-native link!

### project_folder\android\app\src\main\java\com\rnfsapp
in MainApplication.java you should have
import co.apptailor.googlesignin.RNGoogleSigninPackage;  // <--- import

@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNGoogleSigninPackage() // <-- this needs to be in the list
      );
    }
	
in android/app/build.gradle you should have
...
dependencies {
    ...
    implementation(project(":react-native-google-signin")) // error
}
...


keytool -list -v -keystore ./app/debug.keystore -alias androiddebugkey -storepass android -keypass android

npm install @react-native-firebase/app

npm install @react-native-firebase/auth

Lets declare the dependency for the authentication module in the android/app/build.gradle
dependencies {
    // Add these lines
    implementation platform('com.google.firebase:firebase-bom:26.3.0')
    implementation 'com.google.firebase:firebase-auth'
}

### Update android/build.gradle with
npm install --save react-native-fbsdk-next