import { renderActionButtons } from '../game/game-render-utils.js';
import { setGameData } from '../local-storage-utils.js';

const test = QUnit.test;

test('renderActionButtons renders a div with a button for each ferm action', assert => {
    const testData = {
        activeFerms: [{
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
        }]
    };
    const expected = 
    '<div id="action-buttons-div">' +
        '<button value="asdf1" class="action-button"></button>' +
        '<button value="asdf2" class="action-button"></button>' +
        '<button value="asdf3" class="action-button"></button>' +
        '<button value="asdf4" class="action-button"></button>' +
        '<button value="qwer1" class="action-button"></button>' +
        '<button value="qwer2" class="action-button"></button>' +
        '<button value="qwer3" class="action-button"></button>' +
        '<button value="qwer4" class="action-button"></button>' +
    '</div>';
    setGameData(testData);
    const actual = renderActionButtons().outerHTML;
    assert.equal(actual, expected);
});
