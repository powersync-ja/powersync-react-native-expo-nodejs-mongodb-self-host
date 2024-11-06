# (WIP) PowerSync self-hosted + ReactNative (Expo) + Node.js + MongoDB Attendee List Demo  

This is a demo application that you can run locally on your machine in a dev environment. This application includes 
a self-hosted PowerSync service with MongoDB.

## Dependencies
- Docker
- pnpm
- Node.js

## Setup Overview
This repo has a three-step process, please follow them in order: 

1. Configure and launch the PowerSync service (which) includes the backend-api which the client application will 
use for anonymous auth i.e. there is no user login for the app.
2. Configure and launch the React Native application 

### Configure and launch local PowerSync service + Backend API

1. Navigate to the `mongodb-powersync-service` directory in the terminal
2. Copy the template env and set the properties accordingly
```bash
~ cp .template.env .env
```
3. Run docker compose up
```bash
~ docker compose up --force-recreate --build
```
4. Import some data for the database

This will configure the PowerSync service, spin up a basic backend API which the client application uses and a MongoDB 
base.

### Configure and launch the React Native client

1. Navigate to the `attendee-list-client` directory
2. Copy the template env and set the properties accordingly
```bash
~ cp .template.env .env
```
3. Install dependencies 
```bash
~ pnpm install
```
4. Run the application in the ios simulator
```bash
~ pnpm ios
```


