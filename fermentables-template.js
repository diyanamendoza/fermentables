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
        isDead: false,
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
            }
        ]
    },
    {
        id: 2,
        baby: 'Honey',
        adult: 'Mead',
        images: {
            babySad: 'honey-baby-sad.png',
            babyNeutral: 'honey-baby-neutral.png',
            babyHappy: 'honey-baby-happy.png',
            adultSad: 'mead-adult-sad.png',
            adultNeutral: 'mead-adult-neutral.png',
            adultHappy: 'mead-adult-happy.png'
        },
        instructions: `To prep Wort, sanitize all of your equipment, add honey and water. Soak yeast and nutrients in warm water for 20 minutes before adding to Wort. Mix until homogenous. Add nutrients on day 2 and 3. Stir/Mix every two days for the first week. Leave at room temperature out of direct sunlight. Check for taste on 3rd, 4th, 5th, and 6th month.`,
        endDay: 180,
        age: 0,
        successMessage: 'Woohoo! You successfully fermented your baby Wort. Check out that happy Mead.',
        maxXP: 20,
        mistakePoints: 0,
        mood: 'happy',
        isAdult: false,
        isDead: false,
        actions: [
            {
                id: 1,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                // points: 0,
                completed: false,
                missed: false
            },
            {
                id: 2,
                action: 'add yeast and nutrients',
                required: true,
                startDay: 0,
                endDay: 1,
                // points: 0,
                completed: false,
                missed: false
            },
            {
                id: 3,
                action: 'mix',
                required: true,
                startDay: 0,
                endDay: 1,
                // points: 0,
                completed: false,
                missed: false
            },
            {
                id: 4,
                action: 'add nutrients',
                required: false,
                startDay: 2,
                endDay: 3,
                mistakePoints: 0.25,
                carePoints: -1,
                completed: false,
                missed: false
            },
            {
                id: 5,
                action: 'add nutrients',
                required: false,
                startDay: 3,
                endDay: 4,
                mistakePoints: 0.25,
                carePoints: -1,
                completed: false,
                missed: false
            },
            {
                id: 6,
                action: 'mix',
                required: false,
                startDay: 3,
                endDay: 4,
                mistakePoints: 0.25,
                carePoints: -1,
                completed: false,
                missed: false
            },
            {
                id: 7,
                action: 'mix',
                required: false,
                startDay: 5,
                endDay: 6,
                mistakePoints: 0.25,
                carePoints: -1,
                completed: false,
                missed: false
            },
            {
                id: 7,
                action: 'mix',
                required: false,
                startDay: 7,
                endDay: 8,
                mistakePoints: 0.25,
                carePoints: -1,
                completed: false,
                missed: false
            },
            {
                id: 8,
                action: 'switch containers',
                required: false,
                startDay: 14,
                endDay: 21,
                mistakePoints: 0.25,
                carePoints: -1,
                completed: false,
                missed: false
            },
            {
                id: 9, 
                action: 'check for taste',
                required: true,
                startDay: 90,
                endDay: 95,
                // mistakePoints: 0.25,
                // carePoints: -1,
                completed: false,
                missed: false
            },
            {
                id: 10, 
                action: 'check for taste',
                required: true,
                startDay: 120,
                endDay: 125,
                // points: -5,
                completed: false,
                missed: false
            },
            {
                id: 11, 
                action: 'check for taste',
                required: true,
                startDay: 150,
                endDay: 155,
                // points: -5,
                completed: false,
                missed: false
            },
            {
                id: 12, 
                action: 'check for taste',
                required: true,
                startDay: 180,
                endDay: 185,
                // points: -5,
                completed: false,
                missed: false
            },
        ]
    },
    {
        id: 4,
        baby: 'Beet',
        adult: 'Beet Kvass',
        images: {
            babySad: 'beet-baby-sad.png',
            babyNeutral: 'beet-baby-neutral.png',
            babyHappy: 'beet-baby-happy.png',
            adultSad: 'kvass-adult-sad.png',
            adultNeutral: 'kvass-adult-neutral.png',
            adultHappy: 'kvass-adult-happy.png'
        },
        isAdult: false,
        mood: 'happy',
        instructions: `Prep the beets. Add the beets, salt and water to a jar. Let the jar ferment for 7 days. Open the jar every day and skim any scum that has formed. On the eighth day, strain the beets from your delicious salty beet water.`,
        endDay: 8,
        age: 0,
        successMessage: 'Kak krasivo comrade! Your Beet Kvass is excellent!',
        maxXP: 20,
        mistakePoints: 0,
        isDead: false,
        actions: [
            {
                id: 1,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false
            },
            {
                id: 2,
                action: 'add beets',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false
            },
            {
                id: 3,
                action: 'add salt',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false
            },
            {
                id: 4,
                action: 'add water',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false
            },
            {
                id: 5,
                action: 'skim scum',
                required: false,
                startDay: 1,
                endDay: 2,
                completed: false,
                carePoints: 0,
                mistakePoints: 1
            },
            {
                //fully updated example
                id: 52,
                action: 'give a loving kiss',
                required: false,
                startDay: 1,
                endDay: 2,
                completed: false,
                missed: false,
                carePoints: -2, //negative is good
                mistakePoints: 0
            },
            {
                id: 6,
                action: 'skim scum',
                required: false,
                startDay: 2,
                endDay: 3,
                completed: false
            },
            {
                id: 7,
                action: 'skim scum',
                required: false,
                startDay: 3,
                endDay: 4,
                completed: false
            },
            {
                id: 8,
                action: 'skim scum',
                required: false,
                startDay: 4,
                endDay: 5,
                completed: false
            },
            {
                id: 9,
                action: 'skim scum',
                required: false,
                startDay: 5,
                endDay: 6,
                completed: false
            },
            {
                id: 10,
                action: 'skim scum',
                required: false,
                startDay: 6,
                endDay: 7,
                completed: false
            },
            {
                id: 11,
                action: 'skim scum',
                required: false,
                startDay: 7,
                endDay: 8,
                completed: false,
            },
            {
                id: 12,
                action: 'strain beets',
                required: true,
                startDay: 8,
                endDay: 9,
                completed: false,
                makesAdult: true
            }
        ]
    },
    {
        id: 3,
        baby: 'Hops',
        adult: 'Ale',
        images: {
            babySad: 'hop-baby-sad.png',
            babyNeutral: 'hop-baby-neutral.png',
            babyHappy: 'hop-baby-happy.png',
            adultSad: 'beer-adult-sad.png',
            adultNeutral: 'beer-adult-neutral.png',
            adultHappy: 'beer-adult-happy.png'
        },
        instructions: `Prepare the ingredients, sanitize your equipment, brew your ingredients, and store in a dark, cool place, all on the first day.`,
        endDay: 30,
        age: 0,
        successMessage: `That's a tasty brew! You should consider opening a microbrewery.`,
        maxXP: 20,
        mistakePoints: 0,
        isDead: false,
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
                action: 'sanitize',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                id: 3,
                action: 'brew',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                id: 4,
                action: 'store in dark cool place',
                required: true,
                startDay: 0,
                endDay: 1,
                points: 0,
                completed: false
            },
            {
                id: 5,
                action: 'add priming sugar',
                required: true,
                startDay: 12,
                endDay: 17,
                points: 0,
                completed: false
            },
            {
                id: 6,
                action: 'bottle that shit',
                required: true,
                startDay: 12,
                endDay: 17,
                points: 0,
                completed: false
            },
            {
                id: 7,
                action: 'check for taste',
                required: false,
                startDay: 12,
                endDay: 30
            }
        ]
    }
];
