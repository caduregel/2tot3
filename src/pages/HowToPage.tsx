import BreadCrumbs, { IPath } from "../components/BreadCrumbs"

function HowToPage() {

  const path: IPath = {
    links: [
    ],
    current: "Handleiding"
  }

  return (
    <>
    <BreadCrumbs path={path} />
      <div className="pt-5 ml-80 mr-80 mt-10" >
        <h1 className="text-3xl mb-5 font-semibold">Handleiding: Leerlingindeling met het EduSort</h1>
        <div className="grid grid-cols-4 grid-rows-1">
          <div className="col-span-3">
            <h2 className="text-xl font-semibold mb-3">Stap 1: Leerlingen Invoeren</h2>
            <p>Voor elke leerling voert u de volgende gegevens in:</p>
            <ul className="list-decimal ml-6 mt-2 mb-2">
              <li><strong>Naam</strong>: Vul de voor- en achternaam van de leerling in.</li>
              <li><strong>Geslacht</strong>: Selecteer of de leerling een jongen of een meisje is.</li>
              <li><strong>Cognitief Niveau (1-5)</strong>: Beoordeel het cognitieve niveau van de leerling:
                <ul className="list-decimal ml-6 mt-2 mb-2">
                  <li><strong>1</strong>: Heeft extra ondersteuning nodig bij leren.</li>
                  <li><strong>2-3</strong>: Functioneert gemiddeld en heeft incidentele ondersteuning nodig.</li>
                  <li><strong>4-5</strong>: Heeft een sterk cognitief vermogen en pakt leerstof snel op.</li>
                </ul>
              </li>
              <li><strong>Gedrag (1-5)</strong>: Beoordeel de mate van gedragsmatige ondersteuning:
                <ul className="list-decimal ml-6 mt-2 mb-2">
                  <li><strong>1</strong>: Geen zorgen over gedrag, werkt zelfstandig en sociaal vaardig.</li>
                  <li><strong>2-3</strong>: Af en toe begeleiding nodig bij gedrag en sociale interacties.</li>
                  <li><strong>4-5</strong>: Heeft regelmatig extra ondersteuning nodig bij gedrag en omgang met anderen.</li>
                </ul>
              </li>
            </ul>
            <p className="mb-5">Herhaal deze stappen tot alle leerlingen zijn ingevoerd.</p>
          </div>
          <div className="col-span-1 bg-blue-500 p-5 rounded-xl text-white">
            <h2 className="text-xl font-bold mb-3">Wilt u alleen de demo testen?</h2>
            <p className="font-semibold">
              Voor een snelle demo zonder handmatige invoer kunt u bij deze stap de optie <strong className="font-extrabold italic">"Willekeurig invullen"</strong> kiezen. Het systeem genereert automatisch 50 willekeurige leerlingen om het sorteren te testen.
            </p>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-3">Stap 2: Vriendjes Kiezen</h2>
        <p>Wanneer alle leerlingen zijn toegevoegd, klikt u op "Voeg vriendjes toe". Vervolgens:</p>
        <ol className="list-decimal ml-6 mt-2 mb-5">
          <li>Roep per leerling bij u en vraag hen om drie vriendjes te kiezen.</li>
          <li>Selecteer per leerling uit de dropdown-menu’s de drie opgegeven vriendjes.</li>
          <li>Zorg ervoor dat elke leerling minimaal één vriendje in de nieuwe klas krijgt.</li>
        </ol>

        <h2 className="text-xl font-semibold mb-3">Stap 3: Klassen Indelen</h2>
        <p>Als alle leerlingen en vriendjes zijn ingevoerd, kiest u een van de volgende opties:</p>
        <ul className="list-disc ml-6 mt-2 mb-5">
          <li><strong>"Sorteren":</strong> Het systeem maakt automatisch twee evenwichtige klassen, rekening houdend met alle ingevoerde factoren.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3">Stap 4: Resultaten Bekijken</h2>
        <p>Na het sorteren krijgt u twee klassenlijsten met de volgende informatie:</p>
        <ul className="list-disc ml-6 mt-2 mb-5">
          <li>Overzicht per groep:
            <ul className="list-disc ml-6 mt-2 mb-2">
              <li>Aantal leerlingen</li>
              <li>Gemiddeld cognitief niveau</li>
              <li>Gemiddeld gedragsniveau</li>
              <li>Verdeling jongens en meisjes</li>
            </ul>
          </li>
          <li>Individuele leerlingen:
            <ul className="list-disc ml-6 mt-2 mb-2">
              <li>Naam van het kind</li>
              <li>Het vriendje waarmee hij of zij is ingedeeld</li>
            </ul>
          </li>
        </ul>
        <p className="mb-10">Met deze gestructureerde aanpak bespaart u tijd en creëert u objectieve, evenwichtige klassen waarin leerlingen zich prettig voelen!</p>
      </div>
    </>
  )
}

export default HowToPage
