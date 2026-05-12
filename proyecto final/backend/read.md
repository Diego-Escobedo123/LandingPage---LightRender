# LightRender API REST

Backend para gestionar configuraciones de iluminación PBR.

## Endpoints

| Método | Ruta | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/escenas` | Lista todas las escenas guardadas. | N/A |
| **POST** | `/api/escenas` | Guarda una nueva escena. | `{ "nombre": string, "potencia": number, "color": string }` |
| **DELETE** | `/api/escenas/:id` | Elimina una escena específica. | N/A |

## Ejecución
1. `npm install`
2. `node server.js