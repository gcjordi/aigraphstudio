import {structure,price} from './model.js';
import {isAI} from './nodes.js';
// Deterministic, round-based token-flow simulation. Each node fires at most once per round.
// Activated branches run in the same round; Merge waits while another live token can reach it.
export function simulate(p){const g=structure(p),nodes=new Map(p.nodes.map(n=>[n.id,n])),visits=new Map(),trace=[],limit=Math.min(p.settings.maxSteps||10000,10000);let pending=p.nodes.filter(n=>n.type==='start').map(n=>({id:n.id,round:1})),rounds=0,stopped=false;
 const bounds=g.components.map(c=>{const cs=c.map(id=>nodes.get(id)).filter(n=>['loop','retry'].includes(n.type));return cs.length?cs.reduce((a,n)=>a*(n.maxIterations||10000),1):10000;});
 const canReach=(from,to)=>{const q=[from],seen=new Set();for(let i=0;i<q.length;i++){const v=q[i];if(v===to)return true;if(seen.has(v))continue;seen.add(v);for(const e of g.out.get(v))q.push(e.target);}return false;};
 if(!pending.length)stopped=true;
 while(pending.length&&trace.length<limit){const min=Math.min(...pending.map(x=>x.round)),batch=pending.filter(x=>x.round===min),future=pending.filter(x=>x.round!==min),unique=[...new Set(batch.map(x=>x.id))];let progressed=false;const next=[];
 for(const id of unique){const n=nodes.get(id);if(n.type==='merge'&&[...unique.filter(x=>x!==id),...future.map(x=>x.id)].some(x=>canReach(x,id))){next.push({id,round:min+1});continue;}
 const visit=(visits.get(id)||0)+1;if(visit>bounds[g.comp.get(id)]){stopped=true;continue;}visits.set(id,visit);let outgoing=g.out.get(id),status='✓';
 if(n.type==='evaluator'&&outgoing.length>1){const label=visit<=n.failures?'FAIL':'PASS';status=label==='FAIL'?'✗':'✓';outgoing=outgoing.filter(e=>e.label.toUpperCase()===label).slice(0,1);if(!outgoing.length)stopped=true;}
 else if(['router','human','guardrail'].includes(n.type)&&outgoing.length>1){outgoing=n.route?outgoing.filter(e=>e.label===n.route).slice(0,1):outgoing.slice(0,1);if(!outgoing.length)stopped=true;}
 else if(['loop','retry'].includes(n.type)&&outgoing.length>1){const keep=visit<Math.max(1,n.estimatedIterations),wanted=keep?['REPEAT','FAIL','TRUE','YES']:['EXIT','PASS','FALSE','NO'];outgoing=outgoing.filter(e=>wanted.includes(e.label.toUpperCase())).slice(0,1);if(!outgoing.length)stopped=true;}
 if(n.type==='output')outgoing=[];
 const ai=isAI(n),pr=price(p,n),calls=n.executions,input=ai?n.inputTokens*calls:0,output=ai?n.outputTokens*calls:0;trace.push({id,status,round:min,visit,tokens:input+output,cost:(input*pr.inputPrice+output*pr.outputPrice)/1e6,llmCalls:ai?calls:0,toolCalls:n.type==='tool'?calls:0,loops:['loop','retry'].includes(n.type)?1:0});rounds=Math.max(rounds,min);progressed=true;
 if(trace.length>=limit){if(outgoing.length||unique.indexOf(id)<unique.length-1||future.length)stopped=true;break;}
 outgoing.forEach(e=>next.push({id:e.target,round:min+1}));if(!outgoing.length&&n.type!=='output')stopped=true;
 }
 if(!progressed){stopped=true;break;}pending=[...future,...next];}
 if(pending.length&&trace.length>=limit)stopped=true;
 return {trace,stopped,metrics:{executed:trace.length,llmCalls:trace.reduce((s,r)=>s+r.llmCalls,0),toolCalls:trace.reduce((s,r)=>s+r.toolCalls,0),loops:trace.reduce((s,r)=>s+r.loops,0),tokens:trace.reduce((s,r)=>s+r.tokens,0),cost:trace.reduce((s,r)=>s+r.cost,0),rounds}};
}
