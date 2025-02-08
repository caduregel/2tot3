import { randomNames } from "../assets/randomNames";

export const generateRandomStudents = (ammount: number) => {
    const getRandomFriends = (max: number, exclude?: number): number[] => {
        const numbers = new Set<number>();

        while (numbers.size < 3) {
            const rand = Math.floor(Math.random() * (max + 1));
            if (rand !== exclude) {
                numbers.add(rand);
            }
        }

        return Array.from(numbers);
    }

    const randStudents = []
    const maxStudents = ammount
    for (let i = 0; i < maxStudents; i++) {
        const randName = randomNames[Math.floor(Math.random() * randomNames.length)]
        const randCog = Math.floor(Math.random() * 5) + 1
        const randSocial = Math.floor(Math.random() * 5) + 1
        const randGender = Math.random() < 0.5 ? "boy" : "girl"

        const randFriends = getRandomFriends(ammount, i)

        const newRandStuden = {
            index: i,
            name: randName,
            cognitive: randCog,
            social: randSocial,
            gender: randGender,
            friends: randFriends,
        }
        randStudents.push(newRandStuden)
    }
    return randStudents
}