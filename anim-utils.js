
//Runs XP Gain Animation
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