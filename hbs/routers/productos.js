const { Router } = require("express");
const router = Router();
const Contenedor = require("../controllers/productsController.js");
const productos = new Contenedor("./controllers/productos.json");
const notFound = { error: "Producto no encontrado" };

router.get("/", async (req, res) => {
    const arrayProductos = await productos.getAll();
    console.log(arrayProductos);
    res.render("lista", {
        productos: arrayProductos,
        style: "lista.css",
        title: "Lista de productos Handlebars",
    });
});

module.exports = router;