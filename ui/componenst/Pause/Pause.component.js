export function PauseComponent(){
    const element = document.createElement('div');
    const pauseText = document.createElement('span')
    pauseText.classList.add('pause')

    pauseText.innerText = "Game Pause"

    element.append(pauseText)

    return element;
}   