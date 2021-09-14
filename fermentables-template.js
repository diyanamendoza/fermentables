export const fermsTemplate = [
    {
        id: 1,
        baby: 'Napa Cabbage',
        adult: 'Kimchi',
        images: {
            babySad: 'cabbage-baby-sad.png',
            babyNeutral: 'cabbage-baby-neutral.png',
            babyHappy: 'cabbage-baby-happy.png',
            adultSad: 'kimchi-adult-sad.png'
        },
        instructions: `
        Wash and cut Napa cabbage. Soak and rinse cabbage in salt water multiple times. Mix in kimchi seasonings. Pack down in jar and remove excess air. Leave at room temperature at least one day. Let ferment in fridge at least two weeks. While fermenting, check if it needs to be packed down, burp the container every few days.
        `,
        endDay: 14,
        age: 0,
        successMessage: 'wow gj :^)',
        maxXP: 20,
        mistakePoints: 0,
        actions: [
            {
                id: 1234,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                action: 'pack',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0
            },
            {
                action: 'store in fridge',
                required: false,
                startDay: 1,
                endDay: 2,
                completed: false,
                points: 5
            },
            {
                action: 'store in fridge', //user gets less points because they put it in too late
                required: false,
                startDay: 2,
                endDay: 3,
                points: 3
            },
            {
                action: 'add salt',
                starDay: 0,
                endDay: 1000,
                points: -20
            }
        ]
    }
];
