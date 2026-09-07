import {makeProject,makeNode,addEdge,structure} from './model.js';
export const templates=[
{key:'researchReport',title:['Recerca i informe amb IA','Investigación e informe con IA','AI Research & Report'],types:['start','input','llm','parallel','agent','agent','agent','merge','llm','llm','evaluator','loop','llm','output']},
{key:'simple',title:['Prompt simple','Prompt simple','Simple Prompt'],types:['start','input','prompt','llm','output']},
{key:'single',title:['Agent únic','Agente único','Single Agent'],types:['start','input','agent','output']},
{key:'tools',title:['Agent amb eines','Agente con herramientas','Agent + Tools'],types:['start','input','agent','tool','agent','output']},
{key:'plan',title:['Planificar → Executar → Verificar','Planificar → Ejecutar → Verificar','Plan → Execute → Verify'],types:['start','input','llm','agent','evaluator','loop','llm','output']},
{key:'research',title:['Flux de recerca','Flujo de investigación','Research Workflow'],types:['start','input','agent','rag','llm','evaluator','output']},
{key:'rag',title:['Flux RAG','Flujo RAG','RAG Workflow'],types:['start','input','guardrail','rag','prompt','llm','evaluator','output']},
{key:'human',title:['Supervisió humana','Supervisión humana','Human-in-the-loop'],types:['start','input','llm','human','output']},
{key:'parallel',title:['Recerca paral·lela','Investigación paralela','Parallel Research'],types:['start','input','parallel','agent','agent','agent','merge','llm','output']},
{key:'optimizer',title:['Avaluador i optimitzador','Evaluador y optimizador','Evaluator-Optimizer'],types:['start','input','llm','evaluator','loop','llm','output']},
{key:'multi',title:['Flux multiagent','Flujo multiagente','Multi-Agent Workflow'],types:['start','input','agent','agent','agent','evaluator','output']},
{key:'router',title:['Arquitectura amb encaminador','Arquitectura con enrutador','Router Architecture'],types:['start','input','router','llm','llm','output']},
{key:'toolAgent',title:['Agent que utilitza eines','Agente que utiliza herramientas','Tool-using Agent'],types:['start','input','agent','retry','tool','evaluator','output']},
{key:'hybrid',title:['Flux híbrid de codi i IA','Flujo híbrido de código e IA','Deterministic + AI Hybrid Workflow'],types:['start','input','code','llm','code','evaluator','output']}
];
export function arrange(p){const g=structure(p),used={};p.nodes.forEach(n=>{const d=g.depth[g.comp.get(n.id)]-1;const row=used[d]||0;used[d]=row+1;n.x=60+d*250;n.y=80+row*145;});}
export function buildTemplate(key){const def=templates.find(t=>t.key===key)||templates[0],p=makeProject();p.name=def.title[0];p.nodes=def.types.map((t,i)=>makeNode(t,70+i*250,100));const n=p.nodes,link=(a,b,label='')=>addEdge(p,n[a].id,n[b].id,label),title=(i,ca,es,en)=>n[i].title=[ca,es,en];
 n.forEach(x=>{if(['llm','agent'].includes(x.type)){x.model='Example Fast';x.provider='Other';x.inputTokens=1500;x.outputTokens=450;}});
 if(key==='researchReport'){[[0,1],[1,2],[2,3],[3,4],[3,5],[3,6],[4,7],[5,7],[6,7],[7,8],[8,9],[9,10],[10,13,'PASS'],[10,11,'FAIL'],[11,12],[12,10]].forEach(a=>link(...a));title(2,'Planificador','Planificador','Planner');[4,5,6].forEach((i,j)=>title(i,'Recerca '+String.fromCharCode(65+j),'Investigación '+String.fromCharCode(65+j),'Research '+String.fromCharCode(65+j)));title(8,'Raonament','Razonamiento','Reasoning');n[8].modelClass='frontier';n[8].model='Example Reasoning';n[8].reasoning='high';n[8].inputTokens=6000;n[8].outputTokens=1500;n[8].latency=8000;title(9,'Redactor','Redactor','Writer');title(12,'Correcció','Corrección','Fix');n[10].useModel=true;n[10].model='Example Fast';}
 else if(key==='parallel'){[[0,1],[1,2],[2,3],[2,4],[2,5],[3,6],[4,6],[5,6],[6,7],[7,8]].forEach(a=>link(...a));}
 else if(['plan','optimizer'].includes(key)){const ev=key==='plan'?4:3;for(let i=0;i<ev;i++)link(i,i+1);link(ev,n.length-1,'PASS');link(ev,ev+1,'FAIL');link(ev+1,ev+2);link(ev+2,ev);title(2,key==='plan'?'Planificador':'Generador',key==='plan'?'Planificador':'Generador',key==='plan'?'Planner':'Generator');if(key==='plan')title(3,'Executor','Ejecutor','Executor');title(ev+2,'Correcció','Corrección','Fix');n[ev].useModel=true;}
 else if(key==='router'){[[0,1],[1,2],[2,3,'SIMPLE'],[2,4,'COMPLEX'],[3,5],[4,5]].forEach(a=>link(...a));n[2].route='SIMPLE';n[4].modelClass='frontier';n[4].model='Example Reasoning';}
 else if(key==='toolAgent'){[[0,1],[1,2],[2,3],[3,4,'REPEAT'],[4,3],[3,5,'EXIT'],[5,6]].forEach(a=>link(...a));}
 else for(let i=0;i<n.length-1;i++)link(i,i+1);
 n.filter(x=>['loop','retry'].includes(x.type)).forEach(x=>{x.condition='FAIL';x.exitCondition='PASS';x.maxIterations=3;x.estimatedIterations=2;});
 // Intentionally zero: these are model labels, never advertised provider prices.
 p.catalog=[{provider:'Other',model:'Example Fast',inputPrice:0,outputPrice:0},{provider:'Other',model:'Example Reasoning',inputPrice:0,outputPrice:0}];p.settings.expectedBudget=40000;p.settings.maxBudget=70000;arrange(p);if(key==='researchReport'){const positions=[[60,60],[320,60],[580,60],[60,200],[60,340],[320,340],[580,340],[580,480],[320,480],[60,480],[60,620],[320,620],[580,620],[60,760]];n.forEach((node,i)=>{node.x=positions[i][0];node.y=positions[i][1];});}return p;
}
