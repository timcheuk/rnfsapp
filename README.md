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

//this one react-native-vector-icons need to manual link to android

`npx react-native link react-native-vector-icons`

`npm install --save react-native-reanimated`

`npm install --save react-native-gesture-handler`

3. Update for google authentication

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
```
npm install --save react-native-fbsdk-next
```

https://developers.facebook.com/apps/212203283668987/fb-login/quickstart/

Reg a new facebook app

Enter the key tool and input 

keytool -exportcert -alias androiddebugkey -keystore "your_project_path\android\app\debug.keystore" | "your_openssl_path\bin\openssl" sha1 -binary | "your_openssl_path\bin\openssl" base64

Enter the 密鑰雜湊 key hash to web panel.

Set up your string.xml and AndroidManifest.xml 

Add the following to the `dependencies {}` section of your `build.gradle (module: app)` file to compile the latest version of the Facebook SDK:

```code
implementation 'com.facebook.android:facebook-android-sdk:[5,6)'
```

log application event

add facebook Login button

create CallbackManager.Factory.create

All FacebookSDK login and share events should send on ActivityResult and send to callbackManager.

Find your App ID and App secret on the developer Settings -> Basic 

Enable your Firebase facebook authentication with App ID and App secret.

https://github.com/thebergamo/react-native-fbsdk-next

Follow this to add login button and login function.

### Build android apk

`keytool -genkey -v -keystore releasekey.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000`

configure android/app/build.gradle

    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    	release {
    	  storeFile file('releasekey.keystore')
    	  storePassword 'store_password'
    	  keyAlias 'your_key_alias'
    	  keyPassword 'key_password'
    	}
    }

`gradlew bundleRelease `

OR

`gradlew assembleRelease`

#### Test release version 

--variant=release only available if you completed the release build before.

`npx react-native run-android --variant=release`

