import {readCatalog} from './catalog';
console.table((await readCatalog()).map(p=>({case:p.caseId,name:p.name,status:p.status,visible:p.visible,source:p.source})));
