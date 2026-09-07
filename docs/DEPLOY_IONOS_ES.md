# Desplegar AI Graph Studio en IONOS

Para hosting web compartido convencional. No necesitas Node.js, npm, PHP, base de datos, Docker ni SSH. El código fuente y la versión desplegable son los mismos archivos estáticos.

## 1. Descargar y descomprimir

Descarga `ai-graph-studio.zip` y descomprímelo en tu ordenador. Abre la carpeta `ai-graph-studio`: contiene `index.html`, `assets`, `docs`, `examples` y los documentos del proyecto. No subas solo el ZIP esperando que el servidor lo descomprima.

Puedes abrir `START_HERE_ES.html` con doble clic. Las guías HTML se leen sin publicar. La aplicación debe abrirse mediante HTTP/HTTPS: el doble clic sobre `index.html` puede bloquear los módulos JavaScript.

## 2. Entrar en IONOS

Entra en tu cuenta y selecciona el contrato de hosting correspondiente. Los nombres de los menús pueden variar. Busca **Hosting / Espacio web** y **Dominios y SSL**. No instales WordPress ni utilices el constructor de webs.

## 3. Elegir dominio, subdominio o subcarpeta

Puedes usar un subdominio como `graphs.tudominio.es`, creándolo desde la gestión del dominio, o una subcarpeta como `tudominio.es/graphs/`.

Crea una carpeta vacía en tu espacio web, por ejemplo `ai-graph-studio`. No sobrescribas una web existente. Para un dominio o subdominio dedicado, conecta su destino web con esa carpeta utilizando la opción de asociar el dominio a un directorio del espacio web. No es una redirección a otra URL.

Para una subcarpeta, crea `graphs` dentro del directorio de tu web actual. En ese caso no cambies el destino del dominio.

## 4. Localizar el espacio web

Desde **Hosting**, abre **Utilizar espacio web / Webspace Explorer**. Navega hasta la carpeta elegida. Si tienes varios contratos, comprueba que sea el mismo que utiliza el dominio.

## 5. Subir los archivos

**SFTP:** utiliza las credenciales de transferencia facilitadas por IONOS en un cliente SFTP. Selecciona a la izquierda el contenido local de `ai-graph-studio` y a la derecha la carpeta de destino. Transfiere todos los archivos y carpetas conservando su estructura. Es la opción más cómoda para subir el conjunto.

**Webspace Explorer:** abre la carpeta de destino, pulsa **Subir / Upload**, selecciona los archivos y confirma. Si no permite subir carpetas completas, crea `assets/css`, `assets/js`, `docs`, `examples` y `tests`, y sube los archivos correspondientes a cada una. No necesitas terminal.

El mínimo funcional es `index.html`, `assets` y `docs` para las guías enlazadas. Recomendamos conservar también licencia y documentación. `tests` es opcional en producción.

## 6. Estructura correcta

Si el subdominio apunta a `/ai-graph-studio`, debe quedar:

```text
/ai-graph-studio/index.html
/ai-graph-studio/assets/css/style.css
/ai-graph-studio/assets/js/app.js
/ai-graph-studio/docs/USER_GUIDE_ES.html
```

Evita una carpeta adicional accidental como `/ai-graph-studio/ai-graph-studio/index.html`, salvo que hayas conectado el dominio a esa carpeta interior. El índice debe estar directamente en el directorio web seleccionado. Respeta las minúsculas.

## 7. Activar HTTPS

En **Dominios y SSL**, configura o selecciona el certificado para el dominio/subdominio. Espera a que esté activo y abre la dirección con `https://`.

Si usas Cloudflare, comprueba el certificado de origen y que no haya redirecciones circulares. El paquete no fuerza una redirección HTTPS porque la configuración del proxy puede variar. Puedes activarla desde el dominio/proxy después de verificar el certificado. Usa siempre la misma URL HTTPS para conservar el acceso a los proyectos locales.

## 8. El archivo `.htaccess`

Se incluye un `.htaccess` opcional con tipos MIME y cabeceras de protección. No contiene rutas de tu cuenta ni redirecciones. La aplicación no lo necesita para ejecutar su lógica.

Si aparece un **500** al subirlo, renombra temporalmente solo este archivo a `htaccess-disabled.txt`. Algunos planes restringen directivas Apache. La política de seguridad básica también está en `index.html`. No sustituyas el `.htaccess` de otra web: usa un directorio propio.

## 9. Probar la web

1. Abre la URL HTTPS y comprueba que aparece el editor en catalán.
2. Sigue los primeros pasos o pulsa Omitir; cambia a Español con el selector.
3. Abre la plantilla de investigación. Pulsa Analizar y Simular → Ejecutar simulación.
4. Guarda, recarga y abre el proyecto desde Proyectos locales.
5. Exporta JSON y vuelve a importarlo para comprobar que se conserva el grafo.
6. Exporta PNG y Markdown y comprueba las descargas.
7. Prueba los tres idiomas y los temas claro y oscuro.

Una ventana privada permite comprobar la experiencia de un visitante nuevo, pero no conviene usarla para guardar proyectos.

## 10. Resolver errores frecuentes

| Síntoma | Comprobación |
| --- | --- |
| 404 o web antigua | Destino del dominio, directorio e `index.html`. |
| Página vacía o sin estilos | Todos los archivos de `assets`, minúsculas y recarga completa. |
| Error MIME / JavaScript | El `.js` no debe devolver una página HTML de error. Revisa ruta y `.htaccess`. |
| 403 | Permisos de lectura e índice; habitualmente archivos 644 y carpetas 755 si puedes revisarlos. |
| 500 | Desactiva solo el `.htaccess` de esta aplicación y revisa las restricciones del plan. |
| Bucle de redirecciones | Configuración HTTPS de Cloudflare y de IONOS. |
| No puedo guardar | IndexedDB bloqueado, modo privado o falta de espacio. Exporta JSON inmediatamente. |
| Faltan proyectos | Navegador, perfil, dispositivo y dominio exactos, incluyendo HTTP/HTTPS y www. |
| Descarga en iPhone | Revisa Archivos → Descargas o el gestor de Safari. No cierres la pestaña de inmediato. |

## 11. Actualizar y volver atrás

Antes de actualizar, exporta los proyectos importantes a JSON y guarda una copia de los archivos actuales de la web. Sube la versión nueva completa; no mezcles módulos de versiones distintas. Conserva dominio, protocolo y perfil del navegador. Vacía la caché de Cloudflare, si la utilizas. Para volver atrás, restaura la copia completa de la versión anterior.

## 12. Copias de seguridad y datos locales

**Reemplazar archivos web no elimina por sí mismo los proyectos locales.** El hosting guarda la aplicación; cada visitante guarda sus grafos en IndexedDB en su propio navegador. Los grafos no están en IONOS y no puedes copiarlos desde el servidor.

Exporta los proyectos importantes a JSON y guarda esos archivos en una ubicación tuya de confianza. Para cambiar de dispositivo o dominio, impórtalos. Borrar los datos del navegador, perder el dispositivo, usar modo privado o la expulsión de almacenamiento puede borrar la copia local. No existe sincronización entre dispositivos ni recuperación de cuenta.

## Referencias oficiales

Consultadas el 6 de septiembre de 2026; los menús concretos pueden variar.

- [Subir archivos](https://www.ionos.com/help/hosting/managing-webspace-with-webspace-explorer/uploading-a-file-using-webspace-explorer/)
- [Localizar el espacio web](https://www.ionos.com/help/hosting/using-php-for-web-projects/determining-the-absolute-path-document-root-of-your-webspace/)
- [Configurar SSL](https://www.ionos.com/help/ssl-certificates/setting-up-ssl-certificates-managed-by-11-ionos/setting-up-an-ssl-certificate-managed-by-11-ionos-ssl-starter-ssl-starter-advanced-ssl-starter-wildcard/)
