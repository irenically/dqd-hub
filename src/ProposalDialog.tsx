import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import {ArrowRight,FileText,X} from 'lucide-react';

export default function ProposalDialog({close}:{close:()=>void}){
  const [submitted,setSubmitted]=useState(false);
  const [urgency,setUrgency]=useState('');

  return <Dialog open onClose={close} aria-labelledby="proposal-title" fullWidth maxWidth="sm" className="proposal-dialog">
    <IconButton className="dialog-close" aria-label="Close proposal form" onClick={close}><X size={20}/></IconButton>
    {submitted?<div className="result">
      <div className="approval-stamp">APPROVED<br/>WITHOUT REVIEW</div>
      <h2 id="proposal-title">Proposal processed.</h2>
      <p>Congratulations. You've made the situation considerably worse.</p>
      <p className="fine-print">This was a fictional exercise. No proposal was sent or saved.</p>
      <Button variant="contained" onClick={close}>Return to records</Button>
    </div>:<>
      <header className="proposal-header">
        <div className="proposal-form-id"><FileText size={16} aria-hidden="true"/> FORM DQD-17B <span>·</span> PUBLIC SUBMISSIONS</div>
        <h2 id="proposal-title">Questionable Proposal</h2>
        <p>Submit an idea for immediate, entirely fictional approval.</p>
      </header>
      <DialogContent className="proposal-content">
        <form className="proposal-form" onSubmit={event=>{event.preventDefault();setSubmitted(true)}}>
          <div className="proposal-field">
            <label htmlFor="proposal-name">Proposed project name <span aria-hidden="true">*</span></label>
            <TextField id="proposal-name" autoFocus required fullWidth placeholder="An app to locate my other apps" slotProps={{htmlInput:{maxLength:80}}}/>
          </div>
          <div className="proposal-field">
            <label htmlFor="proposal-complexity">Nature of unnecessary complexity <span aria-hidden="true">*</span></label>
            <TextField id="proposal-complexity" required fullWidth multiline minRows={3} placeholder="Describe the problem you could probably solve without software" slotProps={{htmlInput:{maxLength:500}}}/>
          </div>
          <div className="proposal-field">
            <label id="proposal-urgency-label" htmlFor="proposal-urgency">Urgency <span aria-hidden="true">*</span></label>
            <Select id="proposal-urgency" required fullWidth displayEmpty labelId="proposal-urgency-label" value={urgency} onChange={event=>setUrgency(event.target.value)} renderValue={value=>value?({'whenever':'Whenever the committee gets around to it','coffee':'Before the next coffee break','immediate':'Unreasonably immediate'} as Record<string,string>)[value]:<span className="select-placeholder">Select an urgency</span>}>
              <MenuItem value="whenever">Whenever the committee gets around to it</MenuItem>
              <MenuItem value="coffee">Before the next coffee break</MenuItem>
              <MenuItem value="immediate">Unreasonably immediate</MenuItem>
            </Select>
          </div>
          <div className="proposal-actions">
            <p>This form is ceremonial. Nothing is sent or saved.</p>
            <Button type="submit" variant="contained" endIcon={<ArrowRight size={17}/>}>Submit for approval</Button>
          </div>
        </form>
      </DialogContent>
    </>}
  </Dialog>
}
