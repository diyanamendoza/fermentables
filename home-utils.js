export function createFerm(baby, fermsTemplate) {
    const template = fermsTemplate.find(entry => entry.baby === baby);
    const newFerm = {};
    // :-O woow, nice work copying these objects and overwriting properties!
    // const newFerm = { ...template, id: Math.ceil(Math.random() * 1000 }
    // this would also do the trick with spreading, and is more common in the wild
    Object.assign(newFerm, template);
    newFerm.id = Math.ceil(Math.random() * 1000);
    return newFerm;
}
