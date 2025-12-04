# 🌍 interpretAI

Una aplicación web innovadora que utiliza inteligencia artificial para interpretar textos desde la perspectiva de diferentes personajes o puntos de vista, explorando la diversidad y complejidad del pensamiento humano a través de la tecnología.

## 📖 Descripción

**interpretAI** es una plataforma que combina inteligencia artificial con la capacidad humana de interpretar y extraer significado. El proyecto se presenta como un espacio simple, abierto y en constante evolución donde la interpretación tiene múltiples perspectivas, reflejando lo diverso y complejo que puede ser el pensamiento humano.

> En un paisaje digital cada vez más sofisticado, debemos recordar que la verdadera interpretación y el significado son, en última instancia, profundos y humanos.

## ✨ Características

- 🤖 **Interpretación con IA**: Utiliza OpenAI para generar interpretaciones únicas desde diferentes perspectivas
- 👤 **Perspectivas personalizadas**: Interpreta textos desde el punto de vista de cualquier personaje o entidad
- 📝 **Moralejas automáticas**: Extrae lecciones y reflexiones de cada interpretación
- 💬 **Sistema de feedback**: Permite a los usuarios calificar y comentar las interpretaciones
- 🎨 **Interfaz moderna**: Diseño limpio y minimalista con tema oscuro
- 🔄 **Single Page Application**: Navegación fluida sin recargas de página

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsive
- **JavaScript (Vanilla)** - Lógica de aplicación sin frameworks
- **Fetch API** - Comunicación con el backend

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **OpenAI API** - Motor de inteligencia artificial
- **CORS** - Configuración para permitir peticiones cross-origin

## 📁 Estructura del Proyecto

```
interpretIA/
│
├── api/
│   └── Api-IA-HC/           # Backend API
│       ├── index.js         # Servidor Express
│       ├── routes/          # Rutas de la API
│       │   ├── interpreta.js
│       │   ├── feedback.js
│       │   └── ...
│       ├── services/        # Servicios (OpenAI)
│       └── middleware/      # Middlewares (auth, etc.)
│
├── views/                   # Vistas HTML
│   ├── landingView.html    # Página de inicio
│   ├── formView.html       # Formulario de interpretación
│   ├── loadingView.html    # Vista de carga
│   ├── resultView.html     # Resultados
│   └── thankYouView.html   # Agradecimiento
│
├── css/
│   └── styles.css          # Estilos principales
│
├── js/
│   └── script.js           # Lógica del frontend
│
├── img/                     # Imágenes y recursos
│   └── end.png             # Logo del proyecto
│
└── index.html              # Punto de entrada

```

## 🚀 Instalación

### Prerrequisitos

- **Node.js** (v14 o superior)
- **npm** (viene incluido con Node.js)
- **Cuenta de OpenAI** con API key

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/interpretIA.git
   cd interpretIA
   ```

2. **Instalar dependencias del backend**
   ```bash
   cd api/Api-IA-HC
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env` en `api/Api-IA-HC/` con:
   ```env
   OPENAI_API_KEY=tu_api_key_aqui
   PORT=3001
   ```

4. **Instalar servidor estático para el frontend** (opcional)
   ```bash
   npm install -g serve
   ```

## 🎯 Uso

### Iniciar el Backend (API)

```bash
cd api/Api-IA-HC
npm start          # Modo producción
# o
npm run dev        # Modo desarrollo con nodemon
```

El servidor estará disponible en `http://localhost:3001`

### Iniciar el Frontend

Desde la raíz del proyecto:

```bash
serve .
# o
npx serve .
```

Abre tu navegador en la URL que te indique (generalmente `http://localhost:3000`)

### Usar la aplicación

1. **Inicio**: La landing page te dará la bienvenida y explicará el concepto
2. **Interpretar**: Haz clic en "Comenzar" y:
   - Ingresa el nombre del personaje o perspectiva desde la cual interpretar
   - Escribe o pega el texto que deseas interpretar
   - Haz clic en "InterpretAI"
3. **Resultados**: Recibirás una interpretación única y una moraleja
4. **Feedback**: Califica la interpretación o proporciona comentarios

## 🔌 Endpoints de la API

### `POST /interpreta`
Interpreta un texto desde una perspectiva específica.

**Body:**
```json
{
  "personaje": "Albert Einstein",
  "letra": "Texto a interpretar..."
}
```

**Response:**
```json
{
  "interpretacion": "...",
  "moraleja": "..."
}
```

### `POST /feedback`
Envía feedback sobre una interpretación.

**Body:**
```json
{
  "feedback": "like" | "dislike",
  "comment": "Comentario opcional..."
}
```

## 🔒 Variables de Entorno

Asegúrate de configurar estas variables en tu archivo `.env`:

- `OPENAI_API_KEY` - Tu clave de API de OpenAI (requerido)
- `PORT` - Puerto del servidor (por defecto: 3001)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- OpenAI por proporcionar las herramientas de IA
- La comunidad open source
- Todos los contribuidores que han ayudado a mejorar este proyecto

## 📧 Contacto

Para preguntas o sugerencias, no dudes en abrir un issue en GitHub.

---

**Hecho con ❤️ para mantener viva la capacidad humana de interpretar y dar significado en la era de la IA**

