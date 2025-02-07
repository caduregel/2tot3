import { IStudent } from "../../interfaces/studentInterface";

interface IStats {
    groepsGrote: number,
    jongens: number,
    meisjes: number,
    leerlingenZonderVrienden: number[], // Veranderd naar array met IDs van leerlingen zonder vrienden
    gemiddeldCognitief: number,
    gemiddeldGedrag: number
}

function testFunction(leerlingen: IStudent[], groep1: number[], groep2: number[]) {
    // Maak lookup object voor snelle toegang tot leerling data
    const leerlingDict = Object.fromEntries(
        leerlingen.map(leerling => [leerling.index, leerling])
    );

    function analyseerGroep(groepIds: number[]) {
        // Initialiseer statistieken voor de groep
        const stats:IStats = {
            groepsGrote: 0,
            jongens: 0,
            meisjes: 0,
            leerlingenZonderVrienden: [], // Veranderd naar array met IDs van leerlingen zonder vrienden
            gemiddeldCognitief: 0,
            gemiddeldGedrag: 0
        };

        // Tel jongens en meisjes
        groepIds.forEach(id => {
            if (leerlingDict[id].gender === 'boy') {
                stats.jongens++;
            } else {
                stats.meisjes++;
            }
        });

        // Check vrienden en bereken gemiddeldes
        let totaalCognitief = 0;
        let totaalGedrag = 0;

        groepIds.forEach(id => {
            const leerling = leerlingDict[id];

            // Check of de leerling vrienden heeft in de groep
            const heeftVriendenInGroep = leerling.friends.some(vriendId =>
                groepIds.includes(vriendId)
            );

            // Als de leerling geen vrienden heeft, voeg ID toe aan de lijst
            if (!heeftVriendenInGroep) {
                stats.leerlingenZonderVrienden.push(id);
            }

            // Tel op voor gemiddeldes
            totaalCognitief += leerling.cognitive;
            totaalGedrag += leerling.social;
        });

        // Bereken gemiddeldes
        stats.gemiddeldCognitief = totaalCognitief / groepIds.length;
        stats.gemiddeldGedrag = totaalGedrag / groepIds.length;
        stats.groepsGrote = groepIds.length

        return stats;
    }

    // Analyseer beide groepen
    return {
        groep1: analyseerGroep(groep1),
        groep2: analyseerGroep(groep2)
    };
}

export default testFunction