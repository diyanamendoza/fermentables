export const GAMEDATA = 'GAMEDATA';

// ***tested ✔
export function getGameData() {
    const stringGameData = localStorage.getItem(GAMEDATA);
    const parsedGameData = JSON.parse(stringGameData);
    if (!stringGameData) {
        return {
            xp: 0,
            unlockedFerms: 1,
            activeFerms: [],
            completedFerms: [],
            selectedFermIndex: 0
        };
    }
    return parsedGameData;
}

// ***tested ✔
export function setGameData(currentGameData) {
    const stringGameData = JSON.stringify(currentGameData);
    localStorage.setItem(GAMEDATA, stringGameData);
}

// ***tested ✔
export function addXP(xpToAdd) {
    const gameData = getGameData();
    gameData.xp += xpToAdd;
    setGameData(gameData);
}

// ***tested ✔
export function getSelectedFermIndex() {
    return getGameData().selectedFermIndex;
}

// ***tested ✔
export function setSelectedFermIndex(index) {
    const gameData = getGameData();
    gameData.selectedFermIndex = index;
    setGameData(gameData);
}

// ***tested ✔
export function getActiveFerms() {
    return getGameData().activeFerms;
}

// ***tested ✔
export function setActiveFerms(currentActiveFerms) {
    const currentGameData = getGameData();
    currentGameData.activeFerms = currentActiveFerms;
    setGameData(currentGameData);
}

// ***tested ✔
export function addToActiveFerms(newFerm) {
    const updatedFermsArray = [...getActiveFerms(), newFerm];
    setActiveFerms(updatedFermsArray);
}

export function getActiveFermIndex(fermId) {
    const ferms = getActiveFerms();
    return ferms.findIndex(ferm => ferm.id === fermId);
}

// ***tested ✔
export function deactivateFerm(fermID) {
    const fermsArray = getActiveFerms();
    const fermToRemove = fermsArray.find(ferm => ferm.id === fermID);
    const fermIndex = fermsArray.indexOf(fermToRemove);
    fermsArray.splice(fermIndex, 1);

    setActiveFerms(fermsArray);
    addToCompletedFerms(fermToRemove);
    return fermToRemove;
}

// ***tested ✔
export function addToCompletedFerms(ferm) {
    const currentGameData = getGameData();
    const completedFerms = [...currentGameData.completedFerms, ferm];
    currentGameData.completedFerms = completedFerms;
    setGameData(currentGameData);
}


export function getActionsForFermID(fermID) {
    const activeFerms = getActiveFerms();
    const { actions } = activeFerms.find(entry => entry.id === fermID);
    return actions;
}

// ***tested ✔
export function getActiveFermById(fermID) {
    return getActiveFerms().find(entry => entry.id === fermID);
} 

export function addToMistakePoints(fermID, pointsToAdd) {
    const ferm = getActiveFermById(fermID);
    ferm.mistakePoints += pointsToAdd;
    updateActiveFerm(ferm);
}

export function updateActiveFerm(ferm) {
    const activeFerms = getActiveFerms();
    for (let i = 0 ; i < activeFerms.length ; i++) {
        if (activeFerms[i].id === ferm.id) {
            activeFerms[i] = ferm;
        }
    }
    setActiveFerms(activeFerms);
}

export function updateAction(fermID, completedAction) {
    const ferm = getActiveFermById(fermID);
    const actions = ferm.actions;
    const actionEntry = actions.find(entry => entry.id === completedAction.id);
    const actionIndex = actions.indexOf(actionEntry);
    actions[actionIndex] = completedAction;
    updateActiveFerm(ferm);
}

// ***tested ✔
export function fastForwardGame(daysToAdd) {
    const ferms = getActiveFerms();
    for (const ferm of ferms) {
        if (!ferm.isDead)
            ferm.age += daysToAdd;
    }
    setActiveFerms(ferms);
}


export function getRemainingActionsCount(fermId) {
    const ferm = getActiveFermById(fermId);
    let count = 0;
    for (let i = 0; i < ferm.actions.length; i++) {
        if (!ferm.actions[i].completed && !ferm.actions[i].missed) {
            count++;
        }
    }
    return count;
}

export function getFermNameById(fermId) {
    const ferm = getActiveFermById(fermId);
    return ferm.isAdult ? ferm.adult : ferm.baby;
}

export function setFermToAdultById(fermId) {
    const ferm = getActiveFermById(fermId);
    ferm.isAdult = true;
    updateActiveFerm(ferm);
}

export function getHintsRemaining(fermId) {
    const ferm = getActiveFermById(fermId);
    return ferm.hintsRemaining;
}

export function setHintsRemaining(fermId, newHintsRemaining) {
    const ferm = getActiveFermById(fermId);
    ferm.hintsRemaining = newHintsRemaining;
    updateActiveFerm(ferm);
}
