import { IStudent } from "../../interfaces/studentInterface";

export interface IStats {
  groepsGrote: number;
  jongens: number;
  meisjes: number;
  leerlingenZonderVrienden: number[]; // Veranderd naar array met IDs van leerlingen zonder vrienden
  gemiddeldCognitief: number;
  gemiddeldGedrag: number;
  duplicates: number[];
}

function testFunction(leerlingen: IStudent[], groups: number[][]) {
  // Maak lookup object voor snelle toegang tot leerling data
  const leerlingDict = Object.fromEntries(
    leerlingen.map((leerling) => [leerling.index, leerling]),
  );
  function analyseerGroep(groepIds: number[]) {
    // Initialiseer statistieken voor de groep
    const stats: IStats = {
      groepsGrote: 0,
      jongens: 0,
      meisjes: 0,
      leerlingenZonderVrienden: [], // Veranderd naar array met IDs van leerlingen zonder vrienden
      gemiddeldCognitief: 0,
      gemiddeldGedrag: 0,
      duplicates: []
    };

    // Tel jongens en meisjes
    groepIds.forEach((id) => {
      if (leerlingDict[id].gender === "boy") {
        stats.jongens++;
      } else {
        stats.meisjes++;
      }
    });

    const duplicates = groepIds.filter((item, index) => groepIds.indexOf(item) !== index);
    if (duplicates.length > 0) {
      stats.duplicates = duplicates;
    }
    // Check vrienden en bereken gemiddeldes
    let totaalCognitief = 0;
    let totaalGedrag = 0;

    groepIds.forEach((id) => {
      const leerling = leerlingDict[id];

      // Check of de leerling vrienden heeft in de groep
      const heeftVriendenInGroep = leerling.friends.some((vriendId) =>
        groepIds.includes(vriendId),
      );

      // Als de leerling geen vrienden heeft, voeg ID toe aan de lijst
      if (!heeftVriendenInGroep) {
        stats.leerlingenZonderVrienden.push(id);
      }

      // check for duplicates

      // Tel op voor gemiddeldes
      totaalCognitief += leerling.cognitive;
      totaalGedrag += leerling.social;
    });

    // Bereken gemiddeldes
    stats.gemiddeldCognitief = totaalCognitief / groepIds.length;
    stats.gemiddeldGedrag = totaalGedrag / groepIds.length;
    stats.groepsGrote = groepIds.length;
    return stats;
  }

  const analysedGroups: IStats[] = [];

  groups.forEach((group: number[]) => {
    analysedGroups.push(analyseerGroep(group));
  });
  // Analyseer beide groepen
  return analysedGroups;
}

export default testFunction;
