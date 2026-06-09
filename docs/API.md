# 📚 API Documentation - EcoScan

## Base URL
```
http://localhost:5000/api
```

---

## 🏥 Health Check

### GET `/health`
Verificar estado del servidor.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 📦 Products

### GET `/products`
Obtener todos los productos.

### GET `/products/search?q=botella`
Buscar productos por nombre, descripción o barcode.

### GET `/products/:id`
Obtener un producto por ID (incluye información del material reciclado).

### GET `/products/barcode/:barcode`
Obtener un producto por barcode (usado en escaneo).

### POST `/products`
Crear un nuevo producto (Admin).

**Body:**
```json
{
  "barcode": "7501001208962",
  "name": "Botella de Plástico",
  "description": "Botella de agua 500ml",
  "category": "plástico",
  "recyclable": true,
  "recyclingInstructions": "Enjuagar y llevar a centro de acopio",
  "material": "PET",
  "recycledInto": "Fibras textiles, botellas nuevas",
  "imageUrl": "https://..."
}
```

### PUT `/products/:id`
Actualizar un producto (Admin).

### DELETE `/products/:id`
Eliminar un producto (Admin).

---

## 🏷️ Categories

### GET `/categories`
Obtener todas las categorías.

### POST `/categories`
Crear una categoría (Admin).

### PUT `/categories/:id`
Actualizar una categoría (Admin).

### DELETE `/categories/:id`
Eliminar una categoría (Admin).

---

## ♻️ Recycled Materials

### GET `/materials`
Obtener todos los materiales reciclables.

### GET `/materials/:code`
Obtener información de un material específico (ej: PET, HDPE).

### POST `/materials`
Crear un nuevo material reciclable (Admin).

**Body:**
```json
{
  "material": "PET",
  "name": "Plástico PET",
  "description": "Tereftalato de polietileno",
  "recycledIntoProducts": ["Fibras textiles", "Botellas nuevas", "Alfombras"],
  "percentageRecycled": 85.5,
  "commonUses": "Se reutiliza para hacer prendas de ropa...",
  "environmentalImpact": "Reduce 75% de energía vs producir PET virgen",
  "color": "#3498db"
}
```

### PUT `/materials/:id`
Actualizar un material reciclable (Admin).

### DELETE `/materials/:id`
Eliminar un material reciclable (Admin).

---

## 📊 Scans

### POST `/scans`
Registrar un escaneo de producto.

### GET `/scans`
Obtener historial de escaneos.

### GET `/scans/stats`
Obtener estadísticas de escaneos.
