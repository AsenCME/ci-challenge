# Dockerized Movies Application

## Client

**Create-React-App** template with **Typescript**. **Reach Router** for internal routing. **React-Query** for consuming the API and caching the data. **TailwindCSS** for styling.

## Backend

**Django + Django REST Framework**. Uses Serializers and ViewSets for automatic generation of basic CRUD operations. Postgres as the database of choice.

## How to run

Make sure you have **Docker** (installed and running), as well as **docker-compose**. Navigate to the root of the project (where the *docker-compose.yml* file is located). To run the backend, execute the following commands

    docker-compose build
    docker-compose up

Next, run the frontend. Navigate to the client directory and execute the command `npm install && npm install react-scripts@3.4.1 -g`. After that's done, just run `npm run start` to start the frontend server. The app can be found on `localhost:3000`.