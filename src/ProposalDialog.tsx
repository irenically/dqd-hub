import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {ArrowRight,X} from 'lucide-react';

export default function ProposalDialog({close}:{close:()=>void}){
  const [submitted,setSubmitted]=useState(false);
  const [urgency,setUrgency]=useState('');
  return <Dialog open onClose={close} aria-labelledby="proposal-title" fullWidth maxWidth="sm" className="proposal-dialog">
    <IconButton className="dialog-close" aria-label="Close proposal form" onClick={close}><X size={20}/></IconButton>
    {submitted?<div className="result"><div className="approval-stamp">APPROVED<br/>WITHOUT REVIEW</div><DialogTitle id="proposal-title" component="h2">Proposal processed.</DialogTitle><p>Congratulations. You've made the situation considerably worse.</p><p className="fine-print">This was a fictional exercise. No proposal was sent or saved.</p><Button variant="contained" onClick={close}>Return to records</Button></div>:<><DialogTitle id="proposal-title" component="h2"><span className="eyebrow">FORM DQD-17B / PUBLIC SUBMISSIONS</span><br/>Questionable Proposal</DialogTitle><DialogContent><p>This form is for ceremonial purposes only. Nothing is sent or saved.</p><form className="proposal-form" onSubmit={event=>{event.preventDefault();setSubmitted(true)}}><TextField autoFocus required fullWidth label="Proposed project name" placeholder="e.g. An app to locate my other apps" slotProps={{htmlInput:{maxLength:80}}}/><TextField required fullWidth multiline minRows={4} label="Nature of unnecessary complexity" placeholder="Describe the problem you could probably solve without software" slotProps={{htmlInput:{maxLength:500}}}/><TextField required select fullWidth label="Urgency" value={urgency} onChange={event=>setUrgency(event.target.value)}><MenuItem value="">Select urgency</MenuItem><MenuItem value="whenever">Whenever the committee gets around to it</MenuItem><MenuItem value="coffee">Before the next coffee break</MenuItem><MenuItem value="immediate">Unreasonably immediate</MenuItem></TextField><Button type="submit" variant="contained" endIcon={<ArrowRight size={17}/>}>Submit for immediate approval</Button></form></DialogContent></>}
  </Dialog>
}
