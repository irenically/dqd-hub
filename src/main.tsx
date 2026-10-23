import React from 'react';
import {createRoot} from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import {StyledEngineProvider} from '@mui/material/styles';
import App from './App';
import './style.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><StyledEngineProvider enableCssLayer><GlobalStyles styles="@layer theme, base, mui, components, utilities;"/><App/></StyledEngineProvider></React.StrictMode>);
