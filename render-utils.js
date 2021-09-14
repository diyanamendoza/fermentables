

const containerDiv = document.getElementById('container');
const welcomeDiv = document.getElementById('welcome');

export function renderFerms(fermsTemplate) {
    for (let ferm of fermsTemplate) {
        const labelEl = document.createElement('label');
        const inputEl = document.createElement('input');
        const imageEl = document.createElement('img');
        labelEl.classList.add('ferm-label');
        inputEl.setAttribute('type', 'radio');
        inputEl.setAttribute('name', 'ferm');
        inputEl.setAttribute('value', `${ferm.baby}`);
        imageEl.src = `./assets/${ferm.images.babyHappy}`;
        imageEl.classList.add('ferm-image');

        const instructionsP = document.createElement('p');
        instructionsP.textContent = `${ferm.instructions}`;
        instructionsP.className = 'instructions';
        
        instructionsP.style.display = 'none';
        
        inputEl.addEventListener('click', () => {
            instructionsP.style.display = 'block'; 
            welcomeDiv.style.display = 'none';
        });

        labelEl.append(inputEl, imageEl);
        containerDiv.append(labelEl, instructionsP);
    }
}

export function renderWelcome() {
    const titleEl = document.createElement('h1');
    const firstP = document.createElement('p');
    const secondP = document.createElement('p');
    titleEl.textContent = 'Welcome!';
    firstP.textContent = `survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`;
    secondP.textContent = `survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`;

    welcomeDiv.append(titleEl, firstP, secondP);
}

export function renderPlayButton() {
    const playButton = document.createElement('button');
    playButton.classList = 'play-button';
    playButton.addEventListener('click', () => {
        const selectedFirm = 
    });
}
