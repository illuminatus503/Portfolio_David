# 🚀 Portfolio de David Fernández-Cuenca

Portfolio profesional desarrollado con React, Node.js y diseñado para despliegue en Vercel.

## ✨ Características

- **🌐 Multiidioma**: Soporte para español e inglés
- **🌙 Modo Oscuro/Claro**: Tema adaptable
- **📱 Responsive**: Diseño optimizado para móviles
- **⚡ Performance**: Optimizado para velocidad
- **🔐 Panel de Admin**: Gestión de contenido
- **📧 Formulario de Contacto**: Integrado con nodemailer
- **📊 Analytics**: Vercel Analytics + Google Analytics
- **🎨 Tailwind CSS**: Diseño moderno y limpio

## 🛠️ Tecnologías

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Node.js, Vercel Functions
- **Base de Datos**: PostgreSQL
- **Despliegue**: Vercel
- **Email**: Nodemailer + Gmail
- **Autenticación**: JWT + bcrypt

## 🚀 Despliegue en Vercel

### 1. Preparación

```bash
# Clonar el repositorio
git clone <tu-repo>
cd Portfolio_David

# Instalar dependencias
pnpm install

# Generar iconos y CSS (automático en build)
pnpm run build
```

#### 🎨 **Generación Automática de Iconos**

El proyecto incluye un sistema de generación automática de iconos desde un SVG base:

- **📄 Archivo fuente**: `frontend/assets/favicon.svg`
- **🛠️ Script**: `frontend/generate-icons.js`
- **📦 Dependencia**: Sharp para conversión SVG → PNG
- **🔄 Comando**: `pnpm run build:icons`

**Iconos generados automáticamente:**
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `favicon.ico`
- `site.webmanifest`

### 2. Variables de Entorno

Configura las siguientes variables en el panel de Vercel:

```env
# Base de Datos
DATABASE_URL=postgresql://username:password@host:port/database

# Email
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=tu-password-de-aplicacion
RECIPIENT_EMAIL=tu-email@gmail.com

# Autenticación
JWT_SECRET=tu-jwt-secret-super-seguro

# Analytics (Opcional)
VERCEL_ANALYTICS_ID=tu-vercel-analytics-id
GOOGLE_ANALYTICS_ID=tu-google-analytics-id
```

### 3. Base de Datos

Configura las siguientes tablas en PostgreSQL:

```sql
-- Usuarios para admin
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Proyectos
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  technologies TEXT[],
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  image_url VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  github_id BIGINT,
  github_metadata JSONB,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  author_id INTEGER REFERENCES users(id),
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mensajes de contacto
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  language VARCHAR(10) DEFAULT 'es',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Usuario Admin

Crea el primer usuario administrador:

```sql
INSERT INTO users (username, email, password, role) 
VALUES (
  'admin', 
  'tu-email@gmail.com', 
  '$2b$10$hashedpasswordhere', -- Usa bcrypt para hashear tu password
  'admin'
);
```

### 5. Despliegue

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
pnpm install:all

# Generar iconos + CSS
cd frontend && pnpm run build

# Ejecutar en desarrollo
pnpm run dev
```

### 📝 **Comandos Disponibles**

```bash
# Frontend
cd frontend
pnpm run build:icons    # Generar iconos desde SVG
pnpm run build:css      # Compilar Tailwind CSS
pnpm run build          # Build completo (iconos + CSS)
pnpm run dev            # Desarrollo con servidor local

# Monorepo (desde root)
pnpm run build          # Build frontend + API
pnpm run dev            # Desarrollo completo
```

## 📁 Estructura del Proyecto

```
Portfolio_David/
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── i18n/         # Internacionalización
│   │   └── config/       # Configuración
│   ├── assets/           # Assets estáticos
│   ├── dist/            # CSS compilado
│   └── *.html           # Páginas HTML
├── api/                 # Funciones de API (Vercel)
├── shared/              # Configuración compartida
└── vercel.json          # Configuración de Vercel
```

## 🎨 Personalización

### Colores y Temas

Edita `frontend/tailwind.config.js` para cambiar la paleta de colores:

```js
colors: {
  primary: {
    DEFAULT: '#0d0d0d',
    dark: '#0d0d0d',
    light: '#ffffff'
  },
  accent: {
    DEFAULT: '#6366f1',
    hover: '#4f46e5'
  }
}
```

### Contenido

1. **Información Personal**: Edita `frontend/src/config/environment.js`
2. **Traducciones**: Modifica `frontend/src/i18n/locales/`
3. **Proyectos**: Usa el panel de admin en `/admin`

## 🔐 Panel de Administración

Accede al panel de admin en `/admin` para:

- ✅ Gestionar proyectos
- ✅ Sincronizar repositorios de GitHub
- ✅ Crear y editar posts del blog
- ✅ Ver mensajes de contacto

## 📈 Analytics

El portfolio incluye soporte para:

- **Vercel Analytics**: Automático con Vercel
- **Google Analytics 4**: Configura GOOGLE_ANALYTICS_ID

## 🛡️ Seguridad

- Autenticación JWT para admin
- Validación de formularios
- Sanitización de datos
- Rate limiting en APIs
- Headers de seguridad

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**David Fernández-Cuenca Marcos**
- 🌐 Website: [davidfdezcuenca.com](https://davidfdezcuenca.com)
- 💼 LinkedIn: [david-cuenca-marcos](https://linkedin.com/in/david-cuenca-marcos-03b7121b5)
- 🐙 GitHub: [@illuminatus503](https://github.com/illuminatus503)
- 🐦 Twitter: [@illuminatus_503](https://x.com/illuminatus_503)

---

⭐ ¡Dale una estrella si te ha gustado este proyecto!