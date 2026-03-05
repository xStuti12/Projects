This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


# TUTORIAL SK - FYZICKE ZARIADENIE
- napoj mobil na komp
- v cmd spusti ```adb devices``` musi ti vypisat jedno zariadenie ako "device"
- potom v roote projektu spusti ```npm run android```
- cakaj :) (uplne prvy build moze trvat kludne 30 minut [bude instaloval NDK a bude to vyzerat ze sa to seklo ale to len treba cakat], dalsie buildy by mali trvat kratsie)
- otvori sa ti NODE.js okno kde bude "metro" to NEVYPINAJ
- mozu ti vybehnut rozne errory ale hej aj o tom je zivot (pokial to nespadne tak je to ok)

# TUTORIAL SK - EMULATOR
- na nete najdes isto vela peknych tutorialov

## Development
- ked uz mas vsetky kroky co su vyssie a bezi ti appka na mobile tak mozes zacat pisat kod
- ked spravis nejake zmeny v metro cmd staci stlacit R to ti refreshne appku
- ked stlacis J (v metro cmd) otvori ti dev-tools tak mas vsetky console.logs
- ak chces aplikaciu testovat mimo PC, budes musiet nainstalovat APK do telefonu (navod je nizsie)

## Instalacia noveho npm package-u
- aplikaciu na mobile nemusis vypinat
- ked si nainstaloval novy package tak potrebujes nanovo spustit ```npm run android``` aby sa ten package compile-ol a dostal do mobilu
- nemusis vypinat metro (NODEJS dev server) ani dev tools (ak ich mas zapnute) -> ak vypnes metro moze dalsie spustenie trvat dlhsie kedze sa znovu bude zapinat dev server
- ked sa znovu dokonci ```npm run android``` tak aplikacia sa ti automaticky restartuje na mobile


## INSTALACIA APK (Spustanie aplikacie na mobile bez dev serveru)
- chod do android priecinku 
- spusti ```./gradlew assembleRelease``` alebo ```gradle assembleRelease``` zalezi co ti funguje :skull:
- pockaj kym sa spravi APK (PRVY BUILD TRVA ZVYCAJNE 20 - 30 minut, nasledne buildy su rychlejsie [cca do 2 minut] pokial nevypnes komp xd)
- warningy mozes ignorovat welcome to RN world :)
- moze ti vybehnut CMAKE warning/error ze je dlha cesta a ze build nemusi fungovat spravne, z toho si tiez nelam hlavu, staci kuknut kolko napisalo ze je cesta dlha a kym to je menej jak dane maximum tak je to OK (ak by ti failoval build kvoli tomuto tak presun cely projekt niekde blizsie ku korenu disku)
- spusti ```adb install <path to apk>``` (apk je defaultne na cesta android/app/build/outputs/apk/release/app-release.apk)
- to ti nainstaluje appku do pripojeneho mobilu

## IOS development
- ked dobre viem je nutne mat XCode co myslim ze je dosutpne iba na macoch :skull:

## Pridavanie novych kamenov
- aplikacia je ready na pridavanie novych kamenov a je to super easy
- najdite na nete vhodny obrazok daneho kamena a ulozte ho do priecinku assets (k ostatnym kamenom ak sa nahodou zmenila struktura a som toto neaktualizoval)
- nasledne staci ist do ```Rock.ts``` a pridat ho do spravneho pola stringov, to do ktoreho ho pridate urcuje jeho vzacnost, tym padom to urcuje aj to aka je sanca na jeho spawn
- hotovo

## Pridavanie textu a jeho zobrazovanie
- aktualne treba texty pridavat do json suboru ktory je v priecinku ```assets/lang/sk_SK.json```
- uz tam su nejake texty takze tie pouzite ako predlohu na zapis
- ak dany text obsahuje nejaku dynamicku cast tak tu cast treba dat do {} a do vnutra dat iba nejaky key (placeholder) takychto casti moze byt samozrejme viac vramci jedneho textu
- na ziskanie tohto textu treba pouzit metodu ```getText``` kde poslete kluc toho textu ktory chcete pouzit (editor by vam mal ponuknut dostupne kluce kedze som to tak nastavil ze mozete pouzit iba valid kluce)
- ked mate variabilnu cast/casti tak ich nahradenie za text je nasledovne
- poslete druhy parameter do funkcie getText ktory je objekt a ma formu ```{placeholderKey: "text to replace"}```

### Priklad textu 
- do sk_SK.json pridam ```"test": "Serus jak sa mas"``` a ```"test2" : "Dovidenia {meno}, uzivaj"```
- ked chcem ziskat text "Serus jak sa mas" tak do napisem ```<Text>{getText("test")}</Text>```
- ked chcem pouzit ten text kde je variabilna cast tak pouzijem ```<Text>{getText("test2", {meno: "Peter"})}</Text>```

### PRIDAVANIE POPISU PRE DETAILS PAGE
- akonahle pridas novy kamen alebo resource je potrebne pridat jeho popis do ```assets/descriptions.ts``` (bez toho by sa nemalo dat spustit projekt - to zabezpecuje ze vsetko je zadefinovane)

### NAVIGATION
- radsej mi napis :skull: je to hehe :skull:

### RIVE - BUILD FAILED :))))))))))))))
- problem rozbehat - RN package si povedal ze nehehehehe nebudem fungovat :))) 
- TEMPORARY FIX: pojdes do node_modules/rive-react-native/android/src/main/java/com/rivereactnative/RiveReactNativeViewManager.kt a vsade kde getX (string, bool, double...) tak za to das: !!
                - potom este pojdes to RvieReactNativeView.kt 917 a 918 riadok: 
                ReadableType.Map -> result.add(this.getMap(i)?.toMap())
                ReadableType.Array -> result.add(this.getArray(i)?.toList()) // Recursive conversion

- MILUJEM RN
- ak to stale nepojde odporucam ritualnu obetu JS bohom a potom vypnut komp, touch some grass, vratit sa a dufat ze sa bohovia zlutovali 