//-listado
// {'uuid-12345-54321-4: {id:12, desc:ddfff , completadoEn: 94432}}

const Tarea = require("./tarea");

class Tareas {

    //_ indica que es privada
    _listado = {};

    //getter: como propiedad en mi clase, xa retornar un nuevo array
    get listadoArr() {
        const listado = [];
        //devuelve un array de todas las tareas {}
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        //guardo en {} de _listado
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        //console.log(this.listadoArr); //[{}]
        //console.log(this._listado); //{id:{}}

        console.log();
        this.listadoArr.forEach((tarea, index) => {
            //console.log(index);
            const idx = `${index + 1}`.green;
            //console.log(idx);
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.cyan : 'Pendiente'.yellow;

            console.log(`${idx}. ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.cyan : 'Pendiente'.red;

            if (completadas) {
                //mostar completadas
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${completadoEn}`);
                }
            } else {
                //mostrar pendientes
                if (!completadoEn) { //null
                    contador += 1;
                    console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
                }
            }
        });
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;