# Dockerized Movies Application

## Client

**Create-React-App** template with **Typescript**. **Reach Router** for internal routing. **React-Query** for consuming the API and caching the data. **TailwindCSS** for styling.

## Backend

**Django + Django REST Framework**. Uses Serializers and ViewSets for automatic generation of basic CRUD operations. Postgres as the database of choice.

## How to run

Make sure you have **Docker** (installed and running), as well as **docker-compose**. Navigate to the root of the project (where the *docker-compose.yml* file is located)

    docker-compose build
    docker-compose up