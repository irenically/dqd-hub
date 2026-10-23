import {readFile,rename,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {catalogSchema,type Project} from '../src/lib/projectSchema';
import caseNumbers from '../config/case-numbers.json';

const path=resolve('src/data/projects.json');
export const readJson=async <T>(file:string):Promise<T>=>JSON.parse(await readFile(resolve(file),'utf8')) as T;
export async function readCatalog(){return catalogSchema.parse(await readJson<unknown>('src/data/projects.json'));}
export function nextCase(projects:Project[]){return `DQD-${String(Math.max(0,...projects.map(p=>Number(p.caseId.slice(4))),...caseNumbers.reserved.map(id=>Number(id.slice(4))))+1).padStart(3,'0')}`;}
export function slugify(s:string){return s.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'incident';}
export function serialize(projects:Project[]){return JSON.stringify([...projects].sort((a,b)=>Number(a.caseId.slice(4))-Number(b.caseId.slice(4))),null,2)+'\n';}
export async function writeCatalog(projects:Project[]){catalogSchema.parse(projects);const content=serialize(projects);const previous=await readFile(path,'utf8');if(content===previous)return false;const temporary=`${path}.${process.pid}.tmp`;await writeFile(temporary,content);await rename(temporary,path);const ledgerPath=resolve('config/case-numbers.json');const reserved=[...new Set([...caseNumbers.reserved,...projects.map(p=>p.caseId)])].sort((a,b)=>Number(a.slice(4))-Number(b.slice(4)));await writeFile(ledgerPath,JSON.stringify({reserved},null,2)+'\n');return true;}
export function uniqueSlug(base:string,projects:Project[]){let slug=slugify(base),i=2;while(projects.some(p=>p.slug===slug))slug=`${slugify(base)}-${i++}`;return slug;}
