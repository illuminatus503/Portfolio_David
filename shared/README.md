# Shared Configuration

Este directorio contiene toda la configuración compartida entre la API y el Frontend del portfolio.

## 📁 Estructura de Archivos

```
shared/
├── config.js              # Configuración base compartida
├── constants.js           # Constantes de la aplicación
├── environment.js         # Variables de entorno
├── frontend-config.js     # Configuración específica del frontend
├── api-config.js          # Configuración específica de la API
├── index.js               # Archivo de exportación principal
└── README.md              # Esta documentación
```

## 🔧 Configuración Base (`config.js`)

Contiene toda la información personal y profesional de David:

- **Personal**: Nombre, email, ubicación, experiencia
- **Professional**: Empresa, rol, habilidades
- **Social**: Enlaces a GitHub, LinkedIn, Twitter
- **Site**: Configuración del sitio web
- **API**: Endpoints y configuración de la API
- **Database**: Configuración de la base de datos
- **Email**: Configuración de email
- **GitHub**: Configuración de la API de GitHub
- **Blog**: Configuración del blog
- **Analytics**: Configuración de analytics
- **Security**: Configuración de seguridad
- **Cache**: Configuración de caché

## 📊 Constantes (`constants.js`)

Define todas las constantes utilizadas en la aplicación:

- **HTTP**: Códigos de estado, métodos, tipos de contenido
- **Database**: Límites de longitud, restricciones
- **Pagination**: Configuración de paginación
- **File Upload**: Límites de archivos
- **Authentication**: Configuración de autenticación
- **Rate Limiting**: Configuración de límites de tasa
- **Cache**: TTL y prefijos
- **GitHub**: Configuración de la API
- **Email**: Configuración de email
- **Validation**: Esquemas de validación
- **UI/UX**: Configuración de interfaz
- **Localization**: Configuración de idiomas
- **SEO**: Configuración de SEO
- **Analytics**: Configuración de analytics

## 🌍 Entorno (`environment.js`)

Maneja todas las variables de entorno:

- **Environment**: Detección del entorno
- **Server**: Configuración del servidor
- **Database**: Configuración de la base de datos
- **Redis**: Configuración de Redis
- **Email**: Configuración de email
- **Authentication**: Configuración de autenticación
- **Security**: Configuración de seguridad
- **Cache**: Configuración de caché
- **GitHub**: Configuración de GitHub
- **Blog**: Configuración del blog
- **Analytics**: Configuración de analytics
- **Logging**: Configuración de logging
- **Feature Flags**: Banderas de características
- **Development**: Configuración de desarrollo

## 🎨 Frontend Config (`frontend-config.js`)

Extiende la configuración base con configuraciones específicas del frontend:

- **UI**: Configuración de interfaz de usuario
- **Components**: Configuración de componentes
- **Localization**: Configuración de internacionalización
- **Themes**: Configuración de temas

## 🚀 API Config (`api-config.js`)

Extiende la configuración base con configuraciones específicas de la API:

- **Server**: Configuración del servidor
- **Database**: Configuración específica de la base de datos
- **Email**: Plantillas de email
- **Rate Limiting**: Configuración de límites de tasa
- **Logging**: Configuración de logging
- **Security**: Configuración de seguridad
- **Cache**: Configuración de caché
- **Validation**: Esquemas de validación

## 📖 Uso

### En el Frontend (ES6)

```javascript
import { config, frontendConfig, constants } from '../shared/index.js';

// Usar configuración personal
const personalInfo = config.getPersonalInfo();
const socialLinks = config.getSocialLinks();

// Usar configuración del frontend
const themeColors = frontendConfig.getThemeColors('dark');
const isMobile = frontendConfig.isMobile();

// Usar constantes
const maxTitleLength = constants.DATABASE.MAX_TITLE_LENGTH;
```

### En la API (CommonJS)

```javascript
const { config, apiConfig, constants, environment } = require('../shared');

// Usar configuración de la API
const dbConfig = apiConfig.getDatabaseConfig();
const emailConfig = apiConfig.getEmailConfig();

// Usar variables de entorno
const isProduction = environment.isProduction();
const dbUrl = environment.require('DATABASE_URL');
```

### En el Browser (Global)

```javascript
// Acceder a la configuración global
const personalInfo = window.sharedConfigs.config.getPersonalInfo();
const frontendConfig = window.sharedConfigs.frontendConfig;
const constants = window.sharedConfigs.constants;
```

## 🔄 Actualización de Datos

Para actualizar información personal o profesional:

1. Edita `config.js`
2. Los cambios se reflejarán automáticamente en toda la aplicación
3. No es necesario editar múltiples archivos

## 🚨 Variables de Entorno Requeridas

```bash
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio

# Autenticación
JWT_SECRET=your-secret-key

# Email (opcional)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Analytics (opcional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VERCEL_ANALYTICS_ID=your-vercel-id
```

## 📝 Ejemplos de Uso

### Obtener información personal

```javascript
const personal = config.getPersonalInfo();
console.log(personal.name); // "David Fernández-Cuenca Marcos"
console.log(personal.location.city); // "Dusseldorf"
console.log(personal.jobTitle); // "Software Engineer & AI Specialist"
```

### Obtener enlaces sociales

```javascript
const social = config.getSocialLinks();
console.log(social.github); // "https://github.com/davidfdezcuenca"
console.log(social.linkedin); // "https://linkedin.com/in/davidfdezcuenca"
```

### Verificar entorno

```javascript
if (environment.isProduction()) {
  // Configuración de producción
} else if (environment.isDevelopment()) {
  // Configuración de desarrollo
}
```

### Usar constantes

```javascript
const maxTitleLength = constants.DATABASE.MAX_TITLE_LENGTH;
const httpOk = constants.HTTP_STATUS.OK;
const defaultPage = constants.PAGINATION.DEFAULT_PAGE;
```

## 🔧 Mantenimiento

- **config.js**: Actualizar información personal/profesional
- **constants.js**: Agregar nuevas constantes
- **environment.js**: Agregar nuevas variables de entorno
- **frontend-config.js**: Configuración específica del frontend
- **api-config.js**: Configuración específica de la API

## 📚 Beneficios

1. **DRY**: No más duplicación de datos
2. **Mantenibilidad**: Un solo lugar para actualizar información
3. **Consistencia**: Mismos datos en toda la aplicación
4. **Flexibilidad**: Configuración específica por entorno
5. **Reutilización**: Fácil importación en cualquier parte
6. **Validación**: Validación centralizada de configuración
