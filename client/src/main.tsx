
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {store} from './app/store.ts';
import { Provider } from 'react-redux'
import ThemeProvider from './Components/ThemeProvider.tsx';



ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
<Provider store={store}>
  <ThemeProvider>
  <App />
   </ThemeProvider>
  </Provider>
   /* </React.StrictMode> */
)
