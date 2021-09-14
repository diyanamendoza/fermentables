import { getAllActionNames, setDataForGetAllActionNames } from '../utils.js';

const test = QUnit.test;

/*
test('checkAction should add 5 mistake points if the action was already completed', assert => {
    const testData = {
        xp: 1,
        unlockedFerms: 2,
        activeFerms: [{
            id: 1,
            
        }],
        completedFerms: [{
            id: 2,
            test2: 'test2'
        }]
    };
});
*/

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
