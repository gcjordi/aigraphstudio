export const LANGS=['ca','es','en'];
export let lang='ca';
export function setLang(v){lang=LANGS.includes(v)?v:'ca';document.documentElement.lang=lang;}
export const tr=(a)=>Array.isArray(a)?a[LANGS.indexOf(lang)]:a;
export const messages={};
export function t(k){return tr(messages[k]||k);}
const rows=`
new|Nou projecte|Nuevo proyecto|New project
save|Desar|Guardar|Save
duplicate|Duplicar|Duplicar|Duplicate
remove|Eliminar|Eliminar|Delete
rename|Canviar el nom|Cambiar nombre|Rename
projects|Projectes locals|Proyectos locales|Local projects
export|Exportar|Exportar|Export
import|Importar JSON|Importar JSON|Import JSON
edit|Editor|Editor|Editor
analyze|Analitzar|Analizar|Analyze
simulate|Simular|Simular|Simulate
learn|Aprendre|Aprender|Learn
templates|Plantilles|Plantillas|Templates
properties|Propietats|Propiedades|Properties
nodes|Nodes|Nodos|Nodes
edges|Connexions|Conexiones|Connections
add|Afegir|Añadir|Add
connect|Connectar|Conectar|Connect
from|Origen|Origen|Source
to|Destinació|Destino|Target
label|Etiqueta|Etiqueta|Label
name|Nom|Nombre|Name
description|Descripció|Descripción|Description
notes|Notes|Notas|Notes
type|Tipus|Tipo|Type
provider|Proveïdor|Proveedor|Provider
model|Model|Modelo|Model
modelClass|Classe de model|Clase de modelo|Model class
reasoning|Nivell de raonament|Nivel de razonamiento|Reasoning level
inputTokens|Tokens d’entrada per execució|Tokens de entrada por ejecución|Input tokens per execution
outputTokens|Tokens de sortida per execució|Tokens de salida por ejecución|Output tokens per execution
executions|Execucions base esperades|Ejecuciones base esperadas|Expected base executions
latency|Latència estimada (ms)|Latencia estimada (ms)|Estimated latency (ms)
latencyClass|Classe de latència|Clase de latencia|Latency class
maxIterations|Màxim de visites per node al cicle (0 = sense límit)|Máximo de visitas por nodo en el ciclo (0 = sin límite)|Maximum visits per node in cycle (0 = unbounded)
estimatedIterations|Visites esperades per node al cicle|Visitas esperadas por nodo en el ciclo|Expected visits per node in cycle
condition|Condició de repetició|Condición de repetición|Repeat condition
exitCondition|Condició de sortida|Condición de salida|Exit condition
sensitive|Tracta dades sensibles|Trata datos sensibles|Handles sensitive data
important|Sortida important|Salida importante|Important output
external|Eina externa amb risc de fallada|Herramienta externa con riesgo de fallo|External tool with failure risk
deterministic|Tasca potencialment determinista|Tarea potencialmente determinista|Potentially deterministic task
contextKey|Identificador del context compartit|Identificador del contexto compartido|Shared context identifier
expectedBudget|Pressupost esperat de tokens (0 = cap)|Presupuesto esperado de tokens (0 = ninguno)|Expected token budget (0 = none)
maxBudget|Pressupost màxim de tokens (0 = cap)|Presupuesto máximo de tokens (0 = ninguno)|Maximum token budget (0 = none)
maxSteps|Límit global de passos (0 = cap)|Límite global de pasos (0 = ninguno)|Global step limit (0 = none)
catalog|Catàleg de preus|Catálogo de precios|Price catalog
inputPrice|Preu entrada / 1 M tokens|Precio entrada / 1 M tokens|Input price / 1M tokens
outputPrice|Preu sortida / 1 M tokens|Precio salida / 1 M tokens|Output price / 1M tokens
currency|Moneda (etiqueta)|Moneda (etiqueta)|Currency (label)
pricesNote|Preus manuals. Zero vol dir sense cost configurat; no significa servei gratuït. Tots els preus han d’utilitzar la mateixa moneda.|Precios manuales. Cero significa sin coste configurado; no significa servicio gratuito. Todos los precios deben usar la misma moneda.|Manual prices. Zero means no cost configured, not a free service. All prices must use the same currency.
undo|Desfer|Deshacer|Undo
redo|Refer|Rehacer|Redo
fit|Ajustar a pantalla|Ajustar a pantalla|Fit to screen
layout|Ordenar nodes|Ordenar nodos|Arrange nodes
zoomIn|Apropar|Acercar|Zoom in
zoomOut|Allunyar|Alejar|Zoom out
selectHint|Selecciona un node per editar-lo. Majúscules + clic: selecció múltiple. Arrossega el fons per desplaçar-te.|Selecciona un nodo para editarlo. Mayús + clic: selección múltiple. Arrastra el fondo para desplazarte.|Select a node to edit it. Shift + click: multi-select. Drag the background to pan.
connectHint|Selecciona origen i destinació i prem Connectar. També pots prémer el port de sortida i després un altre node.|Selecciona origen y destino y pulsa Conectar. También puedes pulsar el puerto de salida y después otro nodo.|Select source and target and press Connect. You can also click an output port and then another node.
local|Només en aquest navegador · sense API d’IA|Solo en este navegador · sin API de IA|Only in this browser · no AI API
saved|Desat localment|Guardado localmente|Saved locally
unsaved|Canvis sense desar|Cambios sin guardar|Unsaved changes
storageError|No s’ha pogut desar. Exporta JSON per no perdre els canvis; comprova l’espai i els permisos del navegador.|No se ha podido guardar. Exporta JSON para no perder los cambios; comprueba el espacio y los permisos del navegador.|Could not save. Export JSON to preserve changes; check browser storage space and permissions.
invalid|Projecte invàlid o incompatible. Revisa el format, els límits i les connexions del JSON.|Proyecto inválido o incompatible. Revisa formato, límites y conexiones del JSON.|Invalid or incompatible project. Check JSON format, limits and connections.
error|No s’ha pogut completar l’acció.|No se ha podido completar la acción.|The action could not be completed.
confirmDelete|Vols eliminar aquest element? Aquesta acció elimina la còpia local.|¿Quieres eliminar este elemento? Esta acción elimina la copia local.|Delete this item? This removes the local copy.
discard|Hi ha canvis sense desar. Vols descartar-los?|Hay cambios sin guardar. ¿Quieres descartarlos?|Unsaved changes. Discard them?
close|Tancar|Cerrar|Close
cancel|Cancel·lar|Cancelar|Cancel
apply|Aplicar|Aplicar|Apply
load|Obrir|Abrir|Open
empty|Encara no hi ha elements.|Todavía no hay elementos.|No items yet.
light|Clar|Claro|Light
dark|Fosc|Oscuro|Dark
system|Sistema|Sistema|System
heuristic|Estimacions heurístiques d’arquitectura, no mesures de qualitat real. Es compten totes les branques com a escenari conservador; no s’infereixen probabilitats ni semàntica dels prompts.|Estimaciones heurísticas de arquitectura, no medidas de calidad real. Se cuentan todas las ramas como escenario conservador; no se infieren probabilidades ni semántica de prompts.|Architectural heuristics, not measurements of actual quality. All branches are counted conservatively; prompt semantics and probabilities are not inferred.
efficiency|Eficiència|Eficiencia|Efficiency
reliability|Fiabilitat|Fiabilidad|Reliability
complexity|Complexitat (més alt = més complex)|Complejidad (más alto = más complejo)|Complexity (higher = more complex)
llmDependency|Dependència d’LLM|Dependencia de LLM|LLM dependency
humanDependency|Dependència humana|Dependencia humana|Human dependency
frontierDependency|Dependència de models capdavanters|Dependencia de modelos frontera|Frontier model dependency
llmCalls|Crides d’LLM|Llamadas LLM|LLM calls
agents|Agents|Agentes|Agents
loops|Cicles / loops|Ciclos / loops|Cycles / loops
evaluators|Avaluadors|Evaluadores|Evaluators
guardrails|Proteccions|Protecciones|Guardrails
parallelBranches|Branques paral·leles|Ramas paralelas|Parallel branches
depth|Profunditat (cicles condensats)|Profundidad (ciclos condensados)|Depth (condensed cycles)
expectedExecutions|Execucions estimades|Ejecuciones estimadas|Estimated executions
inputTotal|Tokens d’entrada estimats|Tokens de entrada estimados|Estimated input tokens
outputTotal|Tokens de sortida estimats|Tokens de salida estimados|Estimated output tokens
tokens|Tokens totals estimats|Tokens totales estimados|Estimated total tokens
worstTokens|Tokens del pitjor cas|Tokens del peor caso|Worst-case tokens
loopTokens|Consum esperat dins de cicles|Consumo esperado dentro de ciclos|Expected consumption inside cycles
cost|Cost estimat|Coste estimado|Estimated cost
worstCost|Cost del pitjor cas|Coste del peor caso|Worst-case cost
unbounded|Indeterminat / sense límit|Indeterminado / sin límite|Unknown / unbounded
within|Dins del pressupost|Dentro del presupuesto|Within budget
near|A prop del pressupost|Cerca del presupuesto|Close to budget
over|Pressupost superat|Presupuesto superado|Over budget
noBudget|Sense pressupost configurat|Sin presupuesto configurado|No budget configured
critical|Crític|Crítico|Critical
warning|Avís|Aviso|Warning
optimization|Optimització|Optimización|Optimization
good|Bona pràctica|Buena práctica|Good practice
what|Què passa|Qué ocurre|What
why|Per què importa|Por qué importa|Why
recommendation|Recomanació|Recomendación|Recommendation
run|Executar simulació|Ejecutar simulación|Run simulation
step|Pas següent|Paso siguiente|Next step
reset|Reiniciar|Reiniciar|Reset
simNote|Simulació estructural. No s’executen models, eines ni codi. Els routers segueixen la branca configurada; els avaluadors fallen el nombre indicat de vegades i després passen. Els merges esperen les branques activades de la mateixa ronda.|Simulación estructural. No se ejecutan modelos, herramientas ni código. Los routers siguen la rama configurada; los evaluadores fallan el número indicado de veces y luego pasan. Los merges esperan las ramas activadas de la misma ronda.|Structural simulation. No models, tools or code execute. Routers follow the configured branch; evaluators fail the selected number of times, then pass. Merges wait for activated branches in the same round.
failures|Fallades abans de PASS|Fallos antes de PASS|Failures before PASS
route|Etiqueta de branca triada (buida = primera)|Etiqueta de rama elegida (vacía = primera)|Selected branch label (empty = first)
completed|Simulació completada|Simulación completada|Simulation complete
stopped|Simulació aturada per límit o estructura incompatible. Revisa el graph.|Simulación detenida por límite o estructura incompatible. Revisa el graph.|Simulation stopped by a limit or unsupported structure. Review the graph.
executed|Nodes executats (visites)|Nodos ejecutados (visitas)|Nodes executed (visits)
toolCalls|Crides d’eines|Llamadas a herramientas|Tool calls
rounds|Rondes d’execució|Rondas de ejecución|Execution rounds
skip|Ometre|Omitir|Skip
next|Següent|Siguiente|Next
finish|Acabar|Finalizar|Finish
neverAgain|No ho tornis a mostrar|No volver a mostrar|Don't show again
onboarding|Primers passos|Primeros pasos|Getting started
when|Quan utilitzar-lo|Cuándo usarlo|When to use
avoid|Quan no utilitzar-lo|Cuándo no usarlo|When not to use
example|Exemple|Ejemplo|Example
practice|Bona pràctica|Buena práctica|Good practice
mistake|Error habitual|Error habitual|Common mistake
philosophy|Utilitza la mínima intel·ligència computacional necessària per resoldre correctament la tasca. És una recomanació contextual: valida la qualitat abans de reduir recursos.|Utiliza la mínima inteligencia computacional necesaria para resolver correctamente la tarea. Es una recomendación contextual: valida la calidad antes de reducir recursos.|Use the minimum computational intelligence needed to complete the task correctly. This is contextual advice: validate quality before reducing resources.
concept|Principi orientatiu: eficiència ≈ (qualitat útil × feina completada) / (tokens × temps × intervenció humana). No és una mètrica científica estàndard.|Principio orientativo: eficiencia ≈ (calidad útil × trabajo completado) / (tokens × tiempo × intervención humana). No es una métrica científica estándar.|Guiding principle: efficiency ≈ (useful quality × completed work) / (tokens × time × human intervention). Not a standard scientific metric.
projectSettings|Configuració del projecte|Configuración del proyecto|Project settings
created|Creat|Creado|Created
modified|Modificat|Modificado|Modified
version|Versió|Versión|Version
architecture|Resum de l’arquitectura|Resumen de arquitectura|Architecture summary
print|HTML imprimible / PDF|HTML imprimible / PDF|Printable HTML / PDF
noSelection|Selecciona un node o configura el projecte.|Selecciona un nodo o configura el proyecto.|Select a node or configure the project.
limit|Límit assolit: 500 nodes, 2.000 connexions o 5 MB.|Límite alcanzado: 500 nodos, 2.000 conexiones o 5 MB.|Limit reached: 500 nodes, 2,000 connections or 5 MB.
invalidEdge|Connexió duplicada, autoreferència o node inexistent.|Conexión duplicada, autorreferencia o nodo inexistente.|Duplicate connection, self-reference or missing node.
priceOverride|Preus propis d’aquest node|Precios propios de este nodo|Override catalog prices for this node
search|Cercar nodes|Buscar nodos|Search nodes
move|Moure node amb fletxes (Majúscules: 50 px)|Mover nodo con flechas (Mayús: 50 px)|Move node with arrows (Shift: 50 px)
latencyNote|La latència és manual i orientativa; no inclou cues, xarxa ni límits dels proveïdors.|La latencia es manual y orientativa; no incluye colas, red ni límites de proveedores.|Latency is manual and indicative; excludes queues, network and provider limits.
`;
for(const r of rows.trim().split('\n')){const [k,...v]=r.split('|');messages[k]=v;}
export const options={modelClass:{frontier:['Raonament capdavanter','Razonamiento frontera','Frontier reasoning'],standard:['Raonament estàndard','Razonamiento estándar','Standard reasoning'],fast:['Ràpid / econòmic','Rápido / económico','Fast / cheap'],local:['Model local petit','Modelo local pequeño','Small local model'],embedding:['Embeddings','Embeddings','Embedding'],vision:['Visió','Visión','Vision'],custom:['Personalitzat','Personalizado','Custom']},reasoning:{none:['Cap','Ninguno','None'],low:['Baix','Bajo','Low'],medium:['Mitjà','Medio','Medium'],high:['Alt','Alto','High']},latencyClass:{fast:['Ràpida','Rápida','Fast'],medium:['Mitjana','Media','Medium'],slow:['Lenta','Lenta','Slow']}};
export const providers=['OpenAI','Anthropic','Google','AWS Bedrock','Azure','OpenRouter','Local','Other'];
export const providerName=p=>p==='Other'?tr(['Altres','Otros','Other']):p;
