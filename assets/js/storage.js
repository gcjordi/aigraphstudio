import {validate,clone} from './model.js';
const qa=typeof location!=='undefined'&&new URLSearchParams(location.search).get('qa')==='1';
const prefix=qa?'ags-qa-':'ags-';
let db;
export async function openDB(){if(db)return db;db=await new Promise((resolve,reject)=>{const r=indexedDB.open(qa?'ai-graph-studio-qa':'ai-graph-studio',1);r.onupgradeneeded=()=>r.result.createObjectStore('projects',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);r.onblocked=()=>reject(Error('blocked'));});return db;}
async function tx(mode,action){const d=await openDB();return new Promise((res,rej)=>{const t=d.transaction('projects',mode);const r=action(t.objectStore('projects'));t.oncomplete=()=>res(r.result);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error);});}
export const saveProject=async p=>tx('readwrite',s=>s.put(validate(clone(p))));
export const deleteProject=id=>tx('readwrite',s=>s.delete(id));
export const listProjects=async()=>{const all=await tx('readonly',s=>s.getAll());return all.sort((a,b)=>b.modified.localeCompare(a.modified));};
export const readProject=async id=>validate(await tx('readonly',s=>s.get(id)));
export const pref={get:(k,d)=>{try{return localStorage.getItem(prefix+k)||d;}catch{return d;}},set:(k,v)=>{try{localStorage.setItem(prefix+k,v);}catch{/* UI remains usable without preference persistence. */}}};
