import {ExternalLink,FolderOpen,LockKeyhole} from 'lucide-react';
import {statusLabels,type Project} from './lib/projectSchema';

export default function ProjectCard({project}:{project:Project}){
  const secret=project.classification==='secret';
  const liveUrl=project.liveUrl;
  const repositoryUrl=secret||project.privateSource?undefined:project.repositoryUrl;
  return <article className={`project-card${liveUrl?' project-card-clickable':''}${secret?' project-card-secret':''}`}>
    {liveUrl&&<a className="card-overlay-link" href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} website in a new tab`}><span className="sr-only">Open {project.name} website</span></a>}
    <div className="folder-tab"/><div className="card-top"><span>{project.caseId} / CASE FILE</span>{secret?<LockKeyhole size={19}/>:<FolderOpen size={19}/>}</div>
    <div className="card-art" aria-hidden="true"><div className="art-file"><span>{secret?'CLASSIFIED':project.caseId}</span>{secret?<LockKeyhole size={64}/>:<FolderOpen size={64}/>}<i/></div></div>
    <div className="card-content"><span className="department">{project.department}</span><h3>{project.name}</h3>{project.foundingProject&&<strong className="founding-badge">THE FIRST PROJECT</strong>}{secret&&<strong className="secret-badge"><LockKeyhole size={14}/> ABSOLUTELY SECRET PROJECT</strong>}{project.privateSource&&!secret&&<strong className="private-source-badge"><LockKeyhole size={14}/> SOURCE PRIVATE</strong>}<p>{project.description}</p><span className={`status status-${project.status}`}>{statusLabels[project.status]}</span><div className="observation"><small>OFFICIAL OBSERVATION</small><p>“{project.observation}”</p></div><div className="card-links">{liveUrl&&<span className="card-primary-link">Inspect Project <ExternalLink size={15}/></span>}{repositoryUrl&&<a href={repositoryUrl} target="_blank" rel="noopener noreferrer">Supporting Evidence <ExternalLink size={15}/></a>}{!liveUrl&&!repositoryUrl&&<span className="no-links">{secret?'Access denied by order of the Department':'Public access pending'}</span>}</div></div>
  </article>
}
