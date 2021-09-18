import { fermsTemplate } from '../fermentables-template.js';
import { displayMessage, reRenderGamePage } from './game-render-utils.js';
import { addToMistakePoints, addXP, deactivateFerm, getActionsForFermID, getActiveFermById, getActiveFerms, getFermNameById, updateAction, updateActiveFerm } from '../local-storage-utils.js';
import { updateNavXP } from '../render-utils.js';
import { runXPGainAnim } from '../anim-utils.js';

// ***tested ✔
//Determines what mood and aliveness the ferm
//should have based on mistake points
export function evaluateMistakePoints(fermID) {
    const ferm = getActiveFermById(fermID);
    if (!ferm.isDead) {
        let mood = 'happy';
        if (ferm.mistakePoints > 0 && ferm.mistakePoints <= 10) {
            mood = 'neutral';
        } else if (ferm.mistakePoints > 10 && ferm.mistakePoints <= 20) {
            mood = 'sad';
        } else if (ferm.mistakePoints > 20) {
            mood = 'sad';
            ferm.isDead = true;
        }
        ferm.mood = mood;
        updateActiveFerm(ferm);
    }
}

//This function should be called after a fast
//forward button is used. It will loop through
//all active ferms and check for missed actions,
//apply mistakePoints and update the mood, if the
//missed action was required, isDead will be set
//to true. 
//DYLAN
export function updateState() {
    const ferms = getActiveFerms();
    //loop through each active ferm
    for (const ferm of ferms) {
        //find missed actions
        for (const action of ferm.actions) {
            if (ferm.age >= action.endDay && !action.completed && !action.missed) {
                //missed action
                if (action.required) {
                    //kill
                    if (!ferm.isDead) {
                        ferm.isDead = true;
                        ferm.mood = 'sad';
                        const fermName = getFermNameById(ferm.id);
                        displayMessage(`Your ${fermName} is now dead.`);
                        updateActiveFerm(ferm);
                    }
                } else {
                    //dock points
                    ferm.mistakePoints += action.mistakePoints;
                }
                //ensure user isn't affected by missing an action multiple times.
                action.missed = true;
            }
        }
        if (ferm.age >= ferm.endDay && !ferm.isDead && !ferm.completed) {
            ferm.completed = true;
            runXPGainAnim(ferm.id, ferm.rewardXP);
            displayMessage(ferm.successMessage + ` You gained ${ferm.rewardXP} xp.`);
            addXP(ferm.rewardXP);
            console.log('hi');
            // Is this still needed?
            deactivateFerm(ferm.id);
            updateActiveFerm(ferm);
            // Shouldn't this be on line 68.5? 
            setTimeout(() => {
                reRenderGamePage();
            }, 1250)
        }
        //update mood
        evaluateMistakePoints(ferm.id);
    }
    // rerender nav to show updated XP
    updateNavXP();
}

//tested ✔
//checkAction handles the user selecting an action for a ferm. It does the
//following:
//--applies 10 mistake points if the action doesn't exist for the ferm
//--applies 5 mistake points if the action was already completed
//--applies any care points the action gives if the correct action was
//    chosen
//--makes the ferm an adult if the correct action was selected and it makes the
//    ferm an adult
//--applies 5 mistake points if action exists but it was done on the wrong day
//--updates the mood of the ferm to reflect the new mistakePoints value
//--returns true if it was a correct action, returns false if it wasn't
//DYLAN
export function checkAction(actionName, fermID) {
    // get the actions for the ferm
    const ferm = getActiveFermById(fermID);
    const actions = ferm.actions;
    let result = true;
    // see if the action is in the list
    const doesActionExist = actions.find(entry => entry.action === actionName);
    // find out if the action is out of sequence
    let isNotInOrder = false;
    for (let action of actions) {
        if (action.sequence && doesActionExist) {
            if (action.sequence < doesActionExist.sequence && !action.completed) {
                isNotInOrder = true;
            }
        }
    }
    if (!doesActionExist) {
        //the action doesn't exist for this ferm, apply 10 mistake points
        addToMistakePoints(fermID, 10);
        //signal that this was an incorrect action
        result = false;
    } else {
        //the action does exist for this ferm
        const matchingActions = actions.filter(entry => entry.action === actionName);
        let anyCorrectTimes = false;
        //loop through all instances of actions that match actionName
        for (let entry of matchingActions) {
            //check if this action is on the correct day
            if (ferm.age >= entry.startDay && ferm.age < entry.endDay) {
                //this action entry was specified for this day
                //store that there was a correct action found for other penalties
                anyCorrectTimes = true;
                if (entry.completed) {
                    //apply 5 mistake points if the action was already completed
                    addToMistakePoints(fermID, 5);
                    //signal that this was an incorrect action
                    result = false;
                } else if (isNotInOrder) {
                    // gives mistake points for failing to be in sequence.
                    addToMistakePoints(fermID, 10);
                    result = false;
                } else {
                    //action was clicked on correct day and it hasn't
                    //been completed yet.

                    //add the negative care points that were set on the action.
                    //these should counteract minor mistakes
                    ferm.mistakePoints += entry.carePoints;
                    //signal that this was a correct action
                    entry.completed = true;

                    //change the ferm to adult if this step makes
                    //the ferm an adult
                    if (entry.makesAdult) {
                        ferm.isAdult = true;
                    }
                    //store the change to entry.completed
                    updateAction(fermID, entry);
                    updateActiveFerm(ferm);
                }
            }
        }
        //check if no matching actions were found for this day
        if (!anyCorrectTimes) {
            //apply 5 mistake points if action exists but it was done on the wrong day
            addToMistakePoints(fermID, 5);
            //signal that this was an incorrect ation;
            result = false;
        }
    }
    //update mood
    evaluateMistakePoints(ferm.id);
    return result;
}

// ***tested ✔
let fermData;
//this is just a wrapper to make testing easier.
export function getAllActionNames() {
    if (!fermData) {
        fermData = fermsTemplate;
    }
    return getAllActionNamesForFerms(fermData);
}

//hacky way to inject different data for testing
export function setDataForGetAllActionNames(data) {
    fermData = data;
}

// ***tested ✔
//Returns an array of all action names with no duplicates.
//Currently it only pulls actions from activeFerms.
export function getAllActionNamesForFerms(arrayOfFerms) {
    let actionNames = [];
    for (const ferm of arrayOfFerms) {
        for (const action of ferm.actions) {
            const existingEntry = actionNames.find(name => name === action.action);
            if (!existingEntry) {
                actionNames.push(action.action);
            }
        }
    }
    actionNames.sort();
    return actionNames;
}

    //Returns the correct action, 'FF1', or 'FF7'
export function getCorrectOptionForFerm(fermId) {
    const ferm = getActiveFermById(fermId);
    const actions = getActionsForFermID(fermId);
    for (const action of actions) {
        if (ferm.age >= action.startDay && ferm.age < action.endDay) {
            if (!action.completed) {
                return action.action;
            }
        }
    }
    for (const action of actions) {
        if (ferm.age + 1 >= action.startDay && ferm.age + 1 < action.endDay) {
            return 'FF1';
        }
    }
    for (const action of actions) {
        if (ferm.age + 1 >= action.startDay && ferm.age + 1 < action.endDay) {
            return 'FF7';
        }
    }
    return 'FF7';
}

// Needs to be tested
export function getRandomOption() {
    const allActions = getAllActionNames();
    allActions.push('FF1');
    allActions.push('FF7');
    const randomIndex = Math.floor(Math.random() * allActions.length);
    return allActions[randomIndex];
}

// Needs to be tested
export function getUniqueRandomOption(arrayOfOtherOptions) {
    let newOption = getRandomOption();
    let unique = false;
    while (!unique) {
        let allUnique = true;
        for (const otherOption of arrayOfOtherOptions) {
            if (newOption === otherOption) {
                allUnique = false;
            }
        }
        if (!allUnique) {
            newOption = getRandomOption();
        } else {
            unique = true;
        }
    }
    return newOption;
}
