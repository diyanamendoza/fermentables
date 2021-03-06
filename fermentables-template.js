export const fermsTemplate = [
    {
        id: 1,
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
        instructions: `Prep the beets. Add the ingredients and then water to a jar. Let the jar ferment for 7 days. Open the jar every day and skim any scum that has formed. On the eighth day, strain the beets from your delicious salty beet water.`,
        endDay: 10,
        age: 0,
        successMessage: 'Kak krasivo comrade! Your Beet Kvass is excellent!',
        rewardXP: 20,
        unlockXP: 0,
        mistakePoints: 0,
        isDead: false,
        hintsRemaining: 3,
        actions: [
            {
                id: 1,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 0,
                sequence: 1
            },
            {
                id: 2,
                action: 'add ingredients',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 0,
                sequence: 2
            },
            {
                id: 4,
                action: 'add water',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 0,
                sequence: 3
            },
            {
                id: 5,
                action: 'skim scum',
                required: false,
                startDay: 1,
                endDay: 2,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 1
            },
            {
                //fully updated example
                id: 52,
                action: 'give a loving kiss',
                required: false,
                startDay: 1,
                endDay: 9,
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
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 5
            },
            {
                id: 7,
                action: 'skim scum',
                required: false,
                startDay: 3,
                endDay: 4,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 5
            },
            {
                id: 8,
                action: 'skim scum',
                required: false,
                startDay: 4,
                endDay: 5,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 5
            },
            {
                id: 9,
                action: 'skim scum',
                required: false,
                startDay: 5,
                endDay: 6,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 5
            },
            {
                id: 10,
                action: 'skim scum',
                required: false,
                startDay: 6,
                endDay: 7,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 5
            },
            {
                id: 11,
                action: 'skim scum',
                required: false,
                startDay: 7,
                endDay: 8,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 5
            },
            {
                id: 12,
                action: 'strain',
                required: true,
                startDay: 7,
                endDay: 10,
                completed: false,
                makesAdult: true,
                missed: false,
                carePoints: 0,
                mistakePoints: 0,
                sequence: 4
            }
        ]
    },
    {
        id: 2,
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
        instructions: `Prepare the ingredients, sanitize your equipment, brew your ingredients, and store in a dark, cool place, all on the first day. Wait roughly two weeks, then add nutrients and bottle that shit. After this you can check for taste if you want.`,
        endDay: 30,
        age: 0,
        mood: 'happy',
        isAdult: false,
        successMessage: `That's a tasty brew! You should consider opening a microbrewery.`,
        rewardXP: 20,
        unlockXP: 20,
        mistakePoints: 0,
        isDead: false,
        hintsRemaining: 3,
        actions: [
            {
                id: 1,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                sequence: 1
            },
            {
                id: 2,
                action: 'sanitize',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                sequence: 2
            },
            {
                id: 3,
                action: 'brew',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                sequence: 3
            },
            {
                id: 4,
                action: 'store in a cool dark place',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                sequence: 4
            },
            {
                id: 5,
                action: 'add nutrients',
                required: true,
                startDay: 12,
                endDay: 17,
                completed: false,
                sequence: 5
            },
            {
                id: 6,
                action: 'bottle that shit',
                required: true,
                startDay: 12,
                endDay: 17,
                completed: false,
                makesAdult: true,
                sequence: 6
            },
            {
                id: 7,
                action: 'check for taste',
                required: false,
                startDay: 12,
                endDay: 30,
                mistakePoints: 0,
                carePoints: -5,
                missed: false
            }
        ]
    },
    {
        id: 3,
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
        instructions: `Prep the cabbage with salt. Add and mix in kimchi ingredients. Pack down in jar and seal tightly. Store at room temperature at least one day - look for bubbles. To ferment, store in fridge at least two weeks. While fermenting, check if it needs to be packed down, burp the container as needed, and check for taste.`,
        endDay: 20,
        age: 0,
        successMessage: 'Woohoo! You successfully fermented your baby Napa Cabbage. Check out that happy Kimchi.',
        rewardXP: 20,
        unlockXP: 40,
        mistakePoints: 0,
        isDead: false,
        mood: 'happy',
        hintsRemaining: 3,
        actions: [
            {
                id: 1,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                sequence: 1
            },
            {
                id: 2,
                action: 'add ingredients',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                sequence: 2
            },
            {
                id: 3,
                action: 'pack down',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                sequence: 3
            },
            {
                id: 4,
                action: 'seal tightly',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                sequence: 4
            },
            {
                id: 5,
                action: 'store at room temp',
                required: true,
                startDay: 0,
                endDay: 6,
                completed: false,
                missed: false,
                sequence: 5
            },
            {
                id: 6,
                action: 'check for bubbles',
                required: false,
                startDay: 1,
                endDay: 20,
                mistakePoints: 5,
                carePoints: -5,
                completed: false,
                missed: false
            },
            {
                id: 7,
                action: 'burp to release gas',
                required: false,
                startDay: 2,
                endDay: 20,
                mistakePoints: 5,
                carePoints: -5,
                completed: false,
                missed: false
            },
            {
                id: 8, 
                action: 'store in fridge',
                required: true,
                startDay: 1,
                endDay: 20,
                completed: false,
                missed: false,
                makesAdult: true,
                sequence: 6
            },
            {
                id: 9, 
                action: 'check for taste',
                required: false,
                startDay: 2,
                endDay: 20,
                mistakePoints: 5,
                carePoints: -5,
                completed: false,
                missed: false
            },
            {
                id: 34,
                action: 'pack down',
                required: false,
                startDay: 2,
                endDay: 20,
                carePoints: -5,
                completed: false,
                missed: false
            },
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
        instructions: `You need to prep Wort, sanitize all of your equipment, add ingredients. To improve the final quality, store in a dark cool place and add nutrients on day 2 and 3, aerate every two days for the first week, check for taste on 3rd, 4th, 5th, and 6th month.`,
        endDay: 180,
        age: 0,
        successMessage: 'Woohoo! You successfully fermented your baby Wort. Check out that happy Mead.',
        rewardXP: 20,
        unlockXP: 60,
        mistakePoints: 0,
        mood: 'happy',
        isAdult: false,
        isDead: false,
        hintsRemaining: 3,
        actions: [
            {
                id: 1,
                action: 'prep',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                sequence: 1
            },
            {
                id: 20,
                action: 'sanitize',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                sequence: 2
            },
            {
                id: 23,
                action: 'add ingredients',
                required: true,
                startDay: 0,
                endDay: 1,
                completed: false,
                missed: false,
                carePoints: 0,
                mistakePoints: 0,
                sequence: 3
            },
            {
                id: 76,
                action: 'store in a cool dark place',
                required: false,
                startDay: 0,
                endDay: 120,
                mistakePoints: 5,
                carePoints: -5,
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
                action: 'aerate',
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
                action: 'aerate',
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
                action: 'aerate',
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
                action: 'bottle that shit',
                required: false,
                startDay: 14,
                endDay: 21,
                mistakePoints: 0.25,
                carePoints: -1,
                completed: false,
                missed: false,
                makesAdult: true
            },
            {
                id: 9, 
                action: 'check for taste',
                required: false,
                startDay: 90,
                endDay: 95,
                mistakePoints: 5,
                carePoints: -5,
                completed: false,
                missed: false
            },
            {
                id: 10, 
                action: 'check for taste',
                required: false,
                startDay: 120,
                endDay: 125,
                carePoints: -5,
                mistakePoints: 5,
                completed: false,
                missed: false
            },
            {
                id: 11, 
                action: 'check for taste',
                required: false,
                startDay: 150,
                endDay: 155,
                carePoints: -5,
                mistakePoints: 5,
                completed: false,
                missed: false
            },
            {
                id: 12, 
                action: 'check for taste',
                required: false,
                startDay: 180,
                endDay: 185,
                carePoints: -5,
                mistakePoints: 5,
                completed: false,
                missed: false
            },
        ]
    }    
];
