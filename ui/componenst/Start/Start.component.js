import { start } from "../../../core/state-manager.js";


export function StartComponent() {
    const element = document.createElement('div');
    element.classList.add('main-element');

    render(element)

    return {element};
}

async function render (element) {
    const button = document.createElement('button');
    element.classList.add('button');
    element.classList.add('main-button')
    

    button.innerText = "Start Game";
    button.addEventListener('click', () => {
        
        start()
    })
    element.append(button);    
}
