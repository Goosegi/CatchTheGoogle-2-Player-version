import { resetGame, getPlayerPoints, getGooglePoints, getTimeOfGame } from "../../../core/state-manager.js";

export function LoseComponent() {
    const element = document.createElement('div');
    element.classList.add('modal');

    render(element)

    return { element };
}

async function render(element) {
    const googlePoint = getGooglePoints();
    const player1Points = getPlayerPoints(1);
    const player2Points = getPlayerPoints(2);
    const timer = getTimeOfGame()

    console.log(player1Points)

    const loseIconContainer = document.createElement('div');
    loseIconContainer.classList.add('modal-decoration');
    const loseIcon = document.createElement('img');
    loseIcon.src = "./ui/assets/images/lossIcon.svg";

    loseIconContainer.append(loseIcon);

    const loseBlockElement = document.createElement('div');
    loseBlockElement.classList.add('modal-elements');

    const loseTitle = document.createElement('div');
    loseTitle.classList.add('title-modal');
    loseTitle.innerText = "You Lose!";

    const loseText = document.createElement('div');
    loseText.classList.add('text-modal');
    loseText.innerText = "You'll be lucky next time";

    const loseCatchAndMiss = document.createElement('div');
    loseCatchAndMiss.classList.add('modal-result');

    const loseResultPlayers = document.createElement('div');
    loseResultPlayers.classList.add('result-block');

    const spanOfPlayer1Title = document.createElement('span');
    spanOfPlayer1Title.classList.add('result-title');
    spanOfPlayer1Title.innerText = 'Player 1:';

    const spanOfPlater1Points = document.createElement('span');
    spanOfPlater1Points.classList.add('result');
    spanOfPlater1Points.innerText = player1Points;

    const spanOfPlayer2Title = document.createElement('span');
    spanOfPlayer2Title.classList.add('result-title');
    spanOfPlayer2Title.innerText = 'Player 1:';

    const spanOfPlater2Points = document.createElement('span');
    spanOfPlater2Points.classList.add('result');
    spanOfPlater2Points.innerText = player2Points;

    loseResultPlayers.append(
        spanOfPlayer1Title,
        spanOfPlater1Points,
        spanOfPlayer2Title,
        spanOfPlater2Points
    )

    const loseResultGoogle = document.createElement('div');
    loseResultGoogle.classList.add('result-block');

    const spanOfGoogle = document.createElement('span');
    spanOfGoogle.classList.add('result-title');
    spanOfGoogle.innerText = 'Google:';

    const spanOfGooglePoints = document.createElement('span');
    spanOfGooglePoints.classList.add('result');
    spanOfGooglePoints.innerText = googlePoint;

    loseResultGoogle.append(
        spanOfGoogle,
        spanOfGooglePoints
    )


    const loseTimerBlock = document.createElement('div');
    loseTimerBlock.classList.add('result-block');

    const timerTitle = document.createElement('span');
    timerTitle.classList.add('result-title');
    timerTitle.innerText = 'Time:';

    const timerResult = document.createElement('span');
    timerResult.classList.add('result');
    timerResult.innerText = `${timer.minutes} min ${timer.seconds} sec`;

    loseTimerBlock.append(
        timerTitle,
        timerResult
    )

    loseCatchAndMiss.append(loseResultPlayers, loseResultGoogle, loseTimerBlock)

    const playAgainButton = document.createElement('button');
    playAgainButton.classList.add('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
            resetGame()
    })

    loseBlockElement.append(loseTitle, loseText, loseCatchAndMiss, playAgainButton);






    element.append(loseIconContainer, loseBlockElement)
}
