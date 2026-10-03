# Evolución de Hoja de Vida: De Nativo Android a Despliegue Web Embed en Flutter

**Estudiante:** Kevin Daniel Arteaga Gallegos (21 años)  
**Institución:** Universidad Politécnica Estatal del Carchi (UPEC)  
**Carrera:** Computación — *Desarrollo de Aplicaciones Móviles*  
**Docente:** PhD. Samuel Lascano Rivera  
**Semestre / Período:** 2026  

---

## 📌 Descripción del Proyecto

Este repositorio contiene la solución completa de la práctica académica **"Evolución de Hoja de Vida: De Nativo Android a Despliegue Web Embed en Flutter"**. El proyecto demuestra cómo transformar una hoja de vida originalmente desarrollada de manera nativa en Android hacia una arquitectura híbrida moderna desacoplada en dos fases:

1. **Fase 1 (Web CV):** Rediseño a formato web responsivo utilizando **HTML5 semántico**, **CSS3 (Mobile-First)** y **JavaScript Vanilla**.
2. **Fase 2 (Mobile App Wrapper):** Contenedor nativo en **Flutter** utilizando el paquete oficial `webview_flutter` para renderizar el contenido web de forma local y **100% offline** (Opción A - Assets), integrando controles y componentes nativos de la plataforma móvil.

---

## 📁 Estructura del Repositorio (`C:\CV`)

```text
C:\CV\
├── android/                   # Configuración y manifiesto nativo Android (SDK 34)
├── assets/
│   └── web/                   # FASE 1: Archivos web locales (Offline Assets)
│       ├── index.html         # Estructura semántica HTML5
│       ├── styles.css         # Estilos responsivos Mobile-First CSS3
│       └── app.js             # Interactividad JS (filtros, modo oscuro, toast)
├── lib/
│   └── main.dart              # FASE 2: Contenedor Flutter con WebViewController y AppBar nativa
├── captura_pixel7_cv.png      # Captura de pantalla en dispositivo físico (Google Pixel 7)
├── CV_Kevin_Arteaga.apk       # APK compilado listo para instalación directa
├── INFORME_PRACTICA.md        # Informe académico completo de la práctica
├── pubspec.yaml               # Configuración de dependencias (webview_flutter)
└── README.md                  # Documentación del proyecto
```

---

## 🚀 Tecnologías y Herramientas Empleadas

### Fase 1: Entorno Web
* **HTML5:** Estructuración semántica con `<header>`, `<main>`, `<section>`, `<article>` y `<footer>`.
* **CSS3:** Maquetación responsiva con Flexbox y CSS Grid, variables CSS `:root` para temas claro/oscuro.
* **JavaScript (ES6+):** Filtrado dinámico de habilidades técnicas por categorías, alternador de modo oscuro y notificaciones Toast flotantes.

### Fase 2: Aplicación Móvil (Flutter Wrapper)
* **Flutter SDK & Dart:** Framework multiplataforma de Google.
* **`webview_flutter: ^4.10.0`:** Motor embebido oficial de Chromium/WebKit.
* **Carga Offline:** Mediante `WebViewController()..loadFlutterAsset('assets/web/index.html')`.
* **Integración Nativa:**
  * `AppBar` con botones de navegación: Atrás en historial (`canGoBack`), Recargar (`reload`), alternancia de tema y menú inferior para compartir (`showModalBottomSheet`).
  * Barra de progreso de carga (`LinearProgressIndicator`).
  * Canal de mensajería bidireccional (`addJavaScriptChannel`).

---

## 📲 Ejecución del Proyecto

### 1. Clonar o Abrir el Proyecto
```bash
cd C:\CV
```

### 2. Obtener dependencias
```bash
flutter pub get
```

### 3. Ejecutar en dispositivo Android o emulador
```bash
flutter run
```

### 4. Compilar APK de Distribución
```bash
flutter build apk --release
```
El archivo ejecutable generado se ubica en `build/app/outputs/flutter-apk/app-release.apk` o en la raíz como `CV_Kevin_Arteaga.apk`.

---

## 📊 Cuadro Comparativo: Nativo vs. Híbrido Embebido

| Criterio | Enfoque Nativo Puro (Android / Kotlin) | Enfoque Híbrido Embebido (Flutter + WebView) |
| :--- | :--- | :--- |
| **Rendimiento** | Máximo aprovechamiento de GPU nativa. | Óptimo para contenido estático/interactivo estándar. |
| **Tiempos de Desarrollo** | Mayor tiempo; requiere codificar vistas específicas por SO. | **Ultra rápido;** reutilización directa del código web existente. |
| **Mantenimiento** | Cualquier cambio de interfaz requiere recompilar el APK. | Los contenidos o estilos web pueden actualizarse de forma modular. |
| **Acceso a Hardware** | Acceso directo a todas las APIs del sistema operativo. | Requiere puentes de comunicación (`JavaScriptChannel`). |
| **Conectividad Requerida** | Depende de la lógica implementada. | **Zero dependencias de red** al utilizar assets locales (`assets/web/`). |

---

## 👤 Autor
**Kevin Daniel Arteaga Gallegos**  
Estudiante de Ingeniería en Computación  
Universidad Politécnica Estatal del Carchi (UPEC)  
Tulcán - Ecuador  
