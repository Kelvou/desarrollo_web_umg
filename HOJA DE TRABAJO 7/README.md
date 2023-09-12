# Evidencias
Se agregaran algunas imagenes de las funcionalidades requeridas.

* Se utilizará POSTMAN para hacer las solicitudes.
* Requiere de instalación de Express, Mongoose, body-parser y jsonwebtoken.

*** Hay dos documentos (usuarios) en MongoDB, uno admin y otro normal ***

## Documentos en MongoDB
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/1b8fbbbd-26e0-4c5e-ad61-590d785a72c3)

## Solicitudes y validación de Tokens
Se pasa como Path Parameter el dpi y cómo Body Parameter el usuario y clave para ingresar

### Usuario 'admin'

* Iniciando sesión con el user 'admin'
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/031fe921-d60e-420c-a9ac-ea3f21a7e0f0)

* Validando el token, retorna mensaje y credenciales del usuario en Sesión
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/6691cc94-9a55-409e-ad17-909f7a0a3c24)

### Usuario 'usuario1'

* Iniciando sesión con el user 'usuario1'
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/6725ce8d-6829-49bf-a485-5cc9b7d6e219)

* Validando el token, retorna mensaje y credenciales del usuario en Sesión
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/077d2347-e574-47db-ba84-9c65f11c70c8)

### Validando Token de 'admin' en sesión de 'usuario1'
![image](https://github.com/Kelvou/desarrollo_web_umg/assets/64044708/f779789a-3b9e-431d-8bc3-d3161efb8198)
