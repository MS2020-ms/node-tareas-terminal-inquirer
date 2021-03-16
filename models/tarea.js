const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc) {
        //creo id como identificador unico con paquete npm uuid
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;