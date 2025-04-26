import express from "express";

import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});