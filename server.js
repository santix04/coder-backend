const express = require("express");
const bp = require("body-parser");
const router = require("./routers/index");
const app = express();
const PORT = 3000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api", router);

const server = app.listen(PORT, () => {
    console.log(
        `Servidor en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));