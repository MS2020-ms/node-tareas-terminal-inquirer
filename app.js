require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

//la funcion async main() se ejcuta abajo
const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Cargar las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    //ciclo cerrado repetitivo
    do {
        // imprime el menu
        opt = await inquirerMenu();
        // console.log({ opt });

        switch (opt) {
            case '1':
                //crear opcion
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
                break;

            case '2':
                // console.log(tareas.listadoArr);
                // console.log(tareas._listado);
                tareas.listadoCompleto();
                break;

            case '3':
                //listar completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                //listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                //completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                //borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('Estas seguro?');
                    //preguntar confirmacion
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada!');
                    }
                }
                //console.log({ ok });
                break;
        }

        //se graba en DB
        guardarDB(tareas.listadoArr);

        //se pausa
        await pausa();

    } while (opt !== '0');

}
main();