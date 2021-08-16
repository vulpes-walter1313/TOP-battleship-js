class App {
  constructor(id) {
    this.app = document.querySelector(id);
  }
  run() {
    const greeting = document.createElement('p');
    greeting.textContent = 'App is now running';
    this.app.appendChild(greeting);
  }
}

export default App;