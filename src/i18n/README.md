# Sistema de Internacionalización (i18n)

## 📁 Estructura

```
src/i18n/
├── index.js              # Configuración principal
├── i18n.js              # Sistema core
├── useTranslation.js     # Hook personalizado
├── README.md            # Esta documentación
└── locales/
    ├── en.js            # Traducciones en inglés
    └── es.js            # Traducciones en español
```

## 🚀 Uso Básico

### 1. En cualquier componente:

```javascript
import { useTranslation } from '../i18n/useTranslation.js';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.name')}</h1>
      <p>{t('hero.tagline')}</p>
      <button>{t('hero.cta')}</button>
    </div>
  );
}
```

### 2. Con parámetros:

```javascript
const { t } = useTranslation();

// En el archivo de traducción: "copyright": "© {year} David Fernández-Cuenca Marcos"
<p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
```

### 3. Acceso a namespaces completos:

```javascript
const { t } = useTranslation();

// Para formularios complejos
const formLabels = {
  name: t('contact.name'),
  email: t('contact.email'),
  subject: t('contact.subject'),
  message: t('contact.message')
};
```

## 🔧 Características

### ✅ **Fallback Inteligente**
- **1er intento**: Idioma seleccionado por el usuario
- **2do intento**: Idioma del navegador (si es diferente al seleccionado)
- **3er intento**: Idioma por defecto (inglés)
- **4to intento**: Devuelve la clave como string

### ✅ **Soporte de Parámetros**
```javascript
// Traducción: "Bienvenido {name}, tienes {count} mensajes"
t('welcome.message', { name: 'David', count: 5 })
// Resultado: "Bienvenido David, tienes 5 mensajes"
```

### ✅ **Navegación de Claves Anidadas**
```javascript
t('contact.validation.nameRequired')  // ✅ Funciona
t('nav.home')                        // ✅ Funciona
t('hero.name')                       // ✅ Funciona
```

### ✅ **Fallback Inteligente por Prioridad**
```javascript
// Ejemplo: Usuario selecciona inglés, navegador en español
// 1. Busca en inglés (idioma seleccionado)
// 2. Si no encuentra, busca en español (idioma del navegador)
// 3. Si no encuentra, busca en inglés (idioma por defecto)
// 4. Si no encuentra, devuelve la clave
```

### ✅ **Tipado Seguro**
- Estructura organizada por secciones
- Fácil de mantener y escalar
- Autocompletado en IDEs

## 📝 Agregar Nuevas Traducciones

### 1. **Agregar clave en inglés** (`src/i18n/locales/en.js`):

```javascript
export default {
  // ... existing translations
  newSection: {
    title: 'New Section Title',
    description: 'This is a new section',
    button: 'Click me'
  }
};
```

### 2. **Agregar traducción en español** (`src/i18n/locales/es.js`):

```javascript
export default {
  // ... existing translations
  newSection: {
    title: 'Título de Nueva Sección',
    description: 'Esta es una nueva sección',
    button: 'Haz clic aquí'
  }
};
```

### 3. **Usar en componente**:

```javascript
const { t } = useTranslation();

return (
  <section>
    <h2>{t('newSection.title')}</h2>
    <p>{t('newSection.description')}</p>
    <button>{t('newSection.button')}</button>
  </section>
);
```

## 🎯 Migración de Componentes

### **Antes:**
```javascript
const translations = {
  es: { title: 'Título', description: 'Descripción' },
  en: { title: 'Title', description: 'Description' }
};
const t = translations[language];
```

### **Después:**
```javascript
import { useTranslation } from '../i18n/useTranslation.js';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('mySection.title')}</h1>
      <p>{t('mySection.description')}</p>
    </div>
  );
}
```

## 🔄 Cambiar Idioma

```javascript
const { setLanguage } = useAppContext();

// Cambiar a español
setLanguage('es');

// Cambiar a inglés
setLanguage('en');
```

## 📊 Ventajas del Sistema

### ✅ **Organización Profesional**
- Separación clara de responsabilidades
- Archivos organizados por idioma
- Fácil mantenimiento

### ✅ **Escalabilidad**
- Fácil agregar nuevos idiomas
- Estructura consistente
- Reutilización de traducciones

### ✅ **Performance**
- Carga lazy de traducciones
- Fallback inteligente basado en preferencias del navegador
- Sin re-renders innecesarios
- Detección automática del idioma del navegador

### ✅ **Developer Experience**
- Autocompletado en IDEs
- Fácil debugging
- Estructura predecible

## 🚀 Próximos Pasos

1. **Migrar componentes existentes** al nuevo sistema
2. **Agregar más idiomas** si es necesario
3. **Implementar carga lazy** de traducciones
4. **Agregar validación** de claves faltantes
5. **Optimizar bundle size** con tree shaking
6. **Implementar persistencia** de preferencias de idioma

---

**Estado**: ✅ **LISTO PARA USO**
**Versión**: 1.0.0 