
// Runs XP Gain Animation.
// Used in updateState function in game-utils.js.
// See games-styles.css line ~181.
export function runXPGainAnim(fermId, rewardXp){
    // Grabs ferm img element.
    const fermEl = document.getElementById(fermId);

    // Grabs ferm img elements parent(label) element. 
    const parentEl = fermEl.parentElement;

    // Creates p element.
    const elP = document.createElement('p');

    //  Adds gain-xp class to p element.
    elP.classList.add('gain-xp');

    // Adds appropriate reward xp to textcontent of p element.
    elP.textContent = `+${rewardXp}`;

    // Hides the ferm img.
    fermEl.style.display = 'none';

    //Appends p element to label element.
    parentEl.append(elP);
}


// Runs Fast Forward Animation.
// Used in render(OneDay, OneWeek, OneMonth)FFButtons functions.
// See game-styles.css line ~235.
export function runFFAnim(){
    // Grabs HTML elements.
    const htmlEls = document.getElementsByTagName('html');
    // Grabs HTML element from node-list.
    const htmlEl = htmlEls[0];
    // Grabs body elements.
    const bodyEls = document.getElementsByTagName('body');
    // Grabs body element from node-list.
    const bodyEl = bodyEls[0];
    
    // To prevent rendering extra imgs: could check if html classlist already contains anim-ff-color before attempting to render another img.
    // Creates an img element.
    const imgEl = document.createElement('img');
    
    // Adds anim-ff-color class to HTML element for color fading animation.
    htmlEl.classList.add('anim-ff-color');
    // Adds anim-ff-drop-moon class to img element for moon animation.
    imgEl.classList.add('anim-ff-drop-moon');
    
    // Sets img elements source to appropriate image.
    imgEl.src = '../assets/moon-and-stars-transparent-5.png';
    
    // Appends img element to body element
    bodyEl.prepend(imgEl);
    
    // After 2.5 seconds...
    setTimeout(() => {
        // Remove img element from body element.
        bodyEl.removeChild(imgEl);
        // Remove anim-ff-color class from HTML element. 
        htmlEl.classList.remove('anim-ff-color');
    }, 2500);
}

