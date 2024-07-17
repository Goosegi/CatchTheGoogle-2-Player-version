import { start, resetGame, getGooglePoints, getTimeOfGame, getPlayerPoints } from "../../../core/state-manager.js";

export function WinComponent() {
    const element = document.createElement('div');
    element.classList.add('modal');
    render(element)

    return {element};
}

async function render (element) {
    const googlePoint = getGooglePoints();
    const resultTimer = getTimeOfGame();
    const player1Points = getPlayerPoints(1);
    const player2Points = getPlayerPoints(2);

    const winIconConteiner = document.createElement('div');
    winIconConteiner.classList.add('modal-decoration');
    const winIcon = document.createElement('img');
    winIcon.src = "./ui/assets/images/winnerIcon.svg"
    winIcon.alt = "icon"
    winIconConteiner.append(winIcon);

    const winBlockElement = document.createElement('div');
    winBlockElement.classList.add('modal-elements');

    const winCatchAndMiss = document.createElement('div');
    winCatchAndMiss.classList.add('modal-result');

    const winTitle = document.createElement('div');
    winTitle.classList.add('title-modal');
    winTitle.textContent = 'You Win!';

    const winCongratulations = document.createElement('div');
    winCongratulations.classList.add('text-modal');
    winCongratulations.innerText = 'Congratulations'

    const winResultCatch = document.createElement('div');
    winResultCatch.classList.add('result-block');

    const spanOfCatchPlayer1 = document.createElement('span');
    spanOfCatchPlayer1.classList.add('result-title');
    spanOfCatchPlayer1.innerText = 'Player 1:';

    const spanOfCatchResultPlayer1 = document.createElement('span');
    spanOfCatchResultPlayer1.classList.add('result');
    spanOfCatchResultPlayer1.innerText = player1Points;

    const spanOfCatchPlayer2 = document.createElement('span');
    spanOfCatchPlayer2.classList.add('result-title');
    spanOfCatchPlayer2.innerText = 'Player 2:';

    const spanOfCatchResultPlayer2 = document.createElement('span');
    spanOfCatchResultPlayer2.classList.add('result');
    spanOfCatchResultPlayer2.innerText = player2Points;

    winResultCatch.append(
        spanOfCatchPlayer1,
        spanOfCatchResultPlayer1,
        spanOfCatchPlayer2,
        spanOfCatchResultPlayer2
    )

    const winResultMiss = document.createElement('div');
    winResultMiss.classList.add('result-block');

    const spanOfMiss = document.createElement('span');
    spanOfMiss.classList.add('result-title');
    spanOfMiss.innerText = 'Google :';

    const spanOfMissResult = document.createElement('span');
    spanOfMissResult.classList.add('result');
    spanOfMissResult.innerText = googlePoint;

    winResultMiss.append(
        spanOfMiss,
        spanOfMissResult
    )

    const winResultTimer = document.createElement('div');
    winResultTimer.classList.add('result-block');

    const spanOfTimer = document.createElement('span');
    spanOfTimer.classList.add('result-title');
    spanOfTimer.innerText = 'time :';

    const spanOfTimerResult = document.createElement('span');
    spanOfTimerResult.classList.add('result');
    spanOfTimerResult.innerText = `${resultTimer.minutes} min ${resultTimer.seconds} sec`;

    winResultTimer.append(
        spanOfTimer,
        spanOfTimerResult
    )

    winCatchAndMiss.append(winResultCatch, winResultMiss,winResultTimer)

    clearInterval


    const playAgainButton = document.createElement('button');
    playAgainButton.classList.add('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.addEventListener('click', () => {
        resetGame()
    })
    
    winBlockElement.append(winTitle, winCongratulations, winCatchAndMiss, playAgainButton);

    element.append(winIconConteiner, winBlockElement)
}

// spanOfCatchResult.innerText = `${resultTimer.minutes} min ${resultTimer.seconds} sec`;
