import {createTheme} from '@mui/material/styles';

export function createDepartmentTheme(mode:'dark'|'light'){
  const dark=mode==='dark';
  return createTheme({
    palette:{
      mode,
      primary:{main:dark?'#C9A0DC':'#79538E',contrastText:dark?'#17151F':'#FFFBF5'},
      background:{default:dark?'#17151F':'#F6F0E8',paper:dark?'#24202E':'#FFFBF5'},
      text:{primary:dark?'#F1EAF2':'#30273A',secondary:dark?'#B7AAC2':'#74677C'},
      divider:dark?'#4D4158':'#D6C9D7',
    },
    typography:{fontFamily:'"Space Grotesk", sans-serif',button:{textTransform:'none',fontWeight:700}},
    shape:{borderRadius:8},
  });
}
