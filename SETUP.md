# 🚀 Setup Automático - EcoScan

## ✅ Quick Start

```bash
# 1. Verificar requisitos
node --version   # 16+
npm --version
psql --version

# 2. Backend setup
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev

# 3. Frontend (otra terminal)
cd mobile
npm install
npm start
```

## 📊 Backend

**Puerto:** 5000  
**Base datos:** PostgreSQL (ecoscsan)

### Comandos
```bash
npm run dev          # Desarrollo
npm run seed         # Datos de prueba
npm run reset        # Reset BD
npx prisma studio   # Ver BD
```

## 📱 Frontend

**Escaneador:** Códigos de barras  
**Admin:** Gestión de productos y materiales  
**Stats:** Gráficos de escaneos

### Comandos
```bash
npm start        # Expo dev server
npm run android  # Emulador Android
npm run ios      # Emulador iOS
```

## 🎯 Datos Incluidos

- 4 Categorías
- 5 Materiales (PET, HDPE, Glass, AL, Paper)
- 5 Productos con códigos de barras reales

**¡Lista para usar! 🎉**
