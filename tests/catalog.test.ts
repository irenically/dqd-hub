import {describe,it,expect} from 'vitest';
import {filterProjects,visibleProjects} from '../src/lib/projectFilters';
import {catalogSchema,statusLabels,type Project} from '../src/lib/projectSchema';
import {syncCatalog,type Repo} from '../scripts/github';
import {nextCase,serialize} from '../scripts/catalog';

const base:Project={id:'manual-1',slug:'sample',caseId:'DQD-001',source:'manual',classification:'public',visible:true,name:'Sample',department:'Research',description:'A complicated answer',observation:'Very official',status:'proposed',tags:['test']};
const repo:Repo={id:42,name:'example',full_name:'owner/example',html_url:'https://github.com/owner/example',description:'GitHub copy',homepage:null,topics:['dqd-project'],stargazers_count:3,archived:false,fork:false,private:false,owner:{login:'owner'}};
describe('founding project',()=>{
  it('appears first without changing assigned case numbers',()=>{
    const founding={...base,id:'noura',slug:'noura',caseId:'DQD-004',name:'Noura',foundingProject:true};
    expect(visibleProjects([base,founding]).map(p=>p.caseId)).toEqual(['DQD-004','DQD-001']);
  });
  it('allows only one founding project',()=>{
    expect(()=>catalogSchema.parse([base,{...base,id:'a',slug:'a',caseId:'DQD-002',foundingProject:true},{...base,id:'b',slug:'b',caseId:'DQD-003',foundingProject:true}])).toThrow();
  });
});
describe('public catalog',()=>{it('excludes hidden records from search and count',()=>{const hidden={...base,id:'manual-2',caseId:'DQD-002',visible:false,name:'Secret'};expect(visibleProjects([base,hidden])).toHaveLength(1);expect(filterProjects([base,hidden],'Secret','','')).toHaveLength(0)});it('combines query, department and status',()=>{expect(filterProjects([base],'test','Research','proposed')).toHaveLength(1);expect(filterProjects([base],'test','Other','proposed')).toHaveLength(0)});it('maps every status',()=>{expect(Object.keys(statusLabels)).toHaveLength(4)});it('rejects duplicate case IDs',()=>{expect(()=>catalogSchema.parse([base,{...base,id:'other',slug:'other'}])).toThrow()});it('allows a visible secret record but rejects links and GitHub metadata',()=>{const secret={...base,classification:'secret' as const};expect(catalogSchema.parse([secret])[0].visible).toBe(true);expect(catalogSchema.parse([{...secret,liveUrl:'https://example.com'}])[0].liveUrl).toBe('https://example.com');expect(()=>catalogSchema.parse([{...secret,repositoryUrl:'https://github.com/private/repo'}])).toThrow()})});
describe('intake',()=>{it('creates hidden stable case files',()=>{const result=syncCatalog([base],[repo],[],'discover');expect(result.projects[1]).toMatchObject({id:'github-42',caseId:'DQD-005',classification:'public',visible:false,source:'github'});expect(nextCase(result.projects)).toBe('DQD-006')});it('is idempotent and preserves editorial fields',()=>{const first=syncCatalog([base],[repo],[],'discover');const second=syncCatalog(first.projects,[repo],[],'discover');expect(second.report.updated).toEqual([]);expect(serialize(second.projects)).toBe(serialize(first.projects));expect(second.projects[1].description).toBe('GitHub copy')});it('updates a rename by numeric ID',()=>{const first=syncCatalog([],[repo],[],'discover').projects;const renamed={...repo,name:'new-name',full_name:'owner/new-name',html_url:'https://github.com/owner/new-name'};const second=syncCatalog(first,[renamed],[],'sync').projects;expect(second).toHaveLength(1);expect(second[0].name).toBe('example');expect(second[0].github?.name).toBe('new-name');expect(second[0].repositoryUrl).toBe(renamed.html_url)});it('retains ineligible repositories and ignores excluded IDs',()=>{const first=syncCatalog([],[repo],[],'discover').projects;expect(syncCatalog(first,[],[],'sync').projects).toEqual(first);expect(syncCatalog([], [repo],[42],'discover').projects).toEqual([])});it('does not change manual records in sync',()=>{expect(syncCatalog([base],[repo],[],'sync').projects).toEqual([base])})});

