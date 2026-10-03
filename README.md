# Evolucion de Hoja de Vida: De Nativo Android a Despliegue Web Embed en Flutter

Estudiante: Kevin Daniel Arteaga Gallegos (21 anos)  
Institucion: Universidad Politecnica Estatal del Carchi (UPEC)  
Carrera: Computacion - Desarrollo de Aplicaciones Moviles  
Docente: PhD. Samuel Lascano Rivera  
Periodo: Octubre 2026 - Tulcan, Ecuador  

---

## 1. Descripcion del Proyecto

Este repositorio contiene la solucion de la practica academica "Evolucion de Hoja de Vida: De Nativo Android a Despliegue Web Embed en Flutter". El proyecto demuestra la transicion de una aplicacion desarrollada originalmente en formato nativo hacia una arquitectura desacoplada estructurada en dos fases:

1. Fase 1 (Web CV): Rediseno a formato web utilizando HTML5 semantico, CSS3 (Mobile-First) y JavaScript Vanilla.
2. Fase 2 (Mobile App Wrapper): Contenedor nativo en Flutter utilizando el paquete webview_flutter para renderizar el contenido web de forma local y 100% offline (Opcion A - Assets), integrando controles nativos de la plataforma Android.

---

## 2. Estructura del Repositorio (C:\cv_flutter_wrapper)

```text
C:\cv_flutter_wrapper\
├── android/                   # Configuracion nativa Android (SDK 34)
├── assets/
│   └── web/                   # FASE 1: Archivos web locales (Offline Assets)
│       ├── index.html         # Estructura semantica HTML5
│       ├── styles.css         # Estilos responsivos CSS3
│       └── app.js             # Interactividad JavaScript
├── lib/
│   └── main.dart              # FASE 2: Contenedor Flutter con WebViewController y AppBar nativa
├── captura_pixel7_cv.png      # Captura de pantalla en Google Pixel 7
├── CV_Kevin_Arteaga.apk       # APK compilado listo para instalacion
├── INFORME_PRACTICA.md        # Informe academico de la practica
├── INFORME_PRACTICA_UPEC_KEVIN_ARTEAGA.docx # Documento formal en formato Word
├── pubspec.yaml               # Configuracion de dependencias (webview_flutter)
└── README.md                  # Documentacion del proyecto
```

---

## 3. Tecnologias y Herramientas Empleadas

### Fase 1: Entorno Web
* HTML5: Estructuracion semantica con etiquetas header, main, section, article y footer.
* CSS3: Maquetacion responsiva con Flexbox y CSS Grid, variables CSS para temas claro y oscuro, y diseno simetrico.
* JavaScript: Filtrado de habilidades por categorias, barra dock inferior con ScrollSpy, alternador de modo oscuro y notificaciones toast.

### Fase 2: Aplicacion Movil (Flutter Wrapper)
* Flutter SDK y Dart: Framework de desarrollo multiplataforma.
* webview_flutter (version 4.10.0): Motor embebido oficial para renderizado web.
* Carga Offline: Ejecucion local mediante loadFlutterAsset('assets/web/index.html').
* Integracion Nativa:
  * AppBar con controles de historial (canGoBack/goBack), recarga de pagina (reload), sincronizacion de tema claro/oscuro y menu nativo para compartir.
  * LinearProgressIndicator para mostrar el progreso de carga.
  * Canal de comunicacion JavaScriptChannel para recibir eventos web y desplegar SnackBars nativos.

---

## 4. Ejecucion del Proyecto

### 1. Clonar o abrir el proyecto
```bash
cd C:\cv_flutter_wrapper
```

### 2. Descargar dependencias
```bash
flutter pub get
```

### 3. Ejecutar en dispositivo fisico o emulador
```bash
flutter run
```

### 4. Compilacion de APK
```bash
flutter build apk --release
```
El archivo final se ubica en la raiz del proyecto como CV_Kevin_Arteaga.apk.

---

## 5. Cuadro Comparativo: Nativo vs. Hibrido Embebido

| Criterio | Enfoque Nativo Puro (Android / Kotlin) | Enfoque Hibrido Embebido (Flutter + WebView) |
| :--- | :--- | :--- |
| Rendimiento | Maximo (acceso directo a GPU nativa a 60-120 FPS). | Adecuado para interfaces estructuradas de lectura y consulta. |
| Tiempos de Desarrollo | Mayor tiempo; requiere codificar pantallas por plataforma. | Rapido; reutiliza codigo web preexistente (HTML/CSS/JS). |
| Mantenimiento | Requiere compilar y distribuir un nuevo APK ante cambios visuales. | Desacoplado; los archivos web pueden actualizarse de forma modular. |
| Acceso a Hardware | Acceso directo a todas las APIs del sistema operativo. | Requiere canales de comunicacion asincronos (JavaScriptChannel). |
| Conectividad | Depende de la logica implementada. | 100% offline mediante assets locales sin consumo de datos. |

---

## 6. Autor

Kevin Daniel Arteaga Gallegos  
Estudiante de Ingenieria en Computacion  
Universidad Politecnica Estatal del Carchi (UPEC)  
Tulcan - Ecuador  
Correo personal: arteagak800@gmail.com  
Correo institucional: kevin.arteaga@upec.edu.ec  
Telefono: 0987649121  
