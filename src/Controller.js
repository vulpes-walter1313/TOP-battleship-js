class Controller {
  static cleanElement(parent) {
    while (parent.firstElementChild) {
      parent.removeChild(parent.firstElementChild);
    }
  }

  static insertAfter(parent, child) {
    parent.appendChild(child);
  }
}

export default Controller;