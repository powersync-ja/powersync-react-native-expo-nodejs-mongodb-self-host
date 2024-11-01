# PowerSync + ReactNative (Expo) + Node.js + MongoDB self-hosted  

This is a demo application that you can run locally on your machine in a dev environment. This application includes 
a self-hosted PowerSync service with MongoDB.

## Dependencies
- Docker
- pnpm

## Run local PowerSync service

1. Navigate to the `powersync-service` directory in the terminal
2. Copy the powersync-service template env and set the properties accordingly
```bash
~ cp .template.env .env
```
3. Run docker compose up
```bash
~ docker compose up
```
This will configure the PowerSync service, spin up a basic backend API which the client application uses and a MongoDB 
base.

## Setup app
Make sure you completed the steps above before you continue with the app setup.
1. In a different terminal window navigate to the app directory
2. Install node packages
```bash
~ pnpm install
```
3. Copy the app template env and set the properties accordingly
```bash
~ cp .template.env .env
```
4. Start the app
