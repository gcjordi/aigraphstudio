import {TYPES} from './nodes.js';
export const CONFIG={name:'AI Graph Studio',version:'1.0.0',schemaVersion:1,maxNodes:500,maxEdges:2000,maxBytes:5*1024*1024};
let seq=0;
export const uid=()=>globalThis.crypto?.randomUUID?.()||`id-${Date.now().toString(36)}-${(++seq).toString(36)}-${Math.random().toString(36).slice(2)}`;
export const clone=o=>JSON.parse(JSON.stringify(o));
export function makeNode(type,x=100,y=100){return {id:uid(),type,x,y,name:'',description:'',notes:'',provider:'Other',model:'',modelClass:'fast',reasoning:'low',latencyClass:'medium',latency:1000,inputTokens:1000,outputTokens:300,executions:1,useModel:false,maxIterations:['loop','retry'].includes(type)?3:0,estimatedIterations:2,condition:'',exitCondition:'',failures:1,route:'',sensitive:false,important:type==='output',external:type==='tool',deterministic:false,contextKey:'',priceOverride:false,inputPrice:0,outputPrice:0};}
export function makeProject(){const now=new Date().toISOString();return {schemaVersion:1,id:uid(),name:'',description:'',created:now,modified:now,version:CONFIG.version,nodes:[],edges:[],catalog:[],settings:{expectedBudget:20000,maxBudget:50000,maxSteps:500,currency:'EUR'}};}
const bad=new Set(['__proto__','constructor','prototype']);
function safeTree(o,depth=0){if(depth>15)throw Error('depth');if(o&&typeof o==='object')for(const k of Object.keys(o)){if(bad.has(k))throw Error('key');safeTree(o[k],depth+1);}}
const str=(v,max=12000)=>{if(v===undefined)return '';if(typeof v!=='string'||v.length>max)throw Error('string');return v;};
const num=(v,def,max=1e9)=>{if(v===undefined)return def;if(typeof v!=='number'||!Number.isFinite(v)||v<0||v>max)throw Error('number');return v;};
const id=v=>{if(typeof v!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(v))throw Error('id');return v;};
const bool=v=>v===true;
export function validate(raw){
 if(typeof raw==='string'){if(new TextEncoder().encode(raw).length>CONFIG.maxBytes)throw Error('size');raw=JSON.parse(raw);}else if(new TextEncoder().encode(JSON.stringify(raw)).length>CONFIG.maxBytes)throw Error('size');safeTree(raw);
 if(!raw||raw.schemaVersion!==1||!Array.isArray(raw.nodes)||!Array.isArray(raw.edges)||raw.nodes.length>500||raw.edges.length>2000)throw Error('schema');
 const p=makeProject();p.id=id(raw.id);p.name=str(raw.name,200);p.description=str(raw.description);p.created=str(raw.created,50);p.modified=str(raw.modified,50);if(!Number.isFinite(Date.parse(p.created))||!Number.isFinite(Date.parse(p.modified)))throw Error('date');p.version=str(raw.version,30)||CONFIG.version;
 p.nodes=raw.nodes.map(n=>{if(!n||!TYPES.includes(n.type))throw Error('type');const out=makeNode(n.type);out.id=id(n.id);for(const k of ['name','description','notes','model','provider','modelClass','reasoning','latencyClass','condition','exitCondition','route','contextKey'])out[k]=str(n[k],k==='name'?200:12000);for(const k of ['latency','inputTokens','outputTokens','executions','inputPrice','outputPrice'])out[k]=num(n[k],out[k],k==='executions'?1000:1e9);for(const k of ['maxIterations','estimatedIterations','failures']){out[k]=num(n[k],out[k],1000);if(!Number.isInteger(out[k]))throw Error('integer');}for(const k of ['x','y']){if(typeof n[k]!=='number'||!Number.isFinite(n[k])||Math.abs(n[k])>100000)throw Error('position');out[k]=n[k];}for(const k of ['useModel','sensitive','important','external','deterministic','priceOverride'])out[k]=bool(n[k]);if(n.title){if(!Array.isArray(n.title)||n.title.length!==3)throw Error('title');out.title=n.title.map(v=>str(v,200));}return out;});
 const ids=new Set(p.nodes.map(n=>n.id));if(ids.size!==p.nodes.length)throw Error('duplicate');const edgeIds=new Set(),pairs=new Set();
 p.edges=raw.edges.map(e=>{const o={id:id(e.id),source:id(e.source),target:id(e.target),label:str(e.label,100)};const pair=o.source+'>'+o.target+':'+o.label;if(!ids.has(o.source)||!ids.has(o.target)||o.source===o.target||edgeIds.has(o.id)||pairs.has(pair))throw Error('edge');edgeIds.add(o.id);pairs.add(pair);return o;});
 const s=raw.settings||{};for(const k of ['expectedBudget','maxBudget','maxSteps'])p.settings[k]=num(s[k],p.settings[k],k==='maxSteps'?10000:1e12);if(!Number.isInteger(p.settings.maxSteps))throw Error('steps');p.settings.currency=str(s.currency,12)||'EUR';
 if(raw.catalog!==undefined&&!Array.isArray(raw.catalog))throw Error('catalog');if((raw.catalog||[]).length>500)throw Error('catalog');p.catalog=(raw.catalog||[]).map(c=>({provider:str(c.provider,100),model:str(c.model,200),inputPrice:num(c.inputPrice,0),outputPrice:num(c.outputPrice,0)}));return p;
}
export function addEdge(p,source,target,label=''){if(p.edges.length>=CONFIG.maxEdges)throw Error('limit');if(source===target||!p.nodes.some(n=>n.id===source)||!p.nodes.some(n=>n.id===target)||p.edges.some(e=>e.source===source&&e.target===target&&e.label===label))throw Error('invalidEdge');p.edges.push({id:uid(),source,target,label});}
// Tarjan SCC, followed by a condensed DAG. Cycles are never traversed recursively without a visited set.
export function structure(p){const out=new Map(p.nodes.map(n=>[n.id,[]])),inc=new Map(p.nodes.map(n=>[n.id,[]]));for(const e of p.edges){if(out.has(e.source)&&inc.has(e.target)){out.get(e.source).push(e);inc.get(e.target).push(e);}}
 let counter=0;const index=new Map(),low=new Map(),stack=[],on=new Set(),components=[];
 function visit(v){index.set(v,counter);low.set(v,counter++);stack.push(v);on.add(v);for(const e of out.get(v)){const w=e.target;if(!index.has(w)){visit(w);low.set(v,Math.min(low.get(v),low.get(w)));}else if(on.has(w))low.set(v,Math.min(low.get(v),index.get(w)));}if(low.get(v)===index.get(v)){const c=[];let w;do{w=stack.pop();on.delete(w);c.push(w);}while(w!==v);components.push(c);}}
 for(const n of p.nodes)if(!index.has(n.id))visit(n.id);
 const comp=new Map();components.forEach((c,i)=>c.forEach(id=>comp.set(id,i)));const succ=components.map(()=>new Set()),pred=components.map(()=>new Set());for(const e of p.edges){let a=comp.get(e.source),b=comp.get(e.target);if(a!==undefined&&b!==undefined&&a!==b){succ[a].add(b);pred[b].add(a);}}
 const degree=pred.map(s=>s.size),queue=degree.map((d,i)=>d===0?i:-1).filter(i=>i>=0),depth=degree.map(()=>1);for(let i=0;i<queue.length;i++){const c=queue[i];for(const j of succ[c]){depth[j]=Math.max(depth[j],depth[c]+1);if(--degree[j]===0)queue.push(j);}}
 return {out,inc,components,comp,succ,pred,depth,maxDepth:Math.max(0,...depth)};
}
export function price(p,n){return n.priceOverride?n:(p.catalog.find(c=>c.provider===n.provider&&c.model===n.model)||{inputPrice:0,outputPrice:0});}
