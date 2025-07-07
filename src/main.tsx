import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import "modern-normalize";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './components/App/App'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
