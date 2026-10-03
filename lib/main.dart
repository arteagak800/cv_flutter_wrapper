import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CVFlutterWrapperApp());
}

class CVFlutterWrapperApp extends StatefulWidget {
  const CVFlutterWrapperApp({super.key});

  @override
  State<CVFlutterWrapperApp> createState() => _CVFlutterWrapperAppState();
}

class _CVFlutterWrapperAppState extends State<CVFlutterWrapperApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void _toggleNativeTheme() {
    setState(() {
      _themeMode =
          _themeMode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CV Wrapper - Kevin Arteaga',
      debugShowCheckedModeBanner: false,
      themeMode: _themeMode,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2E333C),
          brightness: Brightness.light,
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E3A8A),
          brightness: Brightness.dark,
        ),
      ),
      home: HomeScreen(
        onToggleTheme: _toggleNativeTheme,
        isDark: _themeMode == ThemeMode.dark,
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  final VoidCallback onToggleTheme;
  final bool isDark;

  const HomeScreen({
    super.key,
    required this.onToggleTheme,
    required this.isDark,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final WebViewController _controller;
  int _loadingProgress = 0;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _initWebView();
  }

  void _initWebView() {
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            if (mounted) {
              setState(() {
                _loadingProgress = progress;
              });
            }
          },
          onPageStarted: (String url) {
            if (mounted) {
              setState(() {
                _isLoading = true;
              });
            }
          },
          onPageFinished: (String url) {
            if (mounted) {
              setState(() {
                _isLoading = false;
              });
            }
          },
          onWebResourceError: (WebResourceError error) {
            debugPrint('Error de carga web: ${error.description}');
          },
        ),
      )
      // Comunicación bidireccional (JavaScript -> Flutter Nativo)
      ..addJavaScriptChannel(
        'FlutterChannel',
        onMessageReceived: (JavaScriptMessage message) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Row(
                children: [
                  const Icon(Icons.info_outline, color: Colors.white, size: 20),
                  const SizedBox(width: 8),
                  Expanded(child: Text(message.message)),
                ],
              ),
              backgroundColor: const Color(0xFF1E232A),
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              duration: const Duration(seconds: 3),
            ),
          );
        },
      )
      // CARGA DE CONTENIDO LOCAL OFFLINE DESDE ASSETS/WEB/ (FASE 2 - OPCIÓN A)
      ..loadFlutterAsset('assets/web/index.html');
  }

  // Sincronizar cambio de tema con la página web
  void _syncTheme() {
    widget.onToggleTheme();
    _controller.runJavaScript("document.getElementById('themeToggleBtn').click();");
  }

  // Diálogo nativo para compartir perfil
  void _shareProfile() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade400,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Compartir Hoja de Vida',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              const Text(
                'Kevin Daniel Arteaga Gallegos\nEstudiante de Computación - UPEC',
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 16),
              ListTile(
                leading: const Icon(Icons.copy),
                title: const Text('Copiar enlace del perfil'),
                subtitle: const Text('https://github.com/kevin-arteaga'),
                onTap: () {
                  Clipboard.setData(const ClipboardData(
                      text: 'https://github.com/kevin-arteaga'));
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Enlace copiado al portapapeles'),
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                },
              ),
              ListTile(
                leading: const Icon(Icons.email_outlined),
                title: const Text('Compartir por Correo'),
                subtitle: const Text('kevin.arteaga@upec.edu.ec'),
                onTap: () {
                  Clipboard.setData(const ClipboardData(
                      text: 'kevin.arteaga@upec.edu.ec'));
                  Navigator.pop(ctx);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Correo copiado al portapapeles'),
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF2E333C),
        foregroundColor: Colors.white,
        elevation: 2,
        title: const Row(
          children: [
            Icon(Icons.phone_android, size: 20),
            SizedBox(width: 8),
            Text(
              'CV Embed Wrapper',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        actions: [
          // Control nativo: Retroceder historial web
          IconButton(
            tooltip: 'Atrás',
            icon: const Icon(Icons.arrow_back_ios_new, size: 18),
            onPressed: () async {
              if (await _controller.canGoBack()) {
                await _controller.goBack();
              }
            },
          ),
          // Control nativo: Recargar página
          IconButton(
            tooltip: 'Recargar',
            icon: const Icon(Icons.refresh),
            onPressed: () => _controller.reload(),
          ),
          // Control nativo: Alternar tema (Claro/Oscuro)
          IconButton(
            tooltip: widget.isDark ? 'Modo Claro' : 'Modo Oscuro',
            icon: Icon(widget.isDark ? Icons.light_mode : Icons.dark_mode),
            onPressed: _syncTheme,
          ),
          // Control nativo: Compartir
          IconButton(
            tooltip: 'Compartir',
            icon: const Icon(Icons.share_outlined),
            onPressed: _shareProfile,
          ),
        ],
      ),
      body: Stack(
        children: [
          // Componente híbrido: WebView embebido nativo
          WebViewWidget(controller: _controller),

          // Barra de progreso nativa durante la carga
          if (_isLoading)
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: LinearProgressIndicator(
                value: _loadingProgress / 100.0,
                backgroundColor: Colors.transparent,
                valueColor: const AlwaysStoppedAnimation<Color>(
                  Color(0xFF3B82F6),
                ),
                minHeight: 4,
              ),
            ),
        ],
      ),
    );
  }
}
