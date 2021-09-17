import { renderActionButtons, renderFFOneDayButton, renderFFOneWeekButton } from '../game/game-render-utils.js';
import { setGameData } from '../local-storage-utils.js';
import { setDataForGetAllActionNames } from '../game/game-utils.js';

const test = QUnit.test;

test('renderActionButtons renders a div with a button for each ferm action', assert => {
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
    const expected = 
    '<div id="action-buttons-div">' +
        '<button value="asdf1" class="action-button">asdf1</button>' +
        '<button value="asdf2" class="action-button">asdf2</button>' +
        '<button value="asdf3" class="action-button">asdf3</button>' +
        '<button value="asdf4" class="action-button">asdf4</button>' +
        '<button value="qwer1" class="action-button">qwer1</button>' +
        '<button value="qwer2" class="action-button">qwer2</button>' +
        '<button value="qwer3" class="action-button">qwer3</button>' +
        '<button value="qwer4" class="action-button">qwer4</button>' +
    '</div>';
    setDataForGetAllActionNames(testData);
    setGameData(testData);
    const actual = renderActionButtons().outerHTML;
    assert.equal(actual, expected);
});

test('renderFFOneDayButton renders a fast forward one day button', assert => {
    const expected = '<button id="ff-one-day-button" class="ff-button">fast forward one day</button>';
    const actual = renderFFOneDayButton().outerHTML;
    assert.equal(actual, expected);
});

test('renderFFOneWeekButton renders a fast forward one day button', assert => {
    const expected = '<button id="ff-one-week-button" class="ff-button">fast forward one week</button>';
    const actual = renderFFOneWeekButton().outerHTML;
    assert.equal(actual, expected);
});
