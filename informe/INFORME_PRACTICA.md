# UNIVERSIDAD POLITECNICA ESTATAL DEL CARCHI
## FACULTAD DE INDUSTRIAS AGROPECUARIAS Y CIENCIAS AMBIENTALES
### CARRERA DE COMPUTACION

---

* ASIGNATURA: Desarrollo de Aplicaciones Moviles
* DOCENTE: PhD. Samuel Lascano Rivera
* ESTUDIANTE: Kevin Daniel Arteaga Gallegos (21 anos - Nacido: 26/12/2004 en Riobamba)
* CONTACTO: arteagak800@gmail.com | kevin.arteaga@upec.edu.ec | 0987649121
* TEMA: Evolucion de Hoja de Vida: De Nativo Android a Despliegue Web Embed en Flutter
* FECHA: Octubre 2026
* LUGAR: Tulcan, Carchi, Ecuador

---

## 1. Resumen de la Practica

En esta practica se desarrollo la transicion de la hoja de vida realizada previamente en Android nativo hacia una arquitectura de contenedor hibrido estructurada en dos fases:

1. Fase 1 (Web CV): Maquetacion en HTML5 semantico, CSS3 responsivo (Mobile-First) con diseno simetrico y JavaScript Vanilla (filtrado de habilidades, dock interactivo inferior con ScrollSpy y copiado de contactos).
2. Fase 2 (Flutter Wrapper): Integracion en un proyecto Flutter (cv_flutter_wrapper) mediante el widget WebViewWidget del paquete oficial webview_flutter, configurado con carga local offline desde assets/web/ y controles nativos en la barra superior (AppBar).

---

## 2. Estructura de Entregables del Repositorio

Los archivos del proyecto estan organizados en la raiz de trabajo limpia:

* Codigo Fuente Web (assets/web/):
  - index.html: Estructura semantica con etiquetas header, main, section, article y footer.
  - styles.css: Diseno responsivo con soporte para modo claro y modo oscuro, y cuadricula simetrica.
  - app.js: Logica de filtrado, navegacion con ScrollSpy en el dock inferior y comunicacion con Flutter.
* Proyecto Flutter Wrapper (cv_flutter_wrapper):
  - pubspec.yaml: Dependencia webview_flutter: ^4.10.0 y declaracion de assets/web/.
  - lib/main.dart: Controlador de WebView, indicador de progreso de carga y controles de navegacion en la AppBar.
* Entregables y Evidencias:
  - CV_Kevin_Arteaga.apk: Paquete instalador final compilado para Android.
  - captura_pixel7_cv.png: Captura de pantalla en dispositivo fisico Google Pixel 7.
  - INFORME_PRACTICA_UPEC_KEVIN_ARTEAGA.docx: Informe formal en formato Microsoft Word.

---

## 3. Desarrollo Tecnico Paso a Paso

### 3.1 Fase 1: Entorno Web (Web CV)

* Estructura e Informacion: Se utilizo HTML5 estandar, incorporando los datos personales reales (Kevin Daniel Arteaga Gallegos, 21 anos, Riobamba, Tulcan), estudios en UPEC y La Salle, y areas de interes en ciberseguridad, programacion, desarrollo de software, hardware y redes.
* Estilos y Simetria: Se aplico CSS3 con variables para soporte de temas visuales. Los botones de habilidades tecnicas se estructuraron bajo una cuadricula estricta donde cada elemento mantiene dimensiones identicas para preservar la simetria visual.
* Navegacion Inferior Interactiva: Se desarrollo una barra flotante en la parte inferior (dock) con enlaces a Perfil, Estudios, Proyectos, Habilidades y Contacto, la cual detecta la seccion visible mediante ScrollSpy y resalta la opcion correspondiente.

### 3.2 Fase 2: Integracion en Flutter (Mobile App Wrapper)

* Creacion del Proyecto: Se creo el proyecto bajo el paquete institucional com.upec con soporte enfocado en Android.
* Dependencias y Permisos: Se configuro webview_flutter en pubspec.yaml y se definio android:usesCleartextTraffic="true" en AndroidManifest.xml.
* Carga Offline: Se empleo la Opcion A (Assets locales) mediante la instruccion WebViewController()..loadFlutterAsset('assets/web/index.html'), eliminando la dependencia de servidores externos o conectividad a internet.
* Controles Nativos: La AppBar incluye acciones para navegar atras en el historial web, recargar la pagina, alternar el tema visual de forma sincronizada y desplegar un modal nativo para compartir datos.

---

## 4. Cuadro Comparativo: Nativo vs. Hibrido Embebido

| Criterio | Enfoque Nativo Puro (Android / Kotlin) | Enfoque Hibrido Embebido (Flutter + WebView) |
| :--- | :--- | :--- |
| Rendimiento | Maximo (60 a 120 FPS directos sobre la GPU del dispositivo). | Optimo para interfaces estructuradas de lectura y consulta. |
| Tiempos de Desarrollo | Mayor tiempo; requiere programar interfaces especificas. | Rapido; permite reutilizar codigo web preexistente al 100%. |
| Mantenimiento | Exige recompilar y distribuir un nuevo APK ante cambios visuales. | Desacoplado; los archivos web pueden actualizarse de forma modular. |
| Acceso a Hardware | Acceso directo a todas las APIs del sistema operativo. | Requiere puentes de comunicacion (JavaScriptChannel). |
| Conectividad | Segun la logica implementada. | 100% offline mediante assets locales sin consumo de datos. |

---

## 5. Conclusiones

1. La practica permitio comprobar la viabilidad y rapidez del enfoque hibrido embebido para proyectos informativos y hojas de vida, permitiendo que una misma base web sea distribuida como aplicacion movil formal.
2. La configuracion de assets locales garantiza autonomia operativa total, ofreciendo tiempos de carga instantaneos sin costos de hosting ni requerimientos de conexion activa.
3. El uso de controles nativos en la AppBar y canales de mensajeria bidireccional demuestra que es posible lograr una experiencia de usuario fluida e integrada entre el contenedor Flutter y el contenido web.

---

## 6. Bibliografia

* Flutter Documentation. (2024). WebViews in Flutter. https://docs.flutter.dev/
* Google Developers. (2024). Package webview_flutter. Pub.dev. https://pub.dev/packages/webview_flutter
* Mozilla Developer Network. (2024). Responsive Web Design & CSS Grid. MDN Web Docs. https://developer.mozilla.org/
