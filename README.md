# ROSA - Road Safety Application
> Project done by Kessia TONA, Yassin CHAAIRAITE, Valentin LEFEVRE & Capucine LEROY

## Overview

ROSA (Road Safety Application) is a mobile application designed to enhance road safety by providing real-time risk assessments and incident reporting. Unlike traditional navigation apps, ROSA prioritizes proactive safety features, keeping drivers informed about potential risks on their routes.

## Features

- **Real-time Risk Assessment:** ROSA evaluates the risk of accidents based on factors like historical accident data, current and forecasted weather, real-time traffic density, and other potential risk factors.

- **Incident Reporting:** Users can report road incidents, defects, or hazards to the municipal authorities through the app, contributing to better traffic management.

- **Recent Incidents:** Stay updated on recent incidents near your location or within the city, helping you make informed decisions about your route.

- **Activities Feed:** Track the progress and resolution of reported issues with the municipal authorities, ensuring transparency and community involvement.

## Tech Stack

- **React Native:** The app is built using React Native for a cross-platform mobile experience.

- **Expo:** Expo is used for simplifying the development and deployment process, providing a streamlined experience for React Native projects.

- **PostgreSql:** Postgresql is used for real-time data updates, user authentication, and incident reporting.

## Getting Started

To run the app locally using Expo, follow these steps:


### Front Part Installing
After retrieving the folder, we point to it with the command:

```bash
$ cd Rosa
$ cd front
```

We then install all the necessary dependencies to launch the project with the command

```bash
$ npm install -g expo-cli
$ npm install
```

And finally we can launch the project

```bash
$ npm run start
```

### Back Part Installing
We then redo the manipulation for the back. After retrieving the api folder, we point to it with the command:

```bash
$ cd ..
$ cd back
```

We then install all the necessary dependencies to launch strapi with the command

```bash
$ npm install
```

And finally we can launch the backend:

```bash
$ node app.js
```

To be able to access the app, you have to downoload [Expo Go](https://expo.dev/client)

This will open the Expo development server, and you can run the app on your simulator/emulator or scan the QR code with the Expo Go app on your mobile device.


## Screenshots  

<img width="390"  alt="Capture d’écran 2024-02-20 à 21 44 35" src="https://github.com/Kess4/RoSa/assets/91597783/931ea7f3-e4e4-4a89-8fd1-9bab7cbc8080">

<img width="393;" alt="Capture d’écran 2024-02-20 à 21 49 48" src="https://github.com/Kess4/RoSa/assets/91597783/c47771f1-677d-4b5a-9347-c656ffea04f8">
