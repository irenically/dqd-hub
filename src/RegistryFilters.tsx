import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {Search} from 'lucide-react';

type Props={query:string;setQuery:(value:string)=>void};

export default function RegistryFilters({query,setQuery}:Props){
  return <div className="filter-bar mui-filter-bar">
    <TextField className="search-box" label="Search case files" placeholder="Title, case ID, description, department or tag" value={query} onChange={event=>setQuery(event.target.value)} size="small" fullWidth slotProps={{input:{startAdornment:<InputAdornment position="start"><Search size={19} aria-hidden="true"/></InputAdornment>}}}/>
  </div>
}
