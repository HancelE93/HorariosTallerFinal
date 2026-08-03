<div align="center">

# 📚 Generador Inteligente de Horarios Académicos

### Sistema web para la generación automática de horarios académicos utilizando algoritmos de combinaciones y validación de restricciones.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-Academic-blue)

</div>

---

# 📖 Descripción

El **Generador Inteligente de Horarios Académicos** es una aplicación web desarrollada para automatizar la generación de horarios universitarios.

El sistema analiza las materias registradas por el usuario, calcula todas las combinaciones posibles utilizando principios de **Matemáticas Discretas** y posteriormente aplica restricciones para identificar únicamente los horarios válidos.

Además de generar los horarios, la aplicación presenta un análisis matemático del proceso realizado, permitiendo comprender cómo se obtuvo cada resultado.

---

# ✨ Características

- Gestión completa de materias.
- Registro, edición y eliminación de materias.
- Configuración de la cantidad de materias por horario.
- Generación automática de todas las combinaciones posibles.
- Validación de conflictos entre materias.
- Eliminación automática de horarios inválidos.
- Estadísticas de horarios generados.
- Visualización gráfica del porcentaje de horarios válidos.
- Análisis matemático del proceso.
- Vista detallada de cada horario generado.
- Interfaz moderna y responsiva.

---

# 🏗 Arquitectura

El proyecto está dividido en dos aplicaciones independientes.

```text
Proyecto
│
├── Frontend_Horarios
│
└── Generador-Horarios
```

## Frontend

Responsable de la interacción con el usuario.

- React
- React Router
- CSS
- Vite

## Backend

Responsable de la lógica de negocio.

- Node.js
- Express
- TypeScript

---

# 🧠 Fundamento Matemático

El proyecto incorpora conceptos de Matemáticas Discretas durante la generación de horarios.

Entre ellos se encuentran:

- Teoría de conjuntos
- Combinaciones
- Validación mediante restricciones
- Filtrado de soluciones
- Conteo de horarios posibles

El sistema calcula el número total de combinaciones mediante la fórmula:

\[
C(n,r)=\frac{n!}{r!(n-r)!}
\]

Posteriormente analiza cada combinación para determinar si cumple todas las reglas definidas.

---

# 📂 Estructura del proyecto

```text
Frontend_Horarios
│
├── src
│   ├── components
│   ├── pages
│   ├── styles
│   ├── services
│   └── config
│

Generador-Horarios
│
├── src
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── models
│   ├── utils
│   └── config
```

---

# ⚙️ Instalación

## Clonar el repositorio

```bash
git clone https://github.com/USUARIO/REPOSITORIO.git
```

---

## Backend

```bash
cd Generador-Horarios

npm install

npm run dev
```

---

## Frontend

```bash
cd Frontend_Horarios

npm install

npm run dev
```

---

# 🚀 Ejecución

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:3001
```

---

# 📋 Flujo del sistema

```text
Registro de materias
        │
        ▼
Configuración del horario
        │
        ▼
Generación de combinaciones
        │
        ▼
Validación de restricciones
        │
        ▼
Clasificación de horarios
        │
        ├────────► Horarios válidos
        │
        └────────► Horarios descartados
        │
        ▼
Visualización de resultados
```

---

# 🎯 Funcionalidades

## Gestión de materias

- Registrar materias
- Editar materias
- Eliminar materias

## Generación de horarios

- Configurar número de materias
- Generar combinaciones
- Detectar conflictos
- Validar horarios

## Resultados

- Estadísticas
- Gráfico de porcentajes
- Motivos de descarte
- Detalle completo del horario

---

# 🛠 Tecnologías

| Frontend | Backend |
|-----------|----------|
| React | Node.js |
| Vite | Express |
| React Router | TypeScript |
| CSS3 | REST API |

---

# 📌 Objetivo del proyecto

Desarrollar una aplicación capaz de generar automáticamente horarios académicos válidos, optimizando el proceso de selección de materias mediante algoritmos de combinaciones y validación de restricciones, integrando conocimientos de desarrollo web y Matemáticas Discretas.

---

# 👨‍💻 Autores

**Hancel Espín**

**Luis Aristeguieta**

---

<div align="center">

### ⭐ Si este proyecto te resulta interesante, no olvides darle una estrella al repositorio.

</div>