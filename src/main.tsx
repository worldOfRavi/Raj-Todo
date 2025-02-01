import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from './components/theme.ts';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
      <CssBaseline />
    <App />
    </ThemeProvider>
)
