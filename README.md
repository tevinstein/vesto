# vesto

VESTO is web application that lets restaurants manage (CRUD operations) their dishes, chefs and tasks.

##### This is one of my Hacktiv8's project using:
- Node.js v6+
- Express
- MongoDB
- Mongoose
- JQuery and Ajax

## Installation
- Clone the repo: `git clone https://github.com/tevinstein/vesto.git`

#### In the folder *server*
- Install packages: `npm install`
- Start the server: `npm start`

#### In the folder *client*
- Preview the html file in your browser by opening **index.html** or run live-server if you have it installed `live-server`

## Restful API
| URL       | Method | Description     |
|-----------|--------|-----------------|
| /api/menus    | GET    | Shows all dish |
| /api/menus     | POST   | Creates a dish  |
| /api/menus/:id | GET    | Shows a dish    |
| /api/menus/:id | PUT | Deletes a dish  |
| /api/menus/:id | DELETE | Deletes a dish  |

| URL       | Method | Description     |
|-----------|--------|-----------------|
| /api/chefs    | GET    | Shows all chef |
| /api/chefs     | POST   | Creates a chef  |
| /api/chefs/:id | GET    | Shows a chef    |
| /api/chefs/:id | PUT | Deletes a chef  |
| /api/chefs/:id | DELETE | Deletes a chef  |

| URL       | Method | Description     |
|-----------|--------|-----------------|
| /api/tasks    | GET    | Shows all task |
| /api/tasks     | POST   | Creates a task  |
| /api/tasks/:id | GET    | Shows a task    |
| /api/tasks/:id | PUT | Deletes a task  |
| /api/tasks/:id | DELETE | Deletes a task  |

## Screenshots

[![manage chefs](http://i.imgur.com/WSVhuDr.png "manage chefs")](http://i.imgur.com/WSVhuDr.png "manage chefs")

[![manage dishes](http://i.imgur.com/xD5x8HG.png "manage dishes")](http://i.imgur.com/xD5x8HG.png "manage dishes")

[![manage tasks](http://i.imgur.com/txwcr9h.png "manage tasks")](http://i.imgur.com/txwcr9h.png "manage tasks")