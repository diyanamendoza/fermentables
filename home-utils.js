export function createFerm(baby, fermsTemplate) {
    const template = fermsTemplate.find(entry => entry.baby === baby);
    const newFerm = {};
    Object.assign(newFerm, template);
    newFerm.id = Math.ceil(Math.random() * 1000);
    return newFerm;
}
