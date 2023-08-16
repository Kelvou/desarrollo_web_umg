//Kelvin José Gómez Morales - 9490-19-480
console.clear();
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const opciones = ["Ingresar estudiantes", "Ingresar notas", "Búsqueda por carnet", "Generar resumen", "Salir"];
const estudiantes = [];
const tareas = [];
function displayMenu() {
    console.log("---------------------------------------");
    console.log("---------- HOJA DE TRABAJO 4 ----------");
    console.log("---------------------------------------");
    console.log(" ");
    for (let i = 0; i < opciones.length; i++) {
        console.log(`${i + 1}. ${opciones[i]}`);
    }
}
function handleOption(option) {
    switch (option) {
        case '1':
            console.clear();
            console.log("---------- Ingresar estudiantes ----------");
            console.log("");
            rl.question('Ingrese el carnet: ', (carnet) => {
                rl.question('Ingrese su nombre: ', (nombre) => {
                    estudiantes.push({ carnet, nombre });
                    console.clear();
                    start();
                });
            });
            break;
        case '2':
            console.clear();
            console.log("---------- Ingresar de notas ----------");
            console.log("");
            rl.question('Ingrese el carnet: ', (carnet2) => {
                rl.question('Ingrese nombre de la tarea: ', (tareaN) => {
                    rl.question('Ingrese nota: ', (nota) => {
                        tareas.push({ carnet2, tareaN, nota });
                        console.clear();
                        start();
                    });
                });
            });
            break;
        case '3':
            console.clear();
            console.log("---------- Búsqueda por carnet ----------");
            console.log("");
            rl.question('Ingrese el carnet: ', (carnetS) => {
                estudiantes.forEach((estudiantes, index) => {
                    if (estudiantes.carnet == carnetS) {
                        console.log(`${index + 1}. Carnet: ${estudiantes.carnet}  ---  Estudiante: ${estudiantes.nombre}`);
                        console.log(" ");
                        rl.question('¿Desea volver al menú? (y/n): ', (returnM) => {
                            if (returnM === 'y' || returnM === 'Y') {
                                console.clear();
                                start();
                            } else if (returnM === 'n' || returnM === 'N') {
                                console.clear();
                                rl.close();
                            }
                        });
                    }
                });
            });
            break;
        case '4':
            console.clear();
            console.log("---------- Información de los estudiantes registrados ----------");
            estudiantes.forEach((estudiantes, index) => {
                console.log(`${index + 1}. Carnet: ${estudiantes.carnet}  ---  Estudiante: ${estudiantes.nombre}`);
                tareas.forEach((tareas) => {
                    if (estudiantes.carnet === tareas.carnet2) {
                        console.log(`              * Tarea: ${tareas.tareaN}  ---  Nota: ${tareas.tareaN}`);
                    }
                });
                console.log(" ");
            });
            console.log(" ");
            rl.question('¿Desea volver al menú? (y/n): ', (returnM) => {
                if (returnM === 'y' || returnM === 'Y') {
                    console.clear();
                    start();
                } else if (returnM === 'n' || returnM === 'N') {
                    console.clear();
                    rl.close();
                }
            });
            break;
        case '5':
            console.clear();
            rl.close();
            break;
        default:
            console.log("Opción no válida. Por favor, selecciona una opción del menú.");
            start();
            break;
    }
}
function start() {
    displayMenu();
    console.log(" ");
    rl.question('Seleccione una opción: ', (option) => {
        handleOption(option);
    });
}
start();