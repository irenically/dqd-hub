import {cleanup,fireEvent,render,screen,within} from '@testing-library/react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import RegistryFilters from '../src/RegistryFilters';
import ProposalDialog from '../src/ProposalDialog';

afterEach(cleanup);

describe('MUI registry search',()=>{
  it('keeps search wired to the catalog state',()=>{
    const setQuery=vi.fn();
    render(<RegistryFilters query="" setQuery={setQuery}/>);
    fireEvent.change(screen.getByRole('textbox',{name:'Search case files'}),{target:{value:'Noura'}});
    expect(setQuery).toHaveBeenCalledWith('Noura');
    expect(screen.queryByRole('combobox',{name:'Department'})).toBeNull();
    expect(screen.queryByRole('combobox',{name:'Status'})).toBeNull();
  });
});

describe('MUI proposal dialog',()=>{
  it('keeps the proposal fictional and shows approval after valid input',()=>{
    render(<ProposalDialog close={vi.fn()}/>);
    fireEvent.change(screen.getByRole('textbox',{name:/Proposed project name/}),{target:{value:'An elaborate spoon tracker'}});
    fireEvent.change(screen.getByRole('textbox',{name:/Nature of unnecessary complexity/}),{target:{value:'Track every spoon in the house.'}});
    fireEvent.mouseDown(screen.getByRole('combobox',{name:/Urgency/}));
    fireEvent.click(within(screen.getByRole('listbox')).getByRole('option',{name:'Unreasonably immediate'}));
    fireEvent.click(screen.getByRole('button',{name:/Submit for approval/}));
    expect(screen.getByText(/APPROVED/)).toBeTruthy();
    expect(screen.getByText(/No proposal was sent or saved/)).toBeTruthy();
  });
});
