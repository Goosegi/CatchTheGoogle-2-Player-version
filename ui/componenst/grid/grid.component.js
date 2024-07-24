import { gamePause, getGridSize, movePlayer } from '../../../core/state-manager.js';
import { CellComponent  } from './cell/Cell.component.js';
import { MOVING_DIRECTIONS } from '../../../core/constants.js';

export function GridComponent() {
    console.log('GRID COMPONENT CREATING')

    const localState = { cleanupFunctions: [] }

    const keyupHandler = (e) => {
        console.log(e.code);
        switch (e.code) {
            case 'ArrowUp': 
            movePlayer(1, MOVING_DIRECTIONS.UP); 
            break;
            case 'ArrowDown': 
            movePlayer(1, MOVING_DIRECTIONS.DOWN); 
            break;
            case 'ArrowLeft': 
            movePlayer(1, MOVING_DIRECTIONS.LEFT); 
            break;
            case 'ArrowRight': 
            movePlayer(1, MOVING_DIRECTIONS.RIGHT); 
            break;

            case 'KeyW': 
            movePlayer(2, MOVING_DIRECTIONS.UP); 
            break;
            case 'KeyS': 
            movePlayer(2, MOVING_DIRECTIONS.DOWN); 
            break;
            case 'KeyA': 
            movePlayer(2, MOVING_DIRECTIONS.LEFT); 
            break;
            case 'KeyD': 
            movePlayer(2, MOVING_DIRECTIONS.RIGHT); 
            break;

            case 'Space':
                gamePause();
            break;
        }
    }

    document.addEventListener('keyup', keyupHandler)

    const element = document.createElement('table');
    element.classList.add('table');

    render(element, localState);

    return {
        element, cleanup: () => {
            localState.cleanupFunctions.forEach(cf => cf()),
            document.removeEventListener('keyup', keyupHandler)
        }
    };
}

async function render(element, localState) {
    const gridBody = document.createElement('tbody');

    localState.cleanupFunctions.forEach(cf => cf())
    localState.cleanupFunctions = []
    console.log('Grid render')
    element.innerHTML = '';
    const gridSize = await getGridSize();

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const rowElement = document.createElement('tr')
        rowElement.classList.add('cell')

        for (let x = 0; x < gridSize.colomnsCount; x++) {
            const cellComponent = CellComponent(x, y);
            localState.cleanupFunctions.push(cellComponent.cleanup)
            rowElement.append(cellComponent.element);
        }
        gridBody.append(rowElement)

    }
    element.append(gridBody)

}