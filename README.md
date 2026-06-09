# 🌱 Lomas Recicla - App de Reciclado

Una aplicacion movil que permite identificar si un producto o material es reciclabe mediante el escaneo de codigos de barras o codigos QR. La plataforma brinda informacion detallada sobre la clasificacion de  residuos , los materiales que componen cada prodcuto y las recomendaciones para su correcta disposicion y reciclaje. 

## 📋 Features

- ✅ Escaneo de códigos de barras/QR
- ✅ Base de datos de productos
- ✅ Información sobre reciclabilidad
- ✅ Panel administrativo para agregar productos
- ✅ Clasificación por tipo de material
- ✅ Información detallada: en qué se convierte cada material
- ✅ Historial de escaneos
- ✅ Estadísticas de reciclabilidad

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Validación:** Zod

### Frontend
- **Framework:** React Native
- **Tooling:** Expo
- **Estado:** React Context + Hooks
- **HTTP:** Axios

## 📁 Estructura del Proyecto

```
ecoscsan/
├── backend/                 # API REST
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── routes/          # Definición de rutas
│   │   ├── models/          # Modelos de datos
│   │   └── server.js        # Configuración Express
│   ├── prisma/
│   │   └── schema.prisma    # Esquema de BD
│   ├── .env.example
│   └── package.json
├── mobile/                  # React Native + Expo
│   ├── src/
│   │   ├── screens/         # Pantallas principales
│   │   ├── components/      # Componentes reutilizables
│   │   ├── services/        # Servicios API
│   │   └── context/         # Context API
│   ├── App.js
│   ├── app.json
│   └── package.json
└── docs/                    # Documentación
    └── API.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 12+
- Expo CLI: `npm install -g expo-cli`

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Configurar DATABASE_URL en .env
npx prisma migrate dev
npm run dev
```

### Frontend Setup
```bash
cd mobile
npm install
npm start
# Presionar 'i' para iOS o 'a' para Android
```

## 📚 Documentación

Ver [API.md](./docs/API.md) para endpoints disponibles.

## 🏃 Flujo Principal

1. **Escanear Producto**: Usuario escanea código de barras
2. **Información Completa**: App muestra si se recicla y en qué se convierte
3. **Detalles del Material**: Información específica del material (impacto ambiental, usos, etc)
4. **Gestión Admin**: Agregar productos y materiales desde el panel administrativo
5. **Estadísticas**: Ver datos de escaneos y productos más consultados

## 🌍 Materiales Soportados

- ♻️ PET (Plástico)
- ♻️ HDPE (Plástico)
- ♻️ Glass (Vidrio)
- ♻️ Paper (Papel)
- ♻️ Aluminum (Aluminio)
- Y más...

## 📝 License

MIT
