import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log('main.tsx: Starting React app initialization');

try {
  const rootElement = document.getElementById("root");
  console.log('main.tsx: Root element found:', !!rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  createRoot(rootElement).render(<App />);
  console.log('main.tsx: React app rendered successfully');
} catch (error) {
  console.error('main.tsx: Fatal error during initialization:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: red;">Erro ao inicializar a aplicação</h1>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${error instanceof Error ? error.message : String(error)}</pre>
      <p>Por favor, recarregue a página ou <a href="/">volte para a página inicial</a>.</p>
    </div>
  `;
}
