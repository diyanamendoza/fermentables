// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { addToActiveFerms, addToCompletedFerms, addToMistakePoints, addXP, deactivateFerm, fastForwardGame, GAMEDATA, getActionsForFermID, getActiveFermById, getActiveFerms, getFermNameById, getGameData, getHintsRemaining, getRemainingActionsCount, getSelectedFermIndex, setActiveFerms, setFermToAdultById, setGameData, setHintsRemaining, setSelectedFermIndex, updateAction, updateActiveFerm } from '../local-storage-utils.js';

const test = QUnit.test;

test('getGameData should return the default gameData object if it doesn\'t exist in local storage', (expect) => {
    const expected = {
        xp: 0,
        unlockedFerms: 1,
        activeFerms: [],
        completedFerms: [],
        selectedFermIndex: 0
    };
    
    localStorage.removeItem(GAMEDATA);
    
    let actual = getGameData();

    expect.deepEqual(actual, expected);
});

test('getGame Data should return the stored gameData if it exists', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: {
            test: 'test'
        },
        completedFerms: {
            test2: 'test2'
        }
    };
    const expected = testData;
    localStorage.setItem(GAMEDATA, JSON.stringify(expected));

    let actual = getGameData();
    assert.deepEqual(actual, expected);
});

test('setGameData should store the gameData in local storage', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: {
            test: 'test'
        },
        completedFerms: {
            test2: 'test2'
        }
    };

    const expected = testData;
    setGameData(testData);

    const actual = JSON.parse(localStorage.getItem(GAMEDATA));
    assert.deepEqual(actual, expected);
});

test('getActiveFerms should return the active ferminations from gameData', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: {
            test: 'test'
        },
        completedFerms: {
            test2: 'test2'
        }
    };

    const expected = { test: 'test' };

    setGameData(testData);

    const actual = getActiveFerms();
    assert.deepEqual(actual, expected);
});

test('setActiveFerms should update the active fermentations in gameData', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            test: 'test'
        }],
        completedFerms: {
            test2: 'test2'
        }
    };
    const newFerms = [
        {
            asdf: 'asdf'
        },
        {
            qwer: 'qwer'
        }
    ];
    const expected = newFerms;
    setGameData(testData);
    setActiveFerms(newFerms);
    const actual = getActiveFerms();
    assert.deepEqual(actual, expected);
});

test('addToActiveFerms should add a fermenation to the active fermentations in gameData', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            test: 'test'
        }],
        completedFerms: {
            test2: 'test2'
        }
    };
    const newFerm = {
        qwer: 'qwer'
    };
    const expected = [
        {
            test: 'test'
        },
        {
            qwer: 'qwer'
        }
    ];
    setGameData(testData);
    addToActiveFerms(newFerm);
    const actual = getActiveFerms();
    assert.deepEqual(actual, expected);
});

test('deactivateFerm should move the specified active fermentation to completedFerms', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            id: 1,
            test: 'test'
        }],
        completedFerms: [{
            id: 2,
            test2: 'test2'
        }]
    };
    const expected = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [],
        completedFerms: [{
            id: 2,
            test2: 'test2'
        },
        {
            id: 1,
            test: 'test'
        }]
    };
    setGameData(testData);
    deactivateFerm(1);
    const actual = getGameData();
    assert.deepEqual(actual, expected);
});

test('addToCompletedFerms should add the fermenation to completedFerms', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            id: 1,
            test: 'test'
        }],
        completedFerms: [{
            id: 2,
            test2: 'test2'
        }]
    };
    const expected = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            id: 1,
            test: 'test'
        }],
        completedFerms: [{
            id: 2,
            test2: 'test2'
        },
        {
            id: 1,
            test: 'test'
        }]
    };
    setGameData(testData);
    addToCompletedFerms({
        id: 1,
        test: 'test'
    });
    const actual = getGameData();
    assert.deepEqual(actual, expected);
});

test('fastForwardGame increments the age of all active ferms by the amount specified', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            id: 1,
            age: 1,
            test: 'test'
        },
        {
            id: 2,
            age: 4,
            test: 'test3'
        }],
        completedFerms: [{
            id: 2,
            age: 2,
            test2: 'test2'
        }]
    };
    const expected = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            id: 1,
            age: 2,
            test: 'test'
        },
        {
            id: 2,
            age: 5,
            test: 'test3'
        }],
        completedFerms: [{
            id: 2,
            age: 2,
            test2: 'test2'
        }]
    };
    setGameData(testData);
    fastForwardGame(1);
    const actual = getGameData();
    assert.deepEqual(actual, expected);
});


test('getActiveFermByID returns the expected ferm object', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    // create a static active ferms array.
    const staticFermArr = [{
        id: 1,
        mistakePoints: 0,
        mood: 'happy'
    },
    {
        id: 2,
        mistakePoints: 10,
        mood: 'neutral'
    }];
    // save the static active ferms to local storage
    setActiveFerms(staticFermArr);
    //call get Activeferm as actual
    const actual = getActiveFermById(1);
    //set one of the ferm objects as expected
    const expected = {
        id: 1,
        mistakePoints: 0,
        mood: 'happy'
    };
    assert.deepEqual(actual, expected);
});

test('addXP adds the expected amount of XP', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        xp: 0
    };
   
    setGameData(staticGameDataObj);
   
    addXP(20);
    const actual = getGameData().xp;
    
    const expected = 20;
    assert.equal(actual, expected);
});

test('getSelectedFermIndex returns the selectedFermIndex property value from local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        selectedFermIndex: 2
    };
   
    setGameData(staticGameDataObj);
   
    const actual = getSelectedFermIndex();
    
    const expected = 2;
    assert.equal(actual, expected);
});

test('setSelectedFermIndex sets the selectedFermIndex property value in local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        selectedFermIndex: 2
    };
   
    setGameData(staticGameDataObj);
   
    setSelectedFermIndex(1);

    const actual = getSelectedFermIndex();
    const expected = 1;

    assert.equal(actual, expected);
});


test('getActionsForFermID returns the expected set of actions from local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, actions: [1, 2, 3] },
            { id: 2, actions: [4, 5, 6] }, 
            { id: 3, actions: [7, 8, 9] }, 
        ]
    };
   
    setGameData(staticGameDataObj);
   
    const actual = getActionsForFermID(2);
    const expected = [4, 5, 6];

    assert.deepEqual(actual, expected);
});

test('addToMistakePoints adds the correct amount of points to the correct ferm in local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, actions: [1, 2, 3], mistakePoints: 0 },
            { id: 2, actions: [4, 5, 6], mistakePoints: 0 }, 
        ]
    };
   
    setGameData(staticGameDataObj);

    addToMistakePoints(2, 5);
    
    const correctActual = getActiveFermById(2).mistakePoints;
    const correctExpected = 5;

    const wrongActual = getActiveFermById(1).mistakePoints;
    const wrongExpected = 0;
    
    assert.equal(correctActual, correctExpected, 'adds correct points to correct ferm');
    assert.equal(wrongActual, wrongExpected, 'doesn\'t add points to the incorrect ferm');
});

test('updateActiveFerm updates the correct ferm in local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, actions: [1, 2, 3], mistakePoints: 0 },
            { id: 2, actions: [4, 5, 6], mistakePoints: 0 }, 
        ]
    };
   
    setGameData(staticGameDataObj);

    const expected = { id: 2, actions: [9, 8, 7], mistakePoints: 8 };

    updateActiveFerm(expected);

    const actual = getActiveFermById(2);
    
    assert.deepEqual(actual, expected);
});

test('updateAction updates the correct action in local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, actions: [{ id: 1 }, { id: 2 }, { id: 3 }] },
            { id: 2, actions: [{ id: 4 }, { id: 5, updated: false }, { id: 6 }] }, 
        ]
    };
   
    setGameData(staticGameDataObj);

    updateAction(2, { id: 5, updated: true });
    
    const expected = true;
    const actual = getActionsForFermID(2)[1].updated;
    
    assert.equal(actual, expected);
});

test('getFermNameByID returns the correct ferm name from local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, baby: 'test1', adult: 'test2', isAdult: false },
            { id: 2, baby: 'test1', adult: 'test2', isAdult: true } 
        ]
    };
   
    setGameData(staticGameDataObj);
    
    const testOneExpected = 'test1';
    const testOneActual = getFermNameById(1);
    assert.equal(testOneActual, testOneExpected, 'returns baby name');
    
    const testTwoExpected = 'test2';
    const testTwoActual = getFermNameById(2);
    assert.equal(testTwoActual, testTwoExpected, 'returns adult name');
});


test('getRemainingActionsCount returns the correct number of actions from local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, actions: [1, 2] },
            { id: 2, actions: [4, 5, 6] }, 
        ]
    };
   
    setGameData(staticGameDataObj);
    
    const expected = 3;
    const actual = getRemainingActionsCount(2);

    assert.equal(actual, expected, 'returns baby name');
});

test('setFermToAdultByID updates the correct ferms isAdult property value in local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, isAdult: false },
            { id: 2, isAdult: false } 
        ]
    };
   
    setGameData(staticGameDataObj);

    setFermToAdultById(2);
    
    const expected = true;
    const actual = getActiveFermById(2).isAdult;
    assert.equal(actual, expected);
});

test('getHintsRemaining returns the correct number from local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, hintsRemaining: 4 },
            { id: 2, hintsRemaining: 3 } 
        ]
    };
   
    setGameData(staticGameDataObj);
    
    const expected = 3;
    const actual = getHintsRemaining(2);

    assert.equal(actual, expected);
});

test('setHintsRemaining updates the correct ferms hintsRemaining property value with the correct number in local storage', assert => {
    // clear local storage
    localStorage.removeItem(GAMEDATA);
    
    const staticGameDataObj = {
        activeFerms: [
            { id: 1, hintsRemaining: 4 },
            { id: 2, hintsRemaining: 3 } 
        ]
    };
   
    setGameData(staticGameDataObj);

    setHintsRemaining(2, 8);
    
    const expected = 8;
    const actual = getHintsRemaining(2);
    
    assert.equal(actual, expected);
});

