# 📧 Configuración de Gmail con Vercel Functions

## 🎯 **Resumen**

Esta guía te ayudará a configurar el formulario de contacto para que funcione con **Vercel Functions** y **Gmail SMTP**, sin necesidad de un servidor separado.

## ✅ **Ventajas de Vercel Functions**

- ✅ **Sin servidor separado** - Todo integrado en Vercel
- ✅ **Serverless** - Solo paga por uso
- ✅ **Despliegue automático** - Con cada push a GitHub
- ✅ **Escalabilidad automática** - Vercel maneja la carga
- ✅ **Configuración simple** - Variables de entorno en Vercel

## 🔧 **Paso 1: Configurar Gmail**

### **1.1 Habilitar Verificación en 2 Pasos**
1. Ve a [myaccount.google.com](https://myaccount.google.com)
2. Seguridad → Verificación en 2 pasos
3. Sigue los pasos para habilitar

### **1.2 Generar App Password**
1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Aplicación → Otra (nombre personalizado)
3. Nombre: "Portfolio Contact Form"
4. **Copia la contraseña de 16 caracteres**

## 🚀 **Paso 2: Configurar Variables en Vercel**

### **2.1 Ir a Vercel Dashboard**
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**

### **2.2 Agregar Variables**
Agrega estas variables de entorno:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `GMAIL_USER` | `tu-email@gmail.com` | Tu email de Gmail |
| `GMAIL_APP_PASSWORD` | `tu-app-password` | App Password de 16 caracteres |
| `RECIPIENT_EMAIL` | `tu-email@gmail.com` | Email donde recibir los mensajes |

### **2.3 Configurar Entornos**
- ✅ **Production**: Marca las variables para producción
- ✅ **Preview**: Marca las variables para preview
- ✅ **Development**: Marca las variables para desarrollo

## 📁 **Paso 3: Estructura del Proyecto**

Tu proyecto debe tener esta estructura:

```
tu-portfolio/
├── api/
│   └── contact.js          # Vercel Function
├── src/
│   ├── services/
│   │   └── gmailService.js # Cliente del frontend
│   └── components/
│       └── Contact.jsx     # Formulario actualizado
├── package.json            # Con nodemailer
└── vercel.json            # Configuración de Vercel
```

## 🔄 **Paso 4: Despliegue**

### **4.1 Push a GitHub**
```bash
git add .
git commit -m "Add Gmail contact form with Vercel Functions"
git push origin main
```

### **4.2 Verificar en Vercel**
1. Ve a tu dashboard de Vercel
2. Verifica que el deploy fue exitoso
3. Ve a **Functions** para ver tu API

## 🧪 **Paso 5: Probar el Formulario**

### **5.1 Test Local (Opcional)**
```bash
# Instalar dependencias
npm install

# Probar localmente
npm run dev
```

### **5.2 Test en Producción**
1. Ve a tu sitio desplegado
2. Navega a la sección de contacto
3. Llena el formulario y envía un mensaje
4. Verifica que recibes el email en Gmail

## 📧 **Formato del Email**

### **Asunto:**
```
Portfolio Contact: [Asunto del mensaje]
```

### **Contenido:**
- ✅ Nombre del remitente
- ✅ Email del remitente
- ✅ Asunto del mensaje
- ✅ Idioma del formulario
- ✅ Timestamp
- ✅ Mensaje completo
- ✅ Reply-To configurado

## 🔒 **Características de Seguridad**

### ✅ **Validación de Datos**
- Sanitización de HTML
- Validación de email
- Límites de caracteres
- Prevención de XSS

### ✅ **Manejo de Errores**
- Respuestas detalladas en desarrollo
- Mensajes genéricos en producción
- Logging para debugging

### ✅ **Rate Limiting**
- Vercel maneja el rate limiting automáticamente
- Protección contra spam

## 🐛 **Solución de Problemas**

### **Error: "Invalid login"**
- ✅ Verifica que la App Password sea correcta
- ✅ Asegúrate de que la verificación en 2 pasos esté habilitada
- ✅ No uses tu contraseña normal de Gmail

### **Error: "Function not found"**
- ✅ Verifica que el archivo `api/contact.js` existe
- ✅ Asegúrate de que el deploy fue exitoso
- ✅ Revisa los logs en Vercel

### **Error: "Environment variables not found"**
- ✅ Verifica que las variables estén configuradas en Vercel
- ✅ Asegúrate de que estén marcadas para el entorno correcto
- ✅ Revisa que los nombres sean exactos

### **Error: "CORS error"**
- ✅ Vercel maneja CORS automáticamente
- ✅ Verifica que estés usando la URL correcta
- ✅ Asegúrate de que el endpoint sea `/api/contact`

## 📊 **Monitoreo**

### **Vercel Dashboard**
1. Ve a tu proyecto en Vercel
2. **Functions** → Ver logs y métricas
3. **Analytics** → Ver uso y rendimiento

### **Logs en Tiempo Real**
```bash
# Ver logs de la función
vercel logs --follow
```

### **Test del Endpoint**
```bash
curl -X POST https://tu-dominio.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message",
    "language": "en"
  }'
```

## 🔄 **Actualizaciones**

### **Cambiar Email Destinatario**
1. Ve a Vercel Dashboard
2. Settings → Environment Variables
3. Edita `RECIPIENT_EMAIL`
4. Redeploy automático

### **Cambiar Validaciones**
1. Edita `api/contact.js`
2. Push a GitHub
3. Deploy automático

### **Agregar Nuevas Funcionalidades**
1. Modifica la función en `api/contact.js`
2. Push a GitHub
3. Vercel hace deploy automáticamente

## ✅ **Checklist de Configuración**

- [ ] Verificación en 2 pasos habilitada en Gmail
- [ ] App Password generada y copiada
- [ ] Variables de entorno configuradas en Vercel
- [ ] Archivo `api/contact.js` creado
- [ ] `nodemailer` agregado a `package.json`
- [ ] Deploy exitoso en Vercel
- [ ] Formulario enviando emails
- [ ] Email de prueba recibido

## 🎉 **¡Listo!**

Tu formulario de contacto ahora está configurado para funcionar con **Vercel Functions** y **Gmail SMTP**.

**Ventajas obtenidas:**
- ✅ **Sin servidor separado** - Todo en Vercel
- ✅ **Despliegue automático** - Con cada push
- ✅ **Escalabilidad automática** - Vercel maneja la carga
- ✅ **Configuración simple** - Variables en Vercel
- ✅ **Monitoreo integrado** - Logs y métricas en Vercel

## 🗑️ **Limpiar Archivos Innecesarios**

Ya no necesitas estos archivos del servidor separado:
- ❌ `backend/` (carpeta completa)
- ❌ `GMAIL_SETUP_GUIDE.md` (reemplazado por esta guía)

**Mantén solo:**
- ✅ `api/contact.js` (Vercel Function)
- ✅ `src/services/gmailService.js` (cliente frontend)
- ✅ `VERCEL_GMAIL_SETUP.md` (esta guía)

---

**¿Necesitas ayuda?** Revisa los logs en Vercel Dashboard o consulta la documentación de Vercel Functions. 