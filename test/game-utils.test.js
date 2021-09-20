import { checkAction, evaluateMistakePoints, getAllActionNames, setDataForGetAllActionNames } from '../game/game-utils.js';
import { GAMEDATA, getActiveFermById, getGameData, setActiveFerms, setGameData } from '../local-storage-utils.js';

const test = QUnit.test;
const skip = QUnit.skip;

skip('checkAction works correctly', assert => {
    //checkAction applies 5 mistake points if the action was already completed
    let testData = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 0,
            age: 0,
            actions: [
                {
                    action: 'prep',
                    completed: true,
                    startDay: 0,
                    endDay: 1,
                    id: 1,
                    required: true
                }
            ]
        }]
    };
    let expected = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 5,
            age: 0,
            mood: 'neutral',
            actions: [
                {
                    id: 1,
                    action: 'prep',
                    completed: true,
                    startDay: 0,
                    endDay: 1,
                    required: true
                }
            ]
        }]
    };
    setGameData(testData);
    const result1 = checkAction('prep', 1);
    let actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction applies 5 mistake points if the action was already completed');

    //checkAction applies 10 mistake points if the action doesn't exist for the ferm
    testData = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 0,
            age: 0,
            mood: 'happy',
            actions: [
                {
                    action: 'prep',
                    completed: true,
                    startDay: 0,
                    endDay: 1,
                    id: 1,
                    required: true
                }
            ]
        }]
    };
    expected = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 10,
            age: 0,
            mood: 'neutral',
            actions: [
                {
                    id: 1,
                    action: 'prep',
                    completed: true,
                    startDay: 0,
                    endDay: 1,
                    required: true
                }
            ]
        }]
    };
    setGameData(testData);
    const result2 = checkAction('burp', 1);
    actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction applies 10 mistake points if the action doesn\'t exist for the ferm');

    //checkAction applies any care points the action gives if the correct action was chosen
    testData = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 0,
            age: 0,
            mood: 'happy',
            actions: [
                {
                    action: 'prep',
                    completed: false,
                    startDay: 0,
                    endDay: 1,
                    id: 1,
                    required: true,
                    carePoints: -5
                }
            ]
        }]
    };
    expected = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: -5,
            age: 0,
            mood: 'happy',
            actions: [
                {
                    id: 1,
                    action: 'prep',
                    completed: true,
                    startDay: 0,
                    endDay: 1,
                    required: true,
                    carePoints: -5
                }
            ]
        }]
    };
    setGameData(testData);
    const result3 = checkAction('prep', 1);
    actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction applies any care points the action gives if the correct action was chosen');

    //checkAction makes the ferm an adult if the correct action was selected and action.makesAdult=true
    testData = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 0,
            age: 0,
            mood: 'happy',
            isAdult: false,
            actions: [
                {
                    action: 'prep',
                    completed: false,
                    startDay: 0,
                    endDay: 1,
                    id: 1,
                    required: true,
                    carePoints: -5,
                    makesAdult: true
                }
            ]
        }]
    };
    expected = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: -5,
            age: 0,
            mood: 'happy',
            isAdult: true,
            actions: [
                {
                    id: 1,
                    action: 'prep',
                    completed: true,
                    startDay: 0,
                    endDay: 1,
                    required: true,
                    carePoints: -5,
                    makesAdult: true
                }
            ]
        }]
    };
    setGameData(testData);
    checkAction('prep', 1);
    actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction makes the ferm an adult if the correct action was selected and action.makesAdult=true');

    //applies 5 mistake points if action exists but it was done on the wrong day
    testData = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 0,
            age: 1,
            mood: 'happy',
            isAdult: false,
            actions: [
                {
                    action: 'prep',
                    completed: false,
                    startDay: 0,
                    endDay: 1,
                    id: 1,
                    required: true,
                    carePoints: -5,
                    makesAdult: true
                }
            ]
        }]
    };
    expected = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 5,
            age: 1,
            mood: 'neutral',
            isAdult: false,
            actions: [
                {
                    id: 1,
                    action: 'prep',
                    completed: false,
                    startDay: 0,
                    endDay: 1,
                    required: true,
                    carePoints: -5,
                    makesAdult: true
                }
            ]
        }]
    };
    setGameData(testData);
    const result5 = checkAction('prep', 1);
    actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction applies 5 mistake points if action exists but it was done on the wrong day');

    //updates the mood of the ferm to reflect the new mistakePoints value
    testData = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 0,
            age: 1,
            mood: 'happy',
            isAdult: false,
            actions: [
                {
                    action: 'prep',
                    completed: false,
                    startDay: 0,
                    endDay: 1,
                    id: 1,
                    required: true,
                    carePoints: -5,
                    makesAdult: true
                }
            ]
        }]
    };
    expected = {
        xp: 1,
        activeFerms: [{
            id: 1,
            mistakePoints: 5,
            age: 1,
            mood: 'neutral',
            isAdult: false,
            actions: [
                {
                    id: 1,
                    action: 'prep',
                    completed: false,
                    startDay: 0,
                    endDay: 1,
                    required: true,
                    carePoints: -5,
                    makesAdult: true
                }
            ]
        }]
    };
    setGameData(testData);
    checkAction('prep', 1);
    actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction updates the mood of the ferm to reflect the new mistakePoints value');

    
    assert.deepEqual(result1, false, 'checkAction returns false if the action was already completed');
    assert.deepEqual(result2, false, 'checkAction returns false if the action doesn\'t exist for the ferm');
    assert.deepEqual(result3, true, 'checkAction return true if the correct action was chosen');
    assert.deepEqual(result5, false, 'checkAction return false if the action exists but it was done on the wrong day');
});

test('getAllActionNamesForFerms should return an array containing all possibles actions for the current activeFerms', assert => {
    const testData = [
        {
            id: 1,
            actions: [
                {
                    action: 'asdf1'
                },
                {
                    action: 'asdf2'
                },
                {
                    action: 'asdf3'
                },
                {
                    action: 'asdf4'
                }
            ]
        },
        {
            id: 2,
            actions: [
                {
                    action: 'qwer1'
                },
                {
                    action: 'qwer2'
                },
                {
                    action: 'qwer3'
                },
                {
                    action: 'qwer4'
                }
            ]
        }
    ];
    const expected = ['asdf1', 'asdf2', 'asdf3', 'asdf4', 'qwer1', 'qwer2', 'qwer3', 'qwer4'];
    setDataForGetAllActionNames(testData);
    const actual = getAllActionNames();
    assert.deepEqual(actual, expected);
});

test('getAllActionNames should not return duplicates', assert => {
    const testData = [
        {
            id: 1,
            actions: [
                {
                    action: 'asdf1'
                },
                {
                    action: 'asdf1'
                },
                {
                    action: 'asdf1'
                },
                {
                    action: 'asdf1'
                }
            ]
        },
        {
            id: 2,
            actions: [
                {
                    action: 'qwer1'
                },
                {
                    action: 'qwer2'
                },
                {
                    action: 'qwer3'
                },
                {
                    action: 'qwer4'
                }
            ]
        }
    ];
    const expected = ['asdf1', 'qwer1', 'qwer2', 'qwer3', 'qwer4'];
    setDataForGetAllActionNames(testData);
    const actual = getAllActionNames();
    assert.deepEqual(actual, expected);
});

//evaluateMistakePoints
test('evaluateMistakePoints doesnt change mood', assert => {
    //Empty storage
    localStorage.removeItem(GAMEDATA);
    //Create a ferm to be stored with mistakePoints
    const staticFermObj = [{
        id: 1,
        mistakePoints: 0,
        mood: 'happy'
    },
    {
        id: 2,
        mistakePoints: 9,
        mood: 'happy'
    },
    {
        id: 3,
        mistakePoints: 11,
        mood: 'happy'
    },
    {
        id: 4,
        mistakePoints: 21,
        mood: 'happy',
        isDead: false
    }
    ];
    //Push new ferm to active storage.
    setActiveFerms(staticFermObj);
    //Call evaluateMistakePoints
    evaluateMistakePoints(1);
    //Check the ferm in local storage to see that mood is what is expected.
    const expected = 'happy';
    const actual = getActiveFermById(1).mood;
    assert.equal(actual, expected, 'is happy');

    evaluateMistakePoints(2);
    const expectedTwo = 'neutral';
    const actualTwo = getActiveFermById(2).mood;
    assert.equal(actualTwo, expectedTwo);

    evaluateMistakePoints(3);
    const expectedThree = 'sad';
    const actualThree = getActiveFermById(3).mood;
    assert.equal(actualThree, expectedThree);

    evaluateMistakePoints(4);
    const expectedFour = 'sad';
    const actualFour = getActiveFermById(4).mood;
    const expectedFive = true;
    const actualFive = getActiveFermById(4).isDead;
    assert.equal(actualFour, expectedFour, 'Mood is sad');
    assert.equal(actualFive, expectedFive, 'isDead is true');
});



