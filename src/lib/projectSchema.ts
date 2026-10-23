import { z } from 'zod';

const optionalUrl = z.string().url().regex(/^https?:\/\//).optional();
export const statusSchema = z.enum(['proposed','in-development','operational','archived']);
export const projectSchema = z.object({
  id:z.string().min(1),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),caseId:z.string().regex(/^DQD-\d{3,}$/),
  source:z.enum(['github','manual']),classification:z.enum(['public','secret']),privateSource:z.boolean().optional(),visible:z.boolean(),name:z.string().min(1),department:z.string().min(1),description:z.string().min(1),observation:z.string().min(1),
  status:statusSchema,tags:z.array(z.string().min(1)),thumbnail:z.string().optional(),liveUrl:optionalUrl,repositoryUrl:optionalUrl,
  github:z.object({repositoryId:z.number().int().positive(),owner:z.string().min(1),name:z.string().min(1),fullName:z.string().min(1),description:z.string().optional(),homepage:z.string().optional(),topics:z.array(z.string()),stars:z.number().int().nonnegative(),archived:z.boolean()}).optional()
}).superRefine((project,context)=>{if(project.source==='github'&&!project.github)context.addIssue({code:'custom',message:'GitHub projects need metadata'});if(project.source==='manual'&&project.github)context.addIssue({code:'custom',message:'Manual projects cannot have GitHub metadata'});if(project.classification==='secret'&&(project.source!=='manual'||project.repositoryUrl||project.github))context.addIssue({code:'custom',message:'Secret projects must be manual records without repository links or GitHub metadata'});if(project.privateSource&&(project.source!=='manual'||project.repositoryUrl||project.github))context.addIssue({code:'custom',message:'Private source cannot include repository links or GitHub metadata'});});
export const catalogSchema=z.array(projectSchema).superRefine((projects,context)=>{
  for(const key of ['id','slug','caseId'] as const){const seen=new Set<string>();projects.forEach((p,i)=>{if(seen.has(p[key]))context.addIssue({code:'custom',path:[i,key],message:`Duplicate ${key}`});seen.add(p[key]);});}
  const seenRepo=new Set<number>();projects.forEach((p,i)=>{if(p.github){if(seenRepo.has(p.github.repositoryId))context.addIssue({code:'custom',path:[i,'github','repositoryId'],message:'Duplicate repository ID'});seenRepo.add(p.github.repositoryId);}});
});
export type Project=z.infer<typeof projectSchema>;
export type ProjectStatus=z.infer<typeof statusSchema>;
export const statusLabels:Record<ProjectStatus,string>={proposed:'Proposed Incident','in-development':'Under Investigation',operational:'Miraculously Operational',archived:'Filed Under Regret'};
