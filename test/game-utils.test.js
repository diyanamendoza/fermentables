import { checkAction, getAllActionNames, setDataForGetAllActionNames } from '../game/game-utils.js';
import { getGameData, setGameData } from '../local-storage-utils.js';

const test = QUnit.test;

test('checkAction works correctly', assert => {
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
    checkAction('prep', 1);
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
    checkAction('burp', 1);
    actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction applies 10 mistake points if the action doesn\'t exist for the ferm');

    //checkAction applies any care points that the action gives if the correct action was chosen
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
    checkAction('prep', 1);
    actual = getGameData(testData);
    assert.deepEqual(actual, expected, 'checkAction applies 10 mistake points if the action doesn\'t exist for the ferm');
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
