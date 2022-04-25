require("dotenv").config();

const Hapi = require("@hapi/hapi");
const UserController = require("./controllers/UserController");

const { PORT } = process.env;

const app = new Hapi.Server({ port: PORT });

// JOI é a biblioteca de validação do Hapi

app.route([
  {
    path: "/{id?}",
    method: ["POST", "GET", "PATCH", "DELETE"],
    handler: UserController.route,
  },
]);

app.start().then(() => console.log(`Hapi.js API listening on port ${PORT}`));
