import { GAME_STATUSES } from "../../core/constants.js";
import { getGameStatus, subscribe } from "../../core/state-manager.js";
import { LoseComponent } from "./Lose/Lose.component.js";
import { GridComponent } from "./grid/grid.component.js";
import { ResultPanelComponent } from "./resultPanel/resultPanel.component.js";
import { SettingComponent } from "./setting/settings.component.js";
import { StartComponent } from "./Start/Start.component.js";
import { WinComponent } from "./Win/Win.component.js";

export function AppComponent() {
    const localState = {prevGameStatus: null, cleanupFunctions: []}
    const element = document.createElement('section');
    element.classList.add('container');

    subscribe(() => {
        render(element, localState);
    })

    render(element, localState)

    return { element };
}

async function render(element, localState) {
    let mainComponent = document.createElement('div');
    mainComponent.classList.add('main-elements');

    const gameStatus = await getGameStatus();

    if (localState.prevGameStatus === gameStatus) return;
    localState.prevGameStatus = gameStatus;

    console.log('APP RENDERING')
    localState.cleanupFunctions.forEach(cf => cf())
    localState.cleanupFunctions = []

    element.innerHTML = '';

    switch (gameStatus) {
        case GAME_STATUSES.SETTINGS: {
            const settingComponent = await SettingComponent()
            const startComponent = await StartComponent()
            mainComponent.append(startComponent.element);
            element.append(
                settingComponent.element,
                mainComponent
            );
        }
            break;
        case GAME_STATUSES.IN_PROGRESS:
            mainComponent.classList.add('main-elements');
            const resultPanelComponent = await ResultPanelComponent()
            const gridComponent = await GridComponent()
            localState.cleanupFunctions.push(resultPanelComponent.cleanup)
            localState.cleanupFunctions.push(gridComponent.cleanup)

            mainComponent.append(resultPanelComponent.element,gridComponent.element);
            element.append(
                mainComponent
            );
            break;
        case GAME_STATUSES.LOSE:
            const loseComponent = await LoseComponent()
            mainComponent.append(loseComponent.element);
            element.append(mainComponent);
            break;
        case GAME_STATUSES.WIN:
            const winComponent = await WinComponent()
            mainComponent.append(winComponent.element);
            element.append(mainComponent);
            break;  
        default:
            throw new Error('Incorrect game status')

    }


}