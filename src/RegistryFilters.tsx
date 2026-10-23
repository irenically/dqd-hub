import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import {Search} from 'lucide-react';
import {statusLabels} from './lib/projectSchema';

type Props={query:string;setQuery:(value:string)=>void;department:string;setDepartment:(value:string)=>void;status:string;setStatus:(value:string)=>void;departments:string[]};

export default function RegistryFilters({query,setQuery,department,setDepartment,status,setStatus,departments}:Props){
  return <div className="filter-bar mui-filter-bar">
    <TextField className="search-box" label="Search case files" placeholder="Title, case ID, description, department or tag" value={query} onChange={event=>setQuery(event.target.value)} size="small" fullWidth slotProps={{input:{startAdornment:<InputAdornment position="start"><Search size={19} aria-hidden="true"/></InputAdornment>}}}/>
    <TextField select label="Department" value={department} onChange={event=>setDepartment(event.target.value)} size="small" fullWidth>
      <MenuItem value="">All departments</MenuItem>{departments.map(value=><MenuItem key={value} value={value}>{value}</MenuItem>)}
    </TextField>
    <TextField select label="Status" value={status} onChange={event=>setStatus(event.target.value)} size="small" fullWidth>
      <MenuItem value="">All statuses</MenuItem>{Object.entries(statusLabels).map(([value,label])=><MenuItem key={value} value={value}>{label}</MenuItem>)}
    </TextField>
  </div>
}
