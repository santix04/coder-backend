const fs = require("fs");

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    exists(archivo) {
        try {
            if (!fs.existsSync(archivo)) {
                throw new Error("El archivo no existe");
            } else {
                return true;
            }
        } catch (error) {
            console.log(`Error buscando el archivo: ${error.message}`);
        }
    }

    readFile = async (archivo) =>{
        try {
            const data = await fs.promises.readFile(archivo);
            return JSON.parse(data);
        } catch (error) {
            console.log(`Error leyendo el archivo: ${error.message}`);
        }
    }

    writeFile = async (archivo, contenido) => {
        try {
            await fs.promises.writeFile(archivo, JSON.stringify(contenido, null, 4));
        } catch (error) {
            console.log(`Error escribiendo el archivo: ${error.message}`);
        }
    }

    save = async (producto) => {
        try {
            if (!this.exists(this.archivo)) {
                console.log(`Se procede a crear datos nuevos`);
                let arrayProductos = [];
                producto = { id: 1, ...producto };
                arrayProductos.push(producto);
                console.log(`Agregando producto...`);
                await fs.promises.writeFile(this.archivo, arrayProductos);
                console.log(
                    `Se agrego el producto nuevo con el id: ${producto.id}`
                );
                return producto.id;
            } else {
                if (this.readFile(this.archivo)) {
                    console.log(`Leyendo archivo...`);
                    const data = await this.readFile(this.archivo);
                    if (data.length === 0) {
                        producto = { id: 1, ...producto };
                    } else {
                        let ultimoId = data[data.length - 1].id;
                        producto = { id: ultimoId + 1, ...producto };
                    }
                    console.log(`Agregando producto al archivo...`);
                    data.push(producto);
                    this.writeFile(this.archivo, data);
                    console.log(
                        `Se agrego el nuevo producto con el id: ${producto.id}`
                    );
                    return producto.id;
                }
            }
        } catch (error) {
            console.log(`Error agregando el producto: ${error.message}`);
        }
    }

    getById = async (id) => {
        try {
            if (this.exists(this.archivo)) {
                const data = await this.readFile(this.archivo);
                const dataId = data.filter(item => item.id === id);
                if (dataId.length === 0) {
                    throw new Error(
                        "No se encontro un producto con el id solicitado"
                    );
                } else {
                    console.log(`Producto con id ${id} encontrado:\n`, dataId);
                    return dataId;
                }
            }
        } catch (error) {
            console.log(`Error buscando producto con el id: ${error.message}`);
        }
    }

    getAll = async () => {
        try {
            if (this.exists(this.archivo)) {
                console.log(`Leyendo archivo...`);
                const data = await this.readFile(this.archivo);
                if (data.length !== 0) {
                    console.log(`Archivo con contenido:`);
                    console.log(data);
                    return data;
                } else {
                    throw new Error(`El archivo ${this.archivo} esta vacio`);
                }
            }
        } catch (error) {
            console.log(
                `Error obteniendo todos los productos: ${error.message}`
            );
        }
    }

    modify = async (id, contenido) => {
        try {
            if (this.exists(this.archivo)) {
                let data = await this.readFile(this.archivo);
                let dataId = data.filter(item => item.id === id);
                if (dataId.length === 0) {
                    throw new Error(
                        `No se encontro el producto con el id solicitado`
                    );
                } else {
                    data = data.filter(item => item.id !== id);
                    dataId = { id: id, ...contenido };
                    data.push(dataId);
                    this.writeFile(this.archivo, data);
                    console.log(`Se modifico el producto con el id ${id}`);
                    return dataId;
                }
            }
        } catch (error) {
            console.log(`Error modificando el producto: ${error.message}`);
        }
    }

    deleteById = async (id) => {
        try {
            if (this.exists(this.archivo)) {
                const data = await this.readFile(this.archivo);
                console.log(`Buscando producto con el id solicitado...`);
                if (data.some(item => item.id === id)) {
                    const data = await this.readFile(this.archivo);
                    console.log(`Eliminando producto con id solicitado...`);
                    const datos = data.filter(item => item.id !== id);
                    this.writeFile(this.archivo, datos);
                    console.log(`Producto con el id ${id} eliminado`);
                } else {
                    throw new Error(
                        `No se encontro el producto con el id ${id}`
                    );
                }
            }
        } catch (error) {
            console.log(
                `Ocurrio un error eliminando el producto con el id solicitado: ${error.message}`
            );
        }
    }

    deleteAll = async () => {
        try {
            let nuevoArray = [];
            console.log(`Borrando datos...`);
            await this.writeFile(this.archivo, nuevoArray);
            console.log(
                `Se borraron todos los datos del archivo ${this.archivo}`
            );
        } catch (error) {
            console.log(
                `Ocurrio un error : ${error.message}`
            );
        }
    }
}

module.exports = Contenedor;