
# Proyecto de Chat en Tiempo Real
## Descripción General
- Este es un proyecto de chat en tiempo real que utiliza socket.io y ReactJS. Permite a los usuarios enviar y recibir mensajes en tiempo real, así como ver cuándo otros usuarios están escribiendo. Los usuarios conectados y desconectados se actualizan y muestran en tiempo real.

### Características
- Lista de usuarios Conectados: Muestra un panel que lista todos los usuarios conectados.
- Historial de chat: En la primera entrada de un usuario al chat, recupera todos los mensajes anteriores. Después de eso, solo recibirá los nuevos mensajes.
- Envío de mensajes generales.
- Evento "typing": Si un usuario está escribiendo un mensaje y aún no lo ha enviado, se muestra un mensaje en la sala que dice "usuario is typing...".
- Notificaciones de desconexión: Se transmite un mensaje a todos los usuarios conectados cuando alguien se desconecta, actualizando la lista de conectados.

## Instrucciones para la Instalación
1. Clonar el repositorio
2. Dentro de la carpeta /front, ejecutar npm install para instalar las dependencias del cliente.
3. Dentro de la carpeta /server, ejecutar npm install para instalar las dependencias del servidor.
4. En la carpeta /server, ejecutar npm run dev para iniciar el servidor. El servidor debería iniciarse en localhost:3000.
5. En la carpeta /front, ejecutar npm run start para iniciar la interfaz de usuario en React. El cliente debería iniciarse en localhost:3001.

## Nota sobre la Interfaz de Usuario
La interfaz de usuario de este proyecto es bastante básica. El enfoque principal del desarrollo de este proyecto ha sido la funcionalidad en lugar de la estética. Por lo tanto, la interfaz de usuario podría no ser la mejor, pero se ha asegurado de que todas las funcionalidades funcionen correctamente.
