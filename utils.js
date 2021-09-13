
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

export function createFerm(baby, fermsTemplate) {
    const template = fermsTemplate.find(entry => entry.baby === baby);
    const newFerm = {};
    Object.assign(newFerm, template);
    newFerm.id = Math.ceil(Math.random() * 1000);
    return newFerm;
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

    return fermToRemove;
}

export function updateCompletedFerms(ferm) {
    const currentGameData = getGameData();
    const completedFerms = [...currentGameData, ferm];
    currentGameData.completedFerms = completedFerms;
    setGameData(currentGameData);
}

export function getActionsForFermID(fermID) {
    const activeFerms = getActiveFerms();
    const { timeline } = activeFerms.find(entry => entry.id === fermID);
    return timeline;
}

export function checkAction(action, time, fermID) {
    // get the actions for the ferm
    getActionsForFermID(fermID);
    // see if the action is in the list

    // if not, lose points, return; if so, move on to check time

    // if time is correct 

    // 
}
