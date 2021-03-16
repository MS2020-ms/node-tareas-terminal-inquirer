const { resolve } = require('path');
require('colors');

const mostrarMenu = () => {

    return new Promise((resolve, reject) => {

        console.clear();
        console.log('============================'.yellow);
        console.log('   Seleccione una Opcion'.yellow);
        console.log('============================'.yellow);

        console.log(`${'1.'.yellow} Crear Tarea`);
        console.log(`${'2.'.yellow} Listar Tareas`);
        console.log(`${'3.'.yellow} Listar Tareas completadas`);
        console.log(`${'4.'.yellow} Listar Tareas pendientes`);
        console.log(`${'5.'.yellow} Completar Tarea(s)`);
        console.log(`${'6.'.yellow} Borrar Tarea`);
        console.log(`${'0.'.yellow} Salir\n`);

        const readline = require('readline').createInterface({
            //Solicitar la entrada de datos del usuario a través de CLI 
            input: process.stdin,
            output: process.stdout
        });

        //pregunta por terminal
        readline.question('Seleccione una opcion: ', (opt) => {
            // console.log({ opt });
            readline.close();
            resolve(opt);
        })

    });

}

const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //pregunta por terminal
        readline.question(`\nPresione ${'ENTER'.yellow} para continuar\n`, (opt) => {
            readline.close();
            resolve();
        })

    });
}

module.exports = {
    mostrarMenu,
    pausa
}