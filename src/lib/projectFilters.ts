import type {Project} from './projectSchema';

export function visibleProjects(projects:Project[]){return projects.filter(project=>project.visible)}
export function filterProjects(projects:Project[],query:string){const q=query.trim().toLocaleLowerCase();return visibleProjects(projects).filter(project=>!q||[project.name,project.caseId,project.description,project.department,...project.tags].join(' ').toLocaleLowerCase().includes(q));}
