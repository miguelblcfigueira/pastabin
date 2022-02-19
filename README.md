# PastaBin

This is PastaBin's REST API. 

PastaBin is a very simplifyed version of Pastbin.

It supports 2 methods:

- **GET /:id** (or /paste/:id) -> retrieve data of paste with certain *id*.
  - returns: 
  ```json
  {
      "id": "<id string>",
      "data": "<paste text>",
      "expiresAt": "<ISO 8601 date>"
  }
  ```
- **POST /paste/** -> create new paste.
  - body:
  ```json
  {
    "data": "<paste text>"
  }
  ```
  - returns:
  ```json
  {
    "id": "<id>"
  }
  ```

**Obvious disclaimer**: Requirements such as scalability, security, etc. were not taken into account in this assigment.
# Getting started

These instructions get the project running on local machine for development and testing purposes.

## Prerequisites

### To run server 

- Node.js 12.22

### Database 

- MySQL v8 or PostgreSQL

# Running locally

## Configure environment variables

Copy `.env.template` file to `.env` and configure environment variables for development server:

- Port
- Database connection

## Launch Express.js web server:

Install NPM dependencies:

```
npm i
```
Run the development server:

```
npm start
```

# Tests

## Run
```
npm test
```

# Live

The API is deployed at:
https://api-pastabin.herokuapp.com/
