import type { Project } from './projectSchema';
export function visibleProjects(projects:Project[]){return projects.filter(p=>p.visible).sort((a,b)=>Number(a.caseId.slice(4))-Number(b.caseId.slice(4)));}
export function filterProjects(projects:Project[],query:string,department:string,status:string){const q=query.trim().toLocaleLowerCase();return visibleProjects(projects).filter(p=>(!department||p.department===department)&&(!status||p.status===status)&&(!q||[p.name,p.caseId,p.description,p.department,...p.tags].join(' ').toLocaleLowerCase().includes(q)));}
