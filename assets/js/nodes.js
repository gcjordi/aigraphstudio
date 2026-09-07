import {tr} from './i18n.js';
export const TYPES=['start','input','prompt','llm','agent','router','tool','code','rag','memory','parallel','merge','evaluator','guardrail','human','loop','retry','output'];
export const AI_TYPES=['llm','agent'];
export const names={start:['Inici','Inicio','Start'],input:['Entrada','Entrada','Input'],prompt:['Instrucció / Prompt','Instrucción / Prompt','Prompt'],llm:['Model de llenguatge','Modelo de lenguaje','LLM'],agent:['Agent','Agente','Agent'],router:['Encaminador / Decisió','Enrutador / Decisión','Router / Decision'],tool:['Eina / API','Herramienta / API','Tool / API'],code:['Codi determinista','Código determinista','Deterministic code'],rag:['RAG / Coneixement','RAG / Conocimiento','RAG / Knowledge'],memory:['Memòria / Estat','Memoria / Estado','Memory / State'],parallel:['Divisió paral·lela','División paralela','Parallel split'],merge:['Unió','Unión','Merge'],evaluator:['Avaluador','Evaluador','Evaluator'],guardrail:['Protecció','Protección','Guardrail'],human:['Aprovació humana','Aprobación humana','Human approval'],loop:['Bucle','Bucle','Loop'],retry:['Reintent','Reintento','Retry'],output:['Sortida','Salida','Output']};
export const typeName=k=>tr(names[k]||[k,k,k]);
export const isAI=n=>AI_TYPES.includes(n.type)||(['evaluator','guardrail','rag'].includes(n.type)&&n.useModel);
export const nodeName=n=>n.name|| (n.title?tr(n.title):typeName(n.type));
export const symbols={start:'▶',input:'↓',prompt:'≡',llm:'✦',agent:'◎',router:'◇',tool:'↗',code:'{}',rag:'▤',memory:'▣',parallel:'⑂',merge:'⑃',evaluator:'✓',guardrail:'⊙',human:'☑',loop:'↻',retry:'⟳',output:'■'};
export const group=k=>['llm','agent','prompt','rag','memory'].includes(k)?'intelligence':['evaluator','guardrail','human'].includes(k)?'assurance':'flow';
// Educational entries: definition, use, avoid, example, good practice, common mistake.
const lessons={
start:[
'Punt d’entrada del graph.|Per indicar on comença cada execució.|Per representar una tasca d’IA.|Arriba una nova petició.|Mantén una entrada clara.|Tenir tasques inaccessibles des de l’inici.',
'Punto de entrada del grafo.|Para indicar dónde comienza cada ejecución.|Para representar una tarea de IA.|Llega una nueva petición.|Mantén una entrada clara.|Tener tareas inaccesibles desde el inicio.',
'Entry point of the graph.|To mark where each execution begins.|To represent an AI task.|A new request arrives.|Keep a clear entry point.|Leaving tasks unreachable from the start.'],
input:[
'Dades que necessita el flux.|Per recollir objectiu i restriccions.|Per executar una operació.|Tema, públic i longitud de l’informe.|Defineix un esquema d’entrada.|Acceptar dades sense validar.',
'Datos que necesita el flujo.|Para recoger objetivo y restricciones.|Para ejecutar una operación.|Tema, público y longitud del informe.|Define un esquema de entrada.|Aceptar datos sin validar.',
'Data required by the workflow.|To collect goals and constraints.|To execute an operation.|Report topic, audience and length.|Define an input schema.|Accepting unvalidated data.'],
prompt:[
'Instruccions i context per a un model; aquest node no fa cap crida.|Per separar instruccions de l’execució.|Per substituir regles deterministes.|Resumeix aquestes fonts amb citacions.|Defineix objectiu, format i límits.|Repetir context innecessari.',
'Instrucciones y contexto para un modelo; este nodo no hace llamadas.|Para separar instrucciones de ejecución.|Para sustituir reglas deterministas.|Resume estas fuentes con citas.|Define objetivo, formato y límites.|Repetir contexto innecesario.',
'Instructions and context for a model; this node makes no call.|To separate instructions from execution.|To replace deterministic rules.|Summarize these sources with citations.|Specify goal, format and limits.|Repeating unnecessary context.'],
llm:[
'Una crida a un model de llenguatge.|Per interpretar, redactar o raonar.|Per sumar o validar un esquema simple.|Redactar una síntesi de fonts.|Prova el model més petit que compleixi la qualitat.|Triar sempre el model més potent.',
'Una llamada a un modelo de lenguaje.|Para interpretar, redactar o razonar.|Para sumar o validar un esquema simple.|Redactar una síntesis de fuentes.|Prueba el modelo más pequeño que cumpla la calidad.|Elegir siempre el modelo más potente.',
'A call to a language model.|For interpretation, writing or reasoning.|For arithmetic or simple schema validation.|Write a synthesis of sources.|Test the smallest model meeting quality requirements.|Always choosing the most powerful model.'],
agent:[
'Component que decideix accions orientades a un objectiu.|Quan cal escollir eines i adaptar passos.|Quan una seqüència fixa és suficient.|Investigar un tema amb eines de cerca.|Explicita eines, permisos i límits; les crides internes s’han de modelar o estimar.|Confondre autonomia amb absència de control.',
'Componente que decide acciones orientadas a un objetivo.|Cuando debe elegir herramientas y adaptar pasos.|Cuando basta una secuencia fija.|Investigar un tema con herramientas de búsqueda.|Explicita herramientas, permisos y límites; modela o estima llamadas internas.|Confundir autonomía con ausencia de control.',
'A component deciding actions toward a goal.|When tools and steps must adapt.|When a fixed sequence is sufficient.|Research a topic using search tools.|Specify tools, permissions and limits; model or estimate internal calls.|Confusing autonomy with lack of control.'],
router:[
'Decisió que tria una branca.|Per encaminar segons regles o classificació.|Quan totes les branques s’han d’executar.|Consulta simple → model ràpid; complexa → raonament.|Etiqueta les sortides i defineix una alternativa.|No cobrir tots els casos.',
'Decisión que elige una rama.|Para enrutar según reglas o clasificación.|Cuando deben ejecutarse todas las ramas.|Consulta simple → modelo rápido; compleja → razonamiento.|Etiqueta salidas y define alternativa.|No cubrir todos los casos.',
'A decision selecting one branch.|For rule-based or classification routing.|When every branch should execute.|Simple query → fast model; complex → reasoning.|Label outputs and define a fallback.|Failing to cover every case.'],
tool:[
'Capacitat externa descrita, mai executada aquí.|Per consultar serveis o actuar sobre sistemes.|Per guardar claus o credencials al graph.|Cercar documents en una API.|Preveu timeout, reintent i permisos mínims.|Ignorar fallades o efectes duplicats.',
'Capacidad externa descrita, nunca ejecutada aquí.|Para consultar servicios o actuar sobre sistemas.|Para guardar claves o credenciales en el grafo.|Buscar documentos en una API.|Prevé timeout, reintento y permisos mínimos.|Ignorar fallos o efectos duplicados.',
'An external capability, described but never executed here.|For querying services or acting on systems.|For storing keys or credentials in the graph.|Search documents through an API.|Plan timeouts, retries and least privilege.|Ignoring failures or duplicate effects.'],
code:[
'Operació determinista descrita; no executa JavaScript.|Per càlcul, validació i transformació estructurada.|Quan cal interpretar informació ambigua.|Validar JSON o donar format a una taula.|Utilitza regles provables.|Fer servir un LLM per ordenar una llista.',
'Operación determinista descrita; no ejecuta JavaScript.|Para cálculo, validación y transformación estructurada.|Cuando hay que interpretar información ambigua.|Validar JSON o formatear una tabla.|Utiliza reglas comprobables.|Usar un LLM para ordenar una lista.',
'A described deterministic operation; no JavaScript executes.|For calculation, validation and structured transformation.|When ambiguous information needs interpretation.|Validate JSON or format a table.|Use testable rules.|Using an LLM to sort a list.'],
rag:[
'Recuperació de coneixement per aportar context.|Quan la resposta necessita fonts específiques.|Quan les dades ja són suficients i petites.|Recuperar fragments d’un manual.|Limita fragments i conserva la procedència.|Confondre recuperació amb veracitat.',
'Recuperación de conocimiento para aportar contexto.|Cuando la respuesta necesita fuentes específicas.|Cuando los datos ya son suficientes y pequeños.|Recuperar fragmentos de un manual.|Limita fragmentos y conserva procedencia.|Confundir recuperación con veracidad.',
'Knowledge retrieval to supply context.|When answers need specific sources.|When existing data is small and sufficient.|Retrieve relevant manual excerpts.|Limit chunks and retain provenance.|Confusing retrieval with truth.'],
memory:[
'Estat que es conserva entre passos.|Per compartir resultats o mantenir historial rellevant.|Per acumular tot l’historial sense límit.|Desar una síntesi de la recerca.|Defineix retenció, resum i accés.|Propagar dades antigues o sensibles.',
'Estado conservado entre pasos.|Para compartir resultados o historial relevante.|Para acumular todo el historial sin límite.|Guardar una síntesis de investigación.|Define retención, resumen y acceso.|Propagar datos antiguos o sensibles.',
'State retained between steps.|For sharing results or relevant history.|For accumulating unlimited history.|Store a research summary.|Define retention, summarization and access.|Propagating stale or sensitive data.'],
parallel:[
'Activa diverses branques independents.|Quan les tasques no depenen dels resultats mutus.|Si comparteixen estat mutable sense coordinació.|Investigar tres fonts alhora.|Uneix els resultats amb un Merge.|Assumir que paral·lel vol dir menys tokens.',
'Activa varias ramas independientes.|Cuando las tareas no dependen de resultados mutuos.|Si comparten estado mutable sin coordinación.|Investigar tres fuentes a la vez.|Une resultados con un Merge.|Suponer que paralelo significa menos tokens.',
'Activates multiple independent branches.|When tasks do not depend on each other’s results.|With uncoordinated shared mutable state.|Research three sources concurrently.|Join results with a Merge.|Assuming parallel means fewer tokens.'],
merge:[
'Uneix les branques activades abans de continuar.|Després de treball paral·lel.|Per substituir l’avaluació de qualitat.|Unir tres recerques per redactar.|Defineix com resoldre contradiccions.|Continuar amb resultats incomplets.',
'Une las ramas activadas antes de continuar.|Después del trabajo paralelo.|Para sustituir evaluación de calidad.|Unir tres investigaciones para redactar.|Define cómo resolver contradicciones.|Continuar con resultados incompletos.',
'Joins activated branches before continuing.|After parallel work.|To replace quality evaluation.|Combine three research branches before writing.|Define conflict resolution.|Continuing with incomplete results.'],
evaluator:[
'Comprova un resultat segons criteris explícits.|Abans d’una sortida important.|Com a garantia absoluta de correcció.|PASS si hi ha fonts; FAIL si falta evidència.|Separa criteris del generador i limita revisions.|Fer revisar indefinidament el mateix resultat.',
'Comprueba un resultado según criterios explícitos.|Antes de una salida importante.|Como garantía absoluta de corrección.|PASS si hay fuentes; FAIL si falta evidencia.|Separa criterios del generador y limita revisiones.|Revisar indefinidamente el mismo resultado.',
'Checks a result against explicit criteria.|Before an important output.|As an absolute correctness guarantee.|PASS with sources; FAIL when evidence is missing.|Separate criteria from generation and bound revisions.|Reviewing the same result indefinitely.'],
guardrail:[
'Control preventiu o de validació de seguretat.|En entrades, eines i sortides sensibles.|Com a protecció única i infal·lible.|Bloquejar l’exposició de dades personals.|Combina controls i defineix resposta al bloqueig.|Confiar només en una instrucció al prompt.',
'Control preventivo o de validación de seguridad.|En entradas, herramientas y salidas sensibles.|Como protección única e infalible.|Bloquear exposición de datos personales.|Combina controles y define respuesta al bloqueo.|Confiar solo en una instrucción al prompt.',
'A preventive or validating safety control.|For sensitive inputs, tools and outputs.|As a sole infallible protection.|Block personal data exposure.|Combine controls and define blocked behavior.|Relying only on a prompt instruction.'],
human:[
'Punt de revisió o aprovació humana.|Per decisions d’alt impacte o excepcions.|Per aprovar rutinàriament passos de baix risc.|Aprovar l’enviament d’un informe sensible.|Mostra evidències i fixa un temps de resposta.|Convertir tota l’automatització en una cua manual.',
'Punto de revisión o aprobación humana.|Para decisiones de alto impacto o excepciones.|Para aprobar rutinariamente pasos de bajo riesgo.|Aprobar envío de un informe sensible.|Muestra evidencia y fija tiempo de respuesta.|Convertir la automatización en una cola manual.',
'A human review or approval checkpoint.|For high-impact decisions or exceptions.|For routine approval of low-risk steps.|Approve sending a sensitive report.|Show evidence and define response time.|Turning automation into a manual queue.'],
loop:[
'Repeteix una part fins a una condició de sortida.|Per millora iterativa amb criteris clars.|Si una sola passada és suficient.|Corregir → avaluar, fins a PASS.|Defineix visites màximes per node dins del cicle.|No posar límit màxim.',
'Repite una parte hasta una condición de salida.|Para mejora iterativa con criterios claros.|Si basta una sola pasada.|Corregir → evaluar, hasta PASS.|Define visitas máximas por nodo dentro del ciclo.|No poner límite máximo.',
'Repeats a section until an exit condition holds.|For iterative improvement with clear criteria.|When one pass is sufficient.|Fix → evaluate, until PASS.|Set maximum visits per node inside the cycle.|Omitting a maximum limit.'],
retry:[
'Controla reintents d’operacions fallides.|Per errors transitoris d’eines.|Per errors permanents o accions no idempotents sense protecció.|Reintentar una lectura d’API dues vegades.|Dibuixa explícitament el cicle amb l’eina i fixa un límit.|Repetir pagaments o enviaments accidentalment.',
'Controla reintentos de operaciones fallidas.|Para errores transitorios de herramientas.|Para errores permanentes o acciones no idempotentes sin protección.|Reintentar lectura de API dos veces.|Dibuja explícitamente el ciclo con la herramienta y fija un límite.|Repetir pagos o envíos accidentalmente.',
'Controls retries of failed operations.|For transient tool failures.|For permanent errors or unprotected non-idempotent actions.|Retry an API read twice.|Draw the tool cycle explicitly and set a limit.|Accidentally duplicating payments or messages.'],
output:[
'Resultat final del flux.|Per declarar un lliurable verificable.|Per amagar feina encara pendent.|Informe amb fonts i conclusions.|Defineix format i criteris d’acceptació.|Donar per correcte qualsevol resultat.',
'Resultado final del flujo.|Para declarar un entregable verificable.|Para ocultar trabajo pendiente.|Informe con fuentes y conclusiones.|Define formato y criterios de aceptación.|Dar por correcto cualquier resultado.',
'The workflow’s final result.|To declare a verifiable deliverable.|To hide unfinished work.|Report with sources and conclusions.|Define format and acceptance criteria.|Assuming every result is correct.']};
export function lesson(k){return tr(lessons[k]).split('|');}
