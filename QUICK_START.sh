#!/bin/bash

echo "🌱 EcoScan Setup Automático"
echo "================================"

if ! command -v node &gt; /dev/null; then
    echo "Node.js no instalado"
    exit 1
fi

echo "📦 Instalando Backend..."
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
echo "✅ Backend instalado"

echo ""
echo "📦 Instalando Frontend..."
cd ../mobile
npm install
echo "✅ Frontend instalado"

echo ""
echo "================================"
echo "✅ Setup completado!"
echo "Terminal 1: cd backend && npm run dev"
echo "Terminal 2: cd mobile && npm start"
echo "================================"
