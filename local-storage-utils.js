export const GAMEDATA = 'GAMEDATA';

export function getGameData() {
    const stringGameData = localStorage.getItem(GAMEDATA);
    const parsedGameData = JSON.parse(stringGameData);
    if (!stringGameData) { return {
        xp: 0,
        unlockedFerms: 1,
        activeFerms: [],
        completedFerms: [],
    };
    }
    return parsedGameData;
}

export function setGameData(currentGameData) {
    const stringGameData = JSON.stringify(currentGameData);
    localStorage.setItem(GAMEDATA, stringGameData);
}

export function getActiveFerms() {
    return getGameData().activeFerms;
}

export function setActiveFerms(currentActiveFerms) {
    const currentGameData = getGameData();
    currentGameData.activeFerms = currentActiveFerms;
    setGameData(currentGameData);
}

export function addToActiveFerms(newFerm) {
    const updatedFermsArray = [...getActiveFerms(), newFerm];
    setActiveFerms(updatedFermsArray);
}

export function deactivateFerm(fermID) {
    const fermsArray = getActiveFerms();
    const fermToRemove = fermsArray.find(ferm => ferm.id === fermID);
    const fermIndex = fermsArray.indexOf(fermToRemove);
    fermsArray.splice(fermIndex, 1);

    setActiveFerms(fermsArray);
    addToCompletedFerms(fermToRemove);
    return fermToRemove;
}

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
