import { fermsTemplate } from './fermentables-template.js';
import { addToMistakePoints, getActionsForFermID, updateAction } from './local-storage-utils.js';


export function createFerm(baby, fermsTemplate) {
    const template = fermsTemplate.find(entry => entry.baby === baby);
    const newFerm = {};
    Object.assign(newFerm, template);
    newFerm.id = Math.ceil(Math.random() * 1000);
    return newFerm;
}

export function checkAction(action, time, fermID) {
    // get the actions for the ferm
    const actions = getActionsForFermID(fermID);
    // see if the action is in the list
    const doesActionExist = actions.find(entry => entry.action === action);
    if (!doesActionExist) {
        addToMistakePoints(fermID, 10);
    } else {
        const correctActions = actions.filter(entry => entry.action === action);
        let anyCorrectTimes = false;
        for (let entry of correctActions) {
            if (time >= entry.startDay && time < entry.endDay) {
                anyCorrectTimes = true;
                if (entry.completed) {
                    addToMistakePoints(fermID, 5);
                }
                else {
                    entry.completed = true;
                    updateAction(fermID, entry);
                }
            }
        }
        if (!anyCorrectTimes) {
            addToMistakePoints(fermID, 5);
        }
    }
}

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
    return actionNames;
}


{
    id: 3,
    baby: 'Hops',
    adult: 'Ale',
    images: {
        babySad: 'hop-baby-sad.png',
        babyNeutral: 'hop-baby-neutral.png',
        babyHappy: 'hop-baby-happy.png',
        adultSad: 'beer-adult-sad.png',
        adultNeutral: 'beer-adult-neutral.png',
        adultHappy: 'beer-adult-happy.png'
    },
    instructions: `Prepare the ingredients, sanitize your equipment, brew your ingredients, and store in a dark, cool place, all on the first day.`,
    endDay: 30,
    age: 0,
    successMessage: `That's a tasty brew! You should consider opening a microbrewery.`,
    maxXP: 20,
    mistakePoints: 0,
    actions: [
        {
            id: 1,
            action: 'prep',
            required: true,
            startDay: 0,
            endDay: 1,
            points: 0,
            completed: false
        },
        {
            id: 2,
            action: 'sanitize',
            required: true,
            startDay: 0,
            endDay: 1,
            points: 0,
            completed: false
        },
        {
            id: 3,
            action: 'brew',
            required: true,
            startDay: 0,
            endDay: 1,
            points: 0,
            completed: false
        },
        {
            id: 4,
            action: 'store in dark cool place',
            required: true,
            startDay: 0,
            endDay: 1,
            points: 0,
            completed: false
        },
        {
            id: 5,
            action: 'add priming sugar',
            required: true,
            startDay: 12,
            endDay: 17,
            points: 0,
            completed: false
        },
        {
            id: 6,
            action: 'bottle that shit',
            required: true,
            startDay: 12,
            endDay: 17,
            points: 0,
            completed: false
        },
        {
            id: 7,
            action: 'check for taste',
            required: false,
            startDay: 12,
            endDay: 30
        }


    ]
}