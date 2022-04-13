const Hapi = require("@hapi/hapi");
const UserController = require("./controllers/UserController");
require("dotenv").config();

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

app.start().then(() => console.log(`API listening on port ${PORT}`));
