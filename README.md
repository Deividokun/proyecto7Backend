Este proyecto es un servidor RESTful construido con Express, conectado a una base de datos en MongoDB Atlas mediante Mongoose. Proporciona un sistema de usuarios con roles (admin y user), autenticación con JWT y CRUD completo sobre varias colecciones.

Características
Autenticación con JWT: Los usuarios deben iniciar sesión para acceder a la mayoría de las rutas.
Roles de Usuario: Se gestionan dos roles principales: admin y user. Los administradores tienen permisos adicionales, como modificar roles y eliminar usuarios.
CRUD Completo: Implementación de operaciones CRUD (Create, Read, Update, Delete) para todas las colecciones.
Semilla de Datos: Se incluye una función para poblar la base de datos con datos iniciales.
Relaciones entre colecciones: Los usuarios están relacionados con otras colecciones en la base de datos, por ejemplo, plataformas o animes.
Middlewares: Verificación de tokens y permisos según el rol del usuario.
Protección de Rutas: Solo los administradores tienen acceso a ciertas rutas.

Tecnologías utilizadas
Express: Framework para construir el servidor.
MongoDB Atlas: Base de datos NoSQL en la nube.
Mongoose: ODM para interactuar con MongoDB.
Bcrypt: Hashing de contraseñas.
JWT (JsonWebToken): Autenticación basada en tokens.

Endpoints
Usuarios
Método	Ruta	Descripción	Protección
GET	/api/v1/users	Listar todos los usuarios.	Solo Admin
GET	/api/v1/users/:id	Obtener un usuario por ID.	Solo Admin
POST	/api/v1/users/register	Registrar un nuevo usuario (solo como rol user).	Pública
POST	/api/v1/users/login	Iniciar sesión y obtener un token.	Pública
PUT	/api/v1/users/:id	Actualizar los datos de un usuario (incluye cambiar rol).	Autenticado (propio) o Admin
DELETE	/api/v1/users/:id	Eliminar un usuario (los admins pueden eliminar a otros).	Autenticado (propio) o Admin

Roles y Permisos
Usuarios:

Los usuarios se registran siempre con el rol user.
Los usuarios pueden modificar su propia cuenta o eliminarse a sí mismos.
Admins:

Pueden cambiar el rol de otros usuarios.
Pueden eliminar cualquier usuario.
El primer administrador debe crearse directamente en la base de datos.
Middlewares
Auth: Verifica que el usuario esté autenticado mediante un token JWT.
Admin: Verifica que el usuario autenticado tenga rol de admin.
Ejemplo de creación de admin
Para crear el primer administrador, debes hacerlo manualmente accediendo a la base de datos y cambiando el campo rol de un usuario a admin.

Contribuciones
Este proyecto está abierto a contribuciones. Si quieres añadir alguna funcionalidad o corregir errores, siéntete libre de hacer un fork del repositorio y enviar un pull request.

Licencia
Este proyecto está licenciado bajo la MIT License.
