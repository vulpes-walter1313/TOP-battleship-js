import './sass/styles.scss';
import App from './App.js';
console.log("i'm in...");

function startApp() {
  const app = new App('#app');
  app.run();
}

document.addEventListener('DOMContentLoaded', startApp);