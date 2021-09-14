export const fermsTemplate = [
    {
        id: 1,
        baby: 'Napa Cabbage',
        adult: 'Kimchi',
        images: {
            babySad: 'cabbage-baby-sad.png',
            babyNeutral: 'cabbage-baby-neutral.png',
            babyHappy: 'cabbage-baby-happy.png',
            adultSad: 'kimchi-adult-sad.png',
            adultNeutral: 'kimchi-adult-neutral.png',
            adultHappy: 'kimchi-adult-happy.png'
        },
        instructions: `To prep, wash and cut Napa cabbage, then soak in salt water for an hour and rinse thoroughly. Mix in kimchi seasonings. Pack down in jar and remove excess air. Leave at room temperature at least one day - look for bubbles. Ferment in fridge at least two weeks. While fermenting, check if it needs to be packed down, burp the container every few days, check for taste.`,
        endDay: 20,
        age: 0,
        successMessage: 'Woohoo! You successfully fermented your baby Napa Cabbage. Check out that happy Kimchi.',
        maxXP: 20,
        mistakePoints: 0,
        actions: [
            {
                id: 1,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                id: 2,
                action: 'add seasoning',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                id: 3,
                action: 'pack down in jar',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                id: 4,
                action: 'seal tightly',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                id: 5,
                action: 'store at room temp',
                required: true,
                startDay: 1,
                endDay: 6,
                points: 0,
                completed: false
            },
            {
                id: 6,
                action: 'check for bubbles',
                required: false,
                startDay: 1,
                endDay: 6,
                points: -5,
                completed: false
            },
            {
                id: 7,
                action: 'burp to release gas',
                required: false,
                startDay: 2,
                endDay: 20,
                points: -5,
                completed: false
            },
            {
                id: 8, 
                action: 'store in fridge',
                required: true,
                startDay: 2,
                endDay: 20,
                points: 0,
                completed: false
            },
            {
                id: 9, 
                action: 'check for taste',
                required: false,
                startDay: 2,
                endDay: 20,
                points: -5,
                completed: false
            },
        ]
    }
];
