const fs = require('fs')


class Container {
  constructor(path) {
    this.path = path;
  }

  writeFile = async data => {
    try {
      await fs.promises.writeFile(
        this.path, JSON.stringify(data, null, 2)
        )
    }catch(err) {
      console.log(err);
    }
  }

  save = async obj => {
    try {
      const products = await fs.promises.readFile(this.path, 'utf-8');
      const data = JSON.parse(products);
      let newId
      data.length === 0 ? newId = 1 : newId = data[data.length - 1].id + 1;
      const newObj = {...obj, id: newId};
      data.push(newObj);
      await this.writeFile(data)
      return newObj.id;
    }catch(err) {
      console.log(err);
    }
  }

  getById = async id => {
    try {
      const readProducts = await fs.promises.readFile(this.path, 'utf-8');
      const data = JSON.parse(readProducts);
      const obj = data.find(obj => obj.id === id);
      return obj ? obj : null;

    }catch(err) {
      console.log(err);
    }
  }

  getAll = async() => {
    try {
      const readProducts = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(readProducts)
    }catch(err) {
      console.log(err);
    }
  }

  deleteById = async id => {
    try {
      const readProducts = await fs.promises.readFile(this.path, 'utf-8');
      const data = JSON.parse(readProducts);
      const obj = data.filter(obj => obj.id !== id);
      await this.writeFile(obj);
    }catch(err) {
      console.log(err);
    }
  }

  deleteAll = async() => {
    try {
      this.writeFile([]);
    }catch(err) {
      console.log(err);
    }
  }

}

module.exports = Container;
