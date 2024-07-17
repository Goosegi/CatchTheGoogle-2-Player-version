import { EVENTS, GAME_STATUSES, MOVING_DIRECTIONS } from "./constants.js";

const _state = {
    gameStatus: GAME_STATUSES.SETTINGS,
    timer: {
        seconds: 0,
        minutes: 0,
    },
    settings: {
        googleJumpInterval: 4000,         // In milliseconds
        gridSize: {
            rowsCount: 4,
            colomnsCount: 4
        },
        pointsToLose: 5,
        pointsToWin: 10,
        sound: false,
    },
    positions: {
        player: [{ x: 0, y: 0 }, { x: 3, y: 3 }],
        google: {
            x: 1,
            y: 1
        },

    },
    points: {
        google: 0,
        players: [0, 0]
    }

}

function _getPlayerIndexByNumber(playerNumber) {
    const playerIndex = playerNumber - 1;

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Incorrect player number')
    }
    return playerIndex;
}



export function getGooglePoints() {
    return _state.points.google;
}

export function getPlayerPoints(playerNumber) {
    const playerIndex = _getPlayerIndexByNumber(playerNumber);
    return _state.points.players[playerIndex]
}


export async function getGameStatus() {

    return _state.gameStatus
}




export async function getGridSize() {
    return { ..._state.settings.gridSize };
}

export async function getGooglePosition() {
    return { ..._state.positions.google };
}

export async function getPlayerPosition(playerNumber) {
    const playerIndex = _getPlayerIndexByNumber(playerNumber);
    return { ..._state.positions.player[playerIndex] }
}

function _GenerateNewPosition(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _JumpGoogleToNewPosition() {
    const newPosition = { ..._state.positions.google }

    do {
        newPosition.x = _GenerateNewPosition(0, _state.settings.gridSize.colomnsCount - 1)
        newPosition.y = _GenerateNewPosition(0, _state.settings.gridSize.rowsCount - 1)



    } while (_doesPositionMathWithPlayer1Position(newPosition)
    || _doesPositionMathWithPlayer2Position(newPosition)
        || _doesPositionMathWithGooglePosition(newPosition))
    _state.positions.google = newPosition
}


let timerInterval;

export function timer() {
    timerInterval = setInterval(() => {
        _state.timer.seconds++
        if (_state.timer.seconds === 60) {
            _state.timer.minutes++;
            _state.timer.seconds = 0;
        }
}, 1000)
}

export function getTimeOfGame() {
    return {..._state.timer}
}

let googleJumpInterval;


export async function start() {
    _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
    timer()

    _state.positions.player[0] = { x: 0, y: 0 };
    _state.positions.player[1] = {
        x: _state.settings.gridSize.colomnsCount - 1,
        y: _state.settings.gridSize.rowsCount - 1
    };
    _JumpGoogleToNewPosition();

    console.log('Game status start')
    _JumpGoogleToNewPosition();
    _notifySubscribers(EVENTS.GOOGLE_JUMPED)

    _state.points.google = 0;
    _state.points.players = [0, 0];

    googleJumpInterval = setInterval(() => {
        const oldPosition = { ..._state.positions.google }
        _JumpGoogleToNewPosition();
        _notifySubscribers(EVENTS.GOOGLE_JUMPED, {
            oldPosition,
            newPosition: { ..._state.positions.google }
        })
        _state.points.google++;
        _notifySubscribers(EVENTS.SCORES_CHANGED)

        if (_state.points.google === _state.settings.pointsToLose) {
            clearInterval(timerInterval);
            clearInterval(googleJumpInterval);
            _state.gameStatus = GAME_STATUSES.LOSE;
            _notifySubscribers(EVENTS.STATUS_CHANGED)
        }

        if ( _state.settings.sound === true ) {
            const clickSound = new Audio('./ui/assets/sounds/miss.mp3');
            clickSound.play();
            }
    }, _state.settings.googleJumpInterval),
        _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
    _notifySubscribers(EVENTS.STATUS_CHANGED)
}




let _subscribers = [];

export function subscribe(callback) {
    _subscribers.push(callback)
}

export function unsubscribe(callback) {
    _subscribers = _subscribers.filter(c => c !== callback)
}


function _notifySubscribers(name, payload = {}) {
    const event = {
        name,
        payload,
    }
    _subscribers.forEach(callback => {
        try {
            callback(event);
        } catch (error) {
            console.error(error);
        }
    });
}

function _catchGoogle(playerNumber) {
    const playerIndex = _getPlayerIndexByNumber(playerNumber)

    _state.points.players[playerIndex]++
    _notifySubscribers(EVENTS.SCORES_CHANGED)
    _notifySubscribers(EVENTS.GOOGLE_CAUGHT)

    if ( _state.settings.sound === true ) {
        const clickSound = new Audio('./ui/assets/sounds/catch.wav');
        clickSound.play();
        }

    if (_state.points.players[playerIndex] === _state.settings.pointsToWin) {
        _state.gameStatus = GAME_STATUSES.WIN
        _notifySubscribers(EVENTS.STATUS_CHANGED)
        clearInterval(timerInterval)
        clearInterval(googleJumpInterval)
    } else {
        const oldPosition = _state.positions.google;
        _JumpGoogleToNewPosition()
        _notifySubscribers(EVENTS.GOOGLE_JUMPED, {
            oldPosition,
            newPosition: _state.positions.google
        })
    }
}

export async function resetGame() {
    _state.timer.seconds = 0;
    _state.timer.minutes = 0;
    _state.settings.gridSize.colomnsCount = 4;
    _state.settings.gridSize.rowsCount = 4;
    _state.settings.sound = false;
    _state.points.google = 0;
    _state.points.players = [0, 0];
    _state.gameStatus = GAME_STATUSES.SETTINGS;
    clearInterval(googleJumpInterval);
    console.log('restart')
    _notifySubscribers(EVENTS.STATUS_CHANGED);
}

export function SwitchGridSize(size) {
    _state.settings.gridSize.rowsCount = size;
    _state.settings.gridSize.colomnsCount = size;
}

export function SwitchPointsToWin(points) {
    _state.settings.pointsToWin = points;
}

export function SwitchPointsToLose(points) {
    _state.settings.pointsToLose = points;
}

export function getSoundStatus() {
    return _state.settings.sound
}

export function SoundStatus(switchSound) {
    _state.settings.sound = switchSound;
}

function _doesPositionMathWithPlayer1Position(newPosition) {
    return newPosition.x === _state.positions.player[0].x && newPosition.y === _state.positions.player[0].y
}

function _doesPositionMathWithPlayer2Position(newPosition) {
    return newPosition.x === _state.positions.player[1].x && newPosition.y === _state.positions.player[1].y
}

function _doesPositionMathWithGooglePosition(newPosition) {
    return newPosition.x === _state.positions.google.x && newPosition.y === _state.positions.google.y
}

function _isPositionInValidRange(position) {
    if (position.x < 0 || position.x >= _state.settings.gridSize.colomnsCount) return false;
    if (position.y < 0 || position.y >= _state.settings.gridSize.rowsCount) return false;

    return true;
}

export async function movePlayer(playerNumber, direction) {
    if (_state.gameStatus !== GAME_STATUSES.IN_PROGRESS) {
        console.warn('You can move player only when game is in progress');
        return;
    }

    const playerIndex = _getPlayerIndexByNumber(playerNumber)
    const oldPosition = { ..._state.positions.player[playerIndex] }
    const newPosition = { ..._state.positions.player[playerIndex] }

    switch (direction) {
        case MOVING_DIRECTIONS.UP:
            newPosition.y--;
            break;
        case MOVING_DIRECTIONS.DOWN:
            newPosition.y++;
            break;
        case MOVING_DIRECTIONS.LEFT:
            newPosition.x--;
            break;
        case MOVING_DIRECTIONS.RIGHT:
            newPosition.x++;
            break;
    }

    const isValidRange = _isPositionInValidRange(newPosition);
    if (!isValidRange) return;

    const isPlayer1PositionTheSame = _doesPositionMathWithPlayer1Position(newPosition)
    if (isPlayer1PositionTheSame) return;

    const isPlayer2PositionTheSame = _doesPositionMathWithPlayer2Position(newPosition)
    if (isPlayer2PositionTheSame) return;

    const isGooglePositionTheSame = _doesPositionMathWithGooglePosition(newPosition);
    if (isGooglePositionTheSame) {
        _catchGoogle(playerNumber)
    }

    _state.positions.player[playerIndex] = newPosition
    _notifySubscribers(EVENTS[`PLAYER${playerNumber}_MOVED`], {
        oldPosition: oldPosition,
        newPosition: newPosition
    })
}
