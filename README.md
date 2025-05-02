# Wear Counter App

A simple counter app built with React Native for Wear OS. It allows users to increment, decrement, and reset a count, with the value persisted between app launches using a lightweight file-based system via `react-native-fs`.

---

## 📱 Features

* 🔹 Increment, decrement, and reset a counter
* 📂 Persists count between app runs
* 📦 Pure JavaScript solution — no native modules like AsyncStorage required
* ⌚ Optimized for small, round Wear OS screens

---

## 📦 Dependencies

* [react-native](https://reactnative.dev/)
* [react-native-fs](https://github.com/itinance/react-native-fs)

---

## 📲 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/wear-counter-app.git
cd wear-counter-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the app for Wear OS

Make sure your Wear OS device is connected over ADB (via WiFi):

```bash
adb pair <wear-os-ip-and-port>
adb connect <wear-os-ip-and-port>
```

Then build and install the app:

development:
```bash
npx react-native run-android
```

release:
```bash
cd android
./gradlew assembleRelease
adb -s <wear-os-ip>:5555 install -r adb install -r android\app\build\outputs\apk\release\app-release.apk
```

---

## 📁 Storage Details

The counter is stored in the file system at:

```
RNFS.DocumentDirectoryPath + "/counter.txt"
```

This ensures persistence across app restarts without relying on native storage modules like `AsyncStorage`.

---

## 🛠 Known Limitations

* Currently no UI adaptation for round screens — fine-tuning spacing may be needed for full Wear OS support
* No native backup or sync functionality
* File-based persistence only — not encrypted

---

## 📓 License

MIT License. Free to use, modify, and share.

---

## ❓ Questions?

Feel free to open an issue or reach out if you need help setting this up or deploying to Wear OS!
