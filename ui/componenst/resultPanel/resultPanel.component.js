import { getGooglePoints, subscribe, unsubscribe, getPlayerPoints } from "../../../core/state-manager.js";
import { EVENTS } from "../../../core/constants.js";


export function ResultPanelComponent() {
    const element = document.createElement('div');
    element.classList.add('result-container');

    const observer = (e) => {
        if (e.name === EVENTS.SCORES_CHANGED) {
            render(element);
        }
    }
    subscribe(observer)

    render(element);

    return {element, cleanup: () => {unsubscribe(observer)}};
}


async function render (element) {

    element.innerHTML = ''

    const googlePoint = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);

    const catchBlock = document.createElement('div');
    catchBlock.classList.add('result-block');

    const spanOfCatch1Player = document.createElement('span');
    spanOfCatch1Player.classList.add('result-title');
    spanOfCatch1Player.innerText = 'Player 1:';

    const spanOfCatch2Player = document.createElement('span');
    spanOfCatch2Player.classList.add('result-title');
    spanOfCatch2Player.innerText = 'Player 2:';

    const spanOfCatchResultPlayer1 = document.createElement('span');
    spanOfCatchResultPlayer1.classList.add('result');
    spanOfCatchResultPlayer1.innerText = player1Points;

    const spanOfCatchResultPlayer2 = document.createElement('span');
    spanOfCatchResultPlayer2.classList.add('result');
    spanOfCatchResultPlayer2.innerText = player2Points;

    console.log(player1Points)

    catchBlock.append(
        spanOfCatch1Player,
        spanOfCatchResultPlayer1,
        spanOfCatch2Player,
        spanOfCatchResultPlayer2
    )

    const missBlock = document.createElement('div');
    missBlock.classList.add('result-block');

    const spanOfMiss = document.createElement('span');
    spanOfMiss.classList.add('result-title');
    spanOfMiss.innerText = 'Google:';

    const spanOfMissResult = document.createElement('span');
    spanOfMissResult.classList.add('result');
    spanOfMissResult.innerText = googlePoint;

    missBlock.append(
        spanOfMiss,
        spanOfMissResult
    )



    element.append(catchBlock, missBlock);

}