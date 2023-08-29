# Evidencias
Se agregaran algunas imagenes de las funcionalidades requeridas.

* Se utilizará POSTMAN para hacer las solicitudes.
* Requiere de instalación de Express.
* Requiere utilizar el comando "npm install mongodb"

***Cada registro contiene varios campos, por lo que se optó por hacer manejo de unos cuantos para ejemplificar.***

## Tópico elegido
El tema elegido es de https://data.gov/ en donde se puede encontrar el Informes sobre Accidentes Automovilísticos, la información extendida se encuentra acá https://catalog.data.gov/dataset/crash-reporting-drivers-data

## Obtener toda la información
La base de datos en MongoDB, cuenta con 164.6k de registros, por lo que se limitará a únicamente 5 registros a mostrar.

* Total de registros en base de datos
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/a94cc066-d060-43ff-8992-fe223ae9e301)

* Solicitud desde POSTMAN
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/bea7e73f-0131-4b2b-89cf-8fd6d3f8b7f5)

## Nuevo Accidente
Agregaremos tres accidentes para ejemplificar.

* Accidente 1
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/80180b9e-8bb7-4397-9688-28d7c0a8d93d)

* Accidente 2
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/4570908e-d04a-4ca2-8b2e-6b53213af42a)

* Accidente 3
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/499fcb26-5ff4-4fb6-9bab-e70be7692191)

## Modificación
Cambiaremos el nombre de la agencia, específicamente del Accidente 2.

![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/d14d5f81-d13e-42e3-be29-682b56d2004b)

## Listar por "Report Number"
Listaremos los tres accidentes que hemos agregado, visualizando los cambios que se han hecho en el Accidente 2. Se utilizará el parámetro Report Number.

* Accidente 1
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/df3646b7-8797-46cc-bb7f-31d08f185c08)

* Accidente 2
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/c80b7b2e-908a-479b-a0e5-1dc72d89d72e)

* Accidente 3
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/b59639e0-5720-4ac6-b9b9-ba6538247956)

## Eliminar
Eliminaremos el Accidente 3.

* Eliminación
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/954dee34-1b22-49d9-97d4-be36f984b510)

* Validación
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/88b5d8ff-8b3a-4556-93c6-d66e39f3514f)
