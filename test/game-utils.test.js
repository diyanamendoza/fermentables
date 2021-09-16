import { evaluateMistakePoints, getAllActionNames, setDataForGetAllActionNames } from '../game/game-utils.js';
import { GAMEDATA, getActiveFermById, getActiveFermIndex, setActiveFerms } from '../local-storage-utils.js';

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

//evaluateMistakePoints
test('evaluateMistakePoints doesnt change mood', assert => {
    //Empty storage
    localStorage.removeItem(GAMEDATA);
    //Create a ferm to be stored with mistakePoints
    const staticFermObj = [{
        id: 1,
        mistakePoints: 0,
        mood: 'happy'
    }];
    //Push new ferm to active storage.
    setActiveFerms(staticFermObj);
    //Call evaluateMistakePoints
    evaluateMistakePoints(1);
    //Check the ferm in local storage to see that mood is what is expected.
    const expected = 'happy';

    const actual = getActiveFermById(1).mood;
    
    assert.equal(actual, expected);
});

test('evaluateMistakePoints changes mood to neutral', assert => {
    localStorage.removeItem(GAMEDATA);

    const staticFermObj = [{
        id: 2,
        mistakePoints: 9,
        mood: 'happy'
    }];

    setActiveFerms(staticFermObj);

    evaluateMistakePoints(2);

    const expected = 'neutral';
    const actual = getActiveFermById(2).mood;

    assert.equal(actual, expected);
});

test('evaluateMistakePoints changes mood to sad', assert => {
    
    localStorage.removeItem(GAMEDATA);
    
    const staticFermObj = [{
        id: 3,
        mistakePoints: 11,
        mood: 'happy'
    }];
    
    setActiveFerms(staticFermObj);
    
    evaluateMistakePoints(3);
    
    const expected = 'sad';
    const actual = getActiveFermById(3).mood;

    assert.equal(actual, expected);
});

test('evaluateMistakePoints changes mood to sad and sets isDead to true', assert => {
   
    localStorage.removeItem(GAMEDATA);
    
    const staticFermObj = [{
        id: 3,
        mistakePoints: 21,
        mood: 'happy',
        isDead: false
    }];
    
    setActiveFerms(staticFermObj);
    
    evaluateMistakePoints(3);
 
    const expected1 = 'sad';
    const actual1 = getActiveFermById(3).mood;

    const expected2 = true;
    const actual2 = getActiveFermById(3).isDead;

    assert.equal(actual1, expected1);
    assert.equal(actual2, expected2);
});
