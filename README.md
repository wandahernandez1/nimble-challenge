# Nimble Gravity — Candidate Portal

Portal de postulación para candidatos. Permite ingresar con tu email, ver las posiciones abiertas y enviar tu repositorio de GitHub a la posición que te interese.

## Stack

- **React 19** + **Vite 7**
- **Framer Motion** para animaciones
- API REST propia en Azure (`botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net`)

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/nimble-challenge.git
cd nimble-challenge

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`.

```bash
# Build de producción
npm run build

# Preview del build
npm run preview
```

## Flujo de la aplicación

1. **Ingreso** — El usuario escribe su email. La app consulta `GET /api/candidate/get-by-email` y recupera sus datos (`uuid`, `candidateId`, `applicationId`, nombre).

2. **Listado de posiciones** — Una vez autenticado, se obtiene `GET /api/jobs/get-list` y se muestran todas las posiciones abiertas.

3. **Postulación** — Cada posición tiene un input para la URL del repositorio de GitHub y un botón Submit. Al presionarlo se ejecuta `POST /api/candidate/apply-to-job` con el payload `{ uuid, applicationId, jobId, candidateId, repoUrl }`.

## Estructura del proyecto

```
src/
├── api/
│   ├── client.js          # Fetch wrapper con manejo de errores HTTP y de red
│   ├── candidateService.js
│   └── jobsService.js
├── components/
│   ├── CandidateSetup/    # Formulario de ingreso por email
│   ├── CandidateCard/     # Barra con los datos del candidato activo
│   ├── JobList/           # Lista de posiciones con skeleton loader
│   ├── JobItem/           # Card individual: input + submit por posición
│   └── ui/
│       ├── Alert.jsx      # Mensajes de error, éxito e info
│       └── Spinner.jsx
├── hooks/
│   ├── useCandidate.js    # Fetch y estado del candidato
│   ├── useJobs.js         # Fetch de posiciones al montar
│   └── useApply.js        # Validación y envío de postulación
├── utils/
│   └── validators.js      # Validación de email y URL de GitHub
└── constants/
    └── api.js             # BASE_URL y endpoints
```

## Manejo de errores

- **Validación client-side** antes de cualquier llamada a la API (email y URL de GitHub).
- **Errores HTTP** — `client.js` lee el body de la respuesta y muestra el mensaje descriptivo que devuelve la API.
- **Errores de red** — Si `fetch` falla por conectividad, se muestra un mensaje claro en lugar de una excepción no controlada.
- Cada `useEffect` con fetch usa una flag `cancelled` para evitar actualizaciones de estado en componentes desmontados.
