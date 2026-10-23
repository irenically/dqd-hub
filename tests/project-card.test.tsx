import {cleanup,render,screen} from '@testing-library/react';
import {afterEach,describe,expect,it} from 'vitest';
import ProjectCard from '../src/ProjectCard';
import type {Project} from '../src/lib/projectSchema';

const project:Project={id:'manual-1',slug:'sample',caseId:'DQD-001',source:'manual',classification:'public',visible:true,name:'Sample Project',department:'Research',description:'A public test project.',observation:'Approved.',status:'operational',tags:[],liveUrl:'https://example.com/app',repositoryUrl:'https://github.com/example/app'};
afterEach(cleanup);

describe('project card destinations',()=>{
  it('opens the live site from the whole public card while retaining the repository link',()=>{
    render(<ProjectCard project={project}/>);
    expect(screen.getByRole('link',{name:'Open Sample Project website in a new tab'}).getAttribute('href')).toBe(project.liveUrl);
    expect(screen.getByRole('link',{name:/Supporting Evidence/}).getAttribute('href')).toBe(project.repositoryUrl);
  });
  it('identifies secret records and exposes no links',()=>{
    render(<ProjectCard project={{...project,classification:'secret',liveUrl:undefined,repositoryUrl:undefined}}/>);
    expect(screen.getByText('ABSOLUTELY SECRET PROJECT')).toBeTruthy();
    expect(screen.queryByRole('link')).toBeNull();
  });
  it('opens a public website with private source without presenting the project as secret',()=>{
    render(<ProjectCard project={{...project,privateSource:true,repositoryUrl:undefined}}/>);
    expect(screen.getByRole('link',{name:'Open Sample Project website in a new tab'}).getAttribute('href')).toBe(project.liveUrl);
    expect(screen.queryByRole('link',{name:/Supporting Evidence/})).toBeNull();
    expect(screen.queryByText('ABSOLUTELY SECRET PROJECT')).toBeNull();
    expect(screen.getByText('SOURCE PRIVATE')).toBeTruthy();
  });
  it('does not add a fake destination when a public project has no live site',()=>{
    render(<ProjectCard project={{...project,liveUrl:undefined,repositoryUrl:undefined}}/>);
    expect(screen.queryByRole('link')).toBeNull();
  });
});
