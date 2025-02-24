# Spatial Data Platform Backend

This project is a **Node.js** backend application designed to handle spatial data (points and polygons) using **PostgreSQL** with the **PostGIS** extension. It provides RESTful APIs for storing, retrieving, updating, and deleting spatial data.

---

## Features

- **Store Point Data**: Store spatial point data (latitude, longitude) in the database.
- **Retrieve All Points**: Fetch all stored points in GeoJSON format.
- **Update Point Data**: Update the name or location of a specific point.
- **Delete Point Data**: Delete a specific point by its ID.
- **Store Polygon Data**: Store spatial polygon data (coordinates) in the database.
- **Retrieve All Polygons**: Fetch all stored polygons in GeoJSON format.
- **Update Polygon Data**: Update the name or geometry of a specific polygon.
- **Delete Polygon Data**: Delete a specific polygon by its ID.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Relational database for storing spatial data.
- **PostGIS**: PostgreSQL extension for handling spatial data.
- **pg**: PostgreSQL client for Node.js.

---

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Node.js**: 
2. **PostgreSQL**:
3. **PostGIS**: Install the PostGIS extension for PostgreSQL.
4. **Git**:

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ragingsilverback/spatial-api.git
cd spatial-api
```

2. Install Dependencies
Install the required Node.js dependencies:

```bash
npm install
```

3. Set Up PostgreSQL and PostGIS
Create a new PostgreSQL database:

```sql
CREATE DATABASE spatial_db;
```
Connect to the database and enable the PostGIS extension:
(make sure postgres is running)

```sql
\c spatial_db
CREATE EXTENSION postgis;
```
Create the required tables:

```sql
CREATE TABLE points (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    geom GEOMETRY(Point, 4326)
);

CREATE TABLE polygons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    geom GEOMETRY(Polygon, 4326)
);
```

4. Configure the Database Connection
Update the database connection details in index.js:

```javascript
const pool = new Pool({
    user: 'db-username', // Replace with your PostgreSQL username
    host: 'localhost',    // Replace if your database is hosted elsewhere
    database: 'spatial_db',
    password: 'db-password', // Replace with your PostgreSQL password
    port: 5432,           // Default PostgreSQL port
});
```

5. Run the Server
Start the server:

```bash
node index.js
```
The server will start running on http://localhost:3000.
