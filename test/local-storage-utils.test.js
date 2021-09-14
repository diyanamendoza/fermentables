// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { addToActiveFerms, addToCompletedFerms, deactivateFerm, fastForwardGame, GAMEDATA, getActiveFerms, getGameData, setActiveFerms, setGameData } from '../local-storage-utils.js';

const test = QUnit.test;

test('getGameData should return the default gameData object if it doesn\'t exist in local storage', (expect) => {
    const expected = {
        xp: 0,
        unlockedFerms: 1,
        activeFerms: [],
        completedFerms: [],
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

test('deactiveFerm should move the specified active fermentation to completedFerms', assert => {
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
