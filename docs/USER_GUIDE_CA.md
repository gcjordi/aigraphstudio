# Guia d’ús d’AI Graph Studio

## 1. Què fa i què no fa

AI Graph Studio permet dibuixar arquitectures d’IA, documentar els passos, estimar tokens i costos, trobar possibles problemes i simular recorreguts. Funciona al navegador, sense API d’IA, claus ni compte. No executa models, eines, prompts ni el contingut dels nodes Codi. Un graph exportat no és un agent executable.

La filosofia és utilitzar la mínima intel·ligència computacional necessària per resoldre correctament la tasca. No és una prohibició d’utilitzar models potents: cal comparar qualitat, cost, temps i risc en el context real.

## 2. Entendre Prompt → Agent → Loop → Graph

- **Prompt:** instruccions, exemples, context i format esperat. Per si sol no representa una crida: connecta’l a un LLM o agent.
- **LLM:** una operació basada en un model. Aquí configures tokens i model.
- **Agent:** component que decideix passos i eines per assolir un objectiu. Les crides internes no es poden endevinar: dibuixa-les o reflecteix-les a Execucions base esperades.
- **Loop:** repetició limitada d’un conjunt de passos, amb condició de sortida.
- **Graph:** mapa de nodes i connexions que defineix les dependències, les decisions i el resultat.

Un agent no sempre és necessari. Si coneixes tots els passos per endavant, un workflow fix pot ser més fàcil de provar i mantenir.

## 3. Primer contacte

Obre la web. L’exemple de recerca ja apareix al canvas. A dalt tens els projectes, Desar, els exports, idioma i tema. A l’esquerra hi ha els 18 nodes; al centre, el graph; a la dreta, les propietats. Al mòbil, Nodes desplega la paleta i les propietats apareixen sota el canvas.

Els modes són Editor, Analitzar, Simular, Plantilles i Aprendre. A Aprendre pots consultar què significa cada node, quan utilitzar-lo, quan evitar-lo, un exemple i errors habituals. Pots tornar a obrir els primers passos.

## 4. Crea el primer projecte

1. Prem **Nou projecte** i escriu `Recerca sobre un tema`.
2. Afegeix **Inici**, **Entrada**, cinc nodes **Model de llenguatge**, **Avaluador** i **Sortida**.
3. Selecciona els cinc models i posa’ls aquests noms: Planificador, Recerca, Raonament, Redactor i Correcció. Per al primer flux, pots deixar Correcció desconnectat o afegir-lo més endavant; l’analitzador t’avisarà mentre estigui desconnectat.
4. A Entrada descriu l’objectiu: «Investigar un tema i preparar un informe amb fonts, conclusions i limitacions». Afegeix públic, llengua, extensió i criteris d’acceptació.
5. A cada tasca descriu què rep i què ha de lliurar. No hi introdueixis claus, contrasenyes o dades personals reals per fer proves.

Per anar més de pressa, carrega **Recerca i informe amb IA** a Plantilles: ja conté una versió millorada del mateix exercici.

## 5. Connecta sense haver d’arrossegar

Selecciona un node. Al final del panell dret trobaràs **Origen**, **Destinació**, **Etiqueta** i **Connectar**. Tria cada parella i prem Connectar. També pots prémer el port blau d’un node i després el node de destinació. Esc cancel·la aquesta operació.

Per al flux bàsic, connecta:

```text
Inici → Entrada → Planificador → Recerca → Raonament → Redactor → Avaluador → Sortida
```

Les fletxes indiquen direcció. Prem una connexió per editar-ne l’etiqueta o eliminar-la. Utilitza PASS/FAIL per als avaluadors; TRUE/FALSE, YES/NO o etiquetes pròpies per als routers. No es permeten autoreferències d’un sol node: els cicles s’expressen amb dos o més nodes.

## 6. Mou, organitza i corregeix

Arrossega un node per moure’l. Arrossega el fons per desplaçar la vista; la roda també desplaça. Ctrl/⌘ + roda fa zoom, i els botons +/− ofereixen una alternativa. Ajustar a pantalla mostra el graph complet. Ordenar nodes aplica una disposició automàtica per profunditat.

Majúscules + clic selecciona diversos nodes. Pots duplicar-los, eliminar-los o moure’ls junts. Les connexions entre nodes duplicats també es copien. Les fletxes del teclat mouen la selecció 10 píxels; amb Majúscules, 50. També pots editar X i Y al panell.

| Drecera | Acció |
| --- | --- |
| Ctrl/⌘ + S | Desar localment |
| Ctrl/⌘ + Z | Desfer |
| Ctrl/⌘ + Majúscules + Z o Ctrl/⌘ + Y | Refer |
| Ctrl/⌘ + D | Duplicar nodes seleccionats |
| Ctrl/⌘ + A, fora d’un camp | Seleccionar tots els nodes |
| Supr / Retrocés, fora d’un camp | Eliminar selecció o connexió |
| Esc | Cancel·lar connexió i buidar selecció |

Hi ha fins a 60 estats de desfer en memòria. No es conserven en reobrir el projecte.

## 7. Configura models i tokens

Selecciona Planificador. Tria proveïdor, escriu el model que vulguis i selecciona classe **Ràpid / econòmic**. Els noms dels models són lliures. Configura tokens d’entrada i sortida **per execució**. Per exemple, 1.500 d’entrada i 450 de sortida són una hipòtesi, no una mesura.

Execucions base esperades multiplica el consum d’aquell node. Un valor de 3 pot representar tres crides internes d’un agent; si ja has dibuixat aquestes crides com a nodes separats, no les tornis a comptar. La latència en mil·lisegons i la classe de latència són informació manual de planificació, no un cronòmetre ni un SLA.

Prompt, Eina, Codi, Memòria i els controls no consumeixen tokens d’LLM per defecte. Avaluador, Protecció i RAG tenen una casella **Utilitza un model** per activar-ne l’estimació quan correspongui. Un RAG determinista pot no consumir tokens de model; si utilitza embeddings, activa la casella i selecciona la classe corresponent.

## 8. Millora la recerca amb paral·lelisme

Substitueix Recerca per:

```text
Divisió paral·lela → Recerca A / Recerca B / Recerca C → Unió
```

Crea tres branques, cadascuna amb una pregunta o font independent. Connecta-les totes a Unió i després a Raonament. El paral·lelisme pot reduir el temps d’espera, però no redueix automàticament els tokens. No el facis servir si una branca necessita el resultat de l’altra o comparteixen estat mutable sense coordinació.

## 9. Reserva el model potent per al raonament

A Raonament selecciona **Raonament capdavanter**, un nivell alt i el model que vulguis estimar. Mantén Planificador, Redactor i Correcció en models més econòmics si compleixen els requisits.

Per donar format a una taula, ordenar resultats o validar un esquema, afegeix Codi determinista. L’analitzador pot suggerir aquesta substitució a partir del nom, la descripció o la casella Tasca potencialment determinista. La recomanació s’ha de revisar: no comprèn la semàntica real de la tasca.

## 10. Configura el circuit de verificació

Fes aquestes connexions:

```text
Avaluador → PASS → Sortida
Avaluador → FAIL → Bucle → Correcció → Avaluador
```

A Bucle, descriu condició de repetició `FAIL`, condició de sortida `PASS`, visites esperades 2 i màxim 3. El límit s’interpreta com a **màxim de visites de cada node dins del component cíclic**, inclosa l’avaluació inicial. No significa «tres correccions addicionals».

A Avaluador, configura una fallada abans de PASS. El simulador farà una correcció i després passarà. Si falla més vegades del que permet el cicle, s’aturarà i ho indicarà. L’assoliment del límit no es converteix en un PASS artificial.

Dibuixa sempre el retorn explícit. Un Loop sol no sap quins nodes vols repetir. Si diversos loops imbricats formen un únic component cíclic, l’estimador utilitza el producte dels límits com a aproximació conservadora i mostra un avís; no és una semàntica completa de loops imbricats.

## 11. Llegeix l’anàlisi

Prem Analitzar. Hi trobaràs eficiència, fiabilitat, complexitat, dependències, profunditat, crides, tokens, costos i avisos.

- **Crític:** estructura o control que pot impedir un recorregut segur o limitat.
- **Avís:** punt que necessita revisió.
- **Optimització:** possible millora contextual.
- **Bona pràctica:** patró explícit que convé verificar.

Cada avís explica què passa, per què importa i què es recomana. Una puntuació alta no certifica qualitat, seguretat ni correcció. Les dependències són proporcions de nodes, no de temps. La profunditat condensa cada cicle en un bloc. El nombre de crides inclou les execucions estimades de nodes que utilitzen models.

L’estimador suma totes les branques, fins i tot les alternatives d’un Router, i tots els nodes del projecte, inclosos els desconnectats. És un escenari conservador de disseny, no una esperança probabilística. El simulador, en canvi, compta el recorregut triat. Per això els totals poden diferir.

## 12. Pressupost i costos

Prem Esc per buidar la selecció i veure la configuració del projecte. Defineix pressupost esperat i màxim de tokens. Zero vol dir sense pressupost. Menys del 80% queda dins del pressupost; entre el 80% i el 100%, a prop; més del 100%, superat.

A **Catàleg de preus**, introdueix proveïdor, model, preu d’entrada i de sortida per milió de tokens. Tots han d’estar en la mateixa moneda. Els noms han de coincidir amb els del node. També pots activar Preus propis d’aquest node.

Els models d’exemple tenen preus zero. **Zero no vol dir que siguin gratuïts: el cost no està configurat.** No es descarreguen preus d’Internet. No s’inclouen impostos, eines externes, infraestructura, memòria cau, paquets de descompte ni treball humà.

Fórmula: cost = (tokens entrada × preu entrada + tokens sortida × preu sortida) / 1.000.000. Un cicle sense límit pot tenir pitjor cas indeterminat. El límit global atura el simulador, però no es fa servir per presentar com a finit el pressupost d’un loop sense límit propi.

## 13. Simula

A Simular, selecciona un router per posar exactament l’etiqueta de la branca triada; si queda buida, s’utilitza la primera. A l’avaluador, posa el nombre de fallades abans de PASS. Les condicions escrites són documentació, no expressions executables.

Prem Pas següent per avançar una visita o Executar simulació per mostrar el recorregut complet. La miniatura destaca el node actual. Les branques paral·leles comparteixen ronda; Unió espera les branques activades que hi poden arribar. Les estructures amb dependències ambigües poden aturar-se en lloc d’inventar una execució.

Loop/Retry amb dues sortides utilitza REPEAT/FAIL/TRUE/YES per repetir i EXIT/PASS/FALSE/NO per sortir. Amb una sortida, segueix la connexió i el límit del cicle. Human Approval i Guardrail amb diverses sortides segueixen l’etiqueta configurada; no hi ha una persona ni un control real durant la simulació.

El resum inclou visites, crides, rondes, tokens i cost del recorregut. El pitjor cas és el de l’arquitectura completa. Hi ha un màxim de seguretat de 10.000 passos encara que el límit global estigui a zero.

## 14. Desa i comparteix

Desar conserva el projecte en aquest navegador. Projectes locals permet obrir, duplicar o eliminar còpies. Duplicar a la barra superior crea un projecte independent amb un identificador nou. Importar JSON crea també una còpia nova; no sobreescriu silenciosament un projecte existent.

| Export | Utilitat |
| --- | --- |
| JSON | Còpia editable completa: nodes, connexions, propietats, pressupost i catàleg. |
| SVG | Diagrama vectorial; conserva qualitat en ampliar. |
| PNG | Imatge per correus, diapositives o xarxes. Màxim 8.192 px per costat i 16 megapíxels; graphs grans es redueixen. |
| Mermaid | Diagrama textual; no és codi executable d’agents. |
| Markdown | Documentació amb nodes, models, connexions, estimacions i avisos en l’idioma seleccionat. |
| HTML imprimible / PDF | Descarrega un HTML, obre’l al navegador i utilitza Imprimir → Desar com a PDF. |

Les imatges retallen noms molt llargs per mantenir la llegibilitat; JSON i documentació conserven els textos complets. L’HTML imprimible presenta la documentació com a text estructurat segur, sense executar HTML introduït als nodes.

Els projectes locals no estan xifrats per l’aplicació ni se sincronitzen. Exporta JSON periòdicament. Límits V1: 500 nodes, 2.000 connexions, 5 MB per projecte. No hi ha col·laboració simultània, autoexecució d’agents ni exportadors executables de LangGraph/n8n.
