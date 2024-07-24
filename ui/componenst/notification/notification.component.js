

export function Notification(){
    const element = document.createElement('div');
    const notificationText = document.createElement('span')
    notificationText.classList.add('notification')

    notificationText.innerText = "Player 1 controls WASD, player 2 controls arrows. Use space for pause game"
    

    const notificationButton = document.createElement('button');
    notificationButton.classList.add('notificationButton');
    notificationButton.textContent = 'OK';
    notificationButton.addEventListener('click', () => {
            element.innerHTML = ''
    })
    notificationText.append(notificationButton);


    element.append(notificationText)

    return element;
}