# Desplegar AI Graph Studio a IONOS

Aquesta guia és per a hosting web compartit convencional. No cal Node.js, npm, PHP, base de dades, Docker ni SSH. El codi font i la versió desplegable són els mateixos fitxers estàtics.

## 1. Descarrega i descomprimeix

Descarrega `ai-graph-studio.zip` i descomprimeix-lo al teu ordinador. A dins hi ha la carpeta `ai-graph-studio`. Obre-la: hi trobaràs `index.html`, `assets`, `docs`, `examples` i els documents del projecte. No pugis el ZIP esperant que el servidor el descomprimeixi automàticament.

Pots llegir primer `START_HERE_CA.html` amb doble clic. Les guies HTML es poden llegir sense publicar. L’aplicació, en canvi, s’ha d’obrir per HTTP/HTTPS: obrir `index.html` amb doble clic pot bloquejar els mòduls JavaScript.

## 2. Entra a IONOS

Entra al teu compte i selecciona el contracte de hosting on vols publicar l’eina. Els noms exactes dels menús varien amb l’idioma i el contracte. Busca les àrees **Hosting / Espai web** i **Dominis i SSL**. No necessites instal·lar WordPress ni utilitzar el constructor de webs.

## 3. Tria domini, subdomini o subcarpeta

Una opció clara és un subdomini com `graphs.elteudomini.cat`. Si encara no existeix, crea’l des de la gestió del teu domini. També pots utilitzar una subcarpeta, com `elteudomini.cat/graphs/`.

Al teu espai web, crea una carpeta buida, per exemple `ai-graph-studio`. No sobreescriguis la carpeta d’una web existent. Si utilitzes un domini o subdomini dedicat, associa la seva destinació web a aquesta carpeta mitjançant l’opció de connectar el domini amb un directori de l’espai web. Això és diferent de redirigir-lo a una altra URL.

Si utilitzes una subcarpeta de la web actual, crea `graphs` dins de la carpeta que ja serveix aquella web. En aquest cas, no canviïs la destinació del domini.

## 4. Localitza l’espai web

A **Hosting**, obre **Utilitzar espai web / Webspace Explorer**. Navega fins a la carpeta que has triat. Si tens diversos contractes, comprova que sigui el mateix que utilitza el domini.

## 5. Puja els fitxers

Opció A — **SFTP**: utilitza les dades SFTP facilitades per IONOS en un client de transferència. A l’esquerra selecciona els fitxers locals de dins de `ai-graph-studio`; a la dreta, la carpeta de destinació. Transfereix tots els fitxers i carpetes, conservant-ne l’estructura. SFTP facilita pujar tota la carpeta d’una vegada.

Opció B — **Webspace Explorer**: obre la carpeta de destinació, prem **Pujar / Upload**, selecciona els fitxers i confirma la pujada. Si la interfície no permet pujar carpetes completes, crea les carpetes `assets/css`, `assets/js`, `docs`, `examples` i `tests`, i puja els fitxers al lloc corresponent. No cal fer servir un terminal.

Es pot publicar només `index.html`, `assets` i `docs`; les guies enllaçades necessiten `docs`. Recomanem conservar també la llicència i la resta de documents. `tests` és opcional en producció; serveix per repetir les proves.

## 6. Comprova l’estructura

Si has associat el subdomini a `/ai-graph-studio`, ha de quedar així:

```text
/ai-graph-studio/index.html
/ai-graph-studio/assets/css/style.css
/ai-graph-studio/assets/js/app.js
/ai-graph-studio/docs/USER_GUIDE_CA.html
```

No ha de quedar accidentalment `/ai-graph-studio/ai-graph-studio/index.html`, llevat que també hagis associat el domini a aquesta carpeta interior. `index.html` ha d’estar directament dins de la destinació web. Respecta minúscules i noms dels fitxers.

## 7. Activa HTTPS

A **Dominis i SSL**, selecciona o configura un certificat per al domini/subdomini i espera que estigui actiu. Obre després `https://` seguit del teu domini. No introdueixis credencials ni claus a l’aplicació.

Si utilitzes Cloudflare, verifica que el certificat d’origen sigui vàlid i que la configuració HTTPS no generi redireccions circulars. No s’inclou una redirecció HTTPS obligatòria al paquet perquè la configuració del proxy i del hosting pot variar. Pots activar-la a la configuració del domini/proxy després de comprovar el certificat. Fes servir sempre la mateixa adreça HTTPS per conservar l’accés als projectes locals.

## 8. Sobre `.htaccess`

El paquet inclou un `.htaccess` opcional amb tipus MIME i capçaleres de protecció. No és necessari per al funcionament de la lògica de l’aplicació. No conté cap ruta específica del teu compte ni cap redirecció de domini.

Si IONOS retorna **500** just després de pujar-lo, canvia temporalment el seu nom a `htaccess-disabled.txt` i torna a provar. Alguns plans restringeixen directives Apache. La política de seguretat bàsica també figura a `index.html`. No eliminis un `.htaccess` d’una altra web: utilitza una carpeta pròpia.

## 9. Prova la web

1. Obre la URL HTTPS i comprova que apareix l’editor en català.
2. Recorre els primers passos o prem Ometre.
3. Obre la plantilla de recerca. Prem Analitzar i després Simular → Executar simulació.
4. Prem Desar. Recarrega i comprova que pots recuperar el projecte a Projectes locals.
5. Exporta JSON. Importa aquest JSON i comprova que el graph es conserva.
6. Exporta PNG i Markdown per comprovar les descàrregues.
7. Canvia a castellà i anglès; prova també el tema fosc.

Una pestanya privada és útil per veure l’experiència d’un visitant nou, però no és adequada per conservar projectes.

## 10. Problemes habituals

| Símptoma | Què has de comprovar |
| --- | --- |
| 404 o web antiga | Destinació del domini, carpeta exacta i presència d’`index.html`. |
| Pàgina buida o sense estils | S’han pujat tots els fitxers d’`assets`? Els noms respecten les minúscules? Prova una recàrrega completa. |
| Error de tipus MIME / JavaScript | Un fitxer `.js` no ha de respondre amb una pàgina HTML d’error. Revisa la ruta i el `.htaccess`. |
| 403 | Permisos de lectura del hosting i fitxer índex. En general fitxers 644 i carpetes 755, si el gestor permet revisar-ho. |
| 500 | Desactiva només el `.htaccess` d’aquesta aplicació i consulta les restriccions del pla. |
| Bucle de redireccions | Revisa HTTPS entre Cloudflare i IONOS. No afegeixis diverses redireccions incompatibles. |
| No puc desar | El navegador pot bloquejar IndexedDB, estar en mode privat o sense espai. Exporta JSON immediatament. |
| No veig els meus projectes | Comprova navegador, perfil, dispositiu i domini exactes, incloent HTTP/HTTPS i www. |
| No es descarrega un fitxer a iPhone | Revisa Fitxers → Descàrregues o el gestor de descàrregues de Safari. No tanquis la pestanya immediatament. |

## 11. Actualitzacions

Abans d’actualitzar, exporta els projectes importants a JSON i conserva una còpia dels fitxers de la web actual. Puja tots els fitxers de la nova versió junts; no barregis mòduls de versions diferents. Mantén el mateix domini, protocol i perfil del navegador. Si utilitzes una memòria cau de Cloudflare, buida-la després de la pujada. Si cal tornar enrere, restaura la còpia completa de la versió anterior.

## 12. Còpies de seguretat i privacitat

**Substituir els fitxers de la web no és el mateix que eliminar els projectes locals.** Els fitxers del hosting contenen l’aplicació; els graphs es desen en IndexedDB al navegador de cada visitant. No es desen al teu IONOS. No pots fer còpia dels projectes dels visitants des del servidor.

Exporta cada projecte important a JSON i desa’l en una ubicació teva de confiança. Canviar d’ordinador o domini requereix importar-lo. Esborrar dades del navegador, perdre el dispositiu, el mode privat o l’evicció d’emmagatzematge poden fer perdre la còpia local. No hi ha sincronització entre dispositius ni recuperació de compte.

## Referències oficials

Consultades el 6 de setembre de 2026; la interfície concreta pot variar.

- [Pujar fitxers amb Webspace Explorer](https://www.ionos.com/help/hosting/managing-webspace-with-webspace-explorer/uploading-a-file-using-webspace-explorer/)
- [Localitzar l’espai web](https://www.ionos.com/help/hosting/using-php-for-web-projects/determining-the-absolute-path-document-root-of-your-webspace/)
- [Configurar un certificat SSL](https://www.ionos.com/help/ssl-certificates/setting-up-ssl-certificates-managed-by-11-ionos/setting-up-an-ssl-certificate-managed-by-11-ionos-ssl-starter-ssl-starter-advanced-ssl-starter-wildcard/)
