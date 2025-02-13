import { Link } from "react-router-dom"
import BreadCrumbs, { IPath } from "../components/BreadCrumbs"

const MeerInfoPage = () => {

    const path:IPath = {
        links: [],
        current: "Meer Info"
    }

    return (
        <div className="flex flex-col">
            <BreadCrumbs path={path} />
            <div className="pt-5 px-4 md:px-80 mt-10">
                <h1 className="text-3xl mb-5 font-semibold">Slimme Groepsindeling: Efficiënt, Objectief en Kindvriendelijk</h1>

                <h2 className="text-xl font-semibold mb-3">De Uitdaging van Klassenindeling</h2>
                <p>Op basisscholen moeten leerkrachten elk jaar opnieuw groepen samenstellen. Bijvoorbeeld wanneer vier kleuterklassen moeten worden verdeeld over twee nieuwe groepen in groep 3. Dit is een complexe en tijdrovende taak. Leerkrachten proberen een eerlijke verdeling te maken, waarbij ze rekening houden met geslacht, cognitief niveau, gedrag en de vriendschappen van leerlingen. Maar omdat dit proces grotendeels handmatig gebeurt, is het niet alleen tijdrovend, maar ook gevoelig voor subjectiviteit en menselijke fouten.</p>

                <h2 className="text-xl font-semibold mb-3 mt-3">Het Probleem: Tijdrovend en Niet Objectief</h2>
                <p>Leerkrachten en schoolleiders besteden vaak dagen of zelfs weken aan het maken van nieuwe klassenindelingen. Ze moeten lijstjes maken, overleggen met collega’s en proberen een evenwichtige verdeling te realiseren. Dit kan een frustrerend proces zijn, omdat:</p>
                <ul className="list-disc ml-6 mt-2 mb-2">
                    <li>Het veel tijd en energie kost naast de dagelijkse werkzaamheden.</li>
                    <li>Het moeilijk is om volledig objectief te blijven bij het maken van beslissingen.</li>
                    <li>Leerlingen soms ongelukkig worden ingedeeld, wat kan leiden tot sociale of leerproblemen in de nieuwe groep.</li>
                    <li>Er vaak aanpassingen nodig zijn na feedback, wat het proces nog langer maakt.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-3 mt-3">De Oplossing: Automatische en Slimme Indeling</h2>
                <p>Ons product biedt een efficiënte en eerlijke manier om leerlingen te verdelen over nieuwe klassen. Met behulp van een geavanceerd algoritme zorgt het systeem ervoor dat alle belangrijke factoren worden meegenomen:</p>
                <ul className="list-disc ml-6 mt-2 mb-2">
                    <li ><strong>Gelijke Verdeling:</strong> Het algoritme zorgt ervoor dat klassen evenwichtig zijn qua aantal leerlingen, jongens en meisjes, en cognitief niveau.</li>
                    <li><strong>Gedrag en Dynamiek:</strong> Het houdt rekening met gedragskenmerken, zodat geen enkele klas te veel zorgleerlingen of uitdagende groepsdynamieken heeft.</li>
                    <li><strong>Vriendschappen:</strong> Elke leerling mag drie vriendjes opgeven, waarvan er minimaal één in dezelfde groep wordt geplaatst. Dit voorkomt dat kinderen zich alleen voelen in hun nieuwe klas.</li>
                    <li><strong>Tijdsbesparing:</strong> Wat normaal dagen werk kost, is nu binnen enkele minuten geregeld. Leerkrachten kunnen zich hierdoor richten op wat echt belangrijk is: goed onderwijs geven.</li>
                </ul>

                <h2 className="text-xl font-semibold mb-3 mt-3">Hoe Werkt Het?</h2>
                <p>Het proces is eenvoudig en gebruiksvriendelijk:</p>
                <ol className="list-decimal ml-6 mt-2 mb-2">
                    <li><strong>Gegevens invoeren:</strong> Leerkrachten vullen de leerlinggegevens in, zoals geslacht, niveau, gedrag en vriendschapsvoorkeuren.</li>
                    <li><strong>Automatische Indeling:</strong> Het algoritme verwerkt alle gegevens en genereert evenwichtige klassen.</li>
                    <li><strong>Controle en Aanpassingen:</strong> Leerkrachten kunnen de verdeling bekijken en indien nodig nog handmatig kleine aanpassingen doen.</li>
                    <li><strong>Klaar voor het nieuwe schooljaar!</strong> Binnen enkele minuten is de indeling gemaakt, zonder eindeloze overleggen en handmatige puzzels.</li>
                </ol>

                <h2 className="text-xl font-semibold mb-3 mt-3">Waarom Dit Product?</h2>
                <p>Met dit product nemen we een lastige taak uit handen van leerkrachten en schooldirecties. Het biedt:</p>
                <ul className="list-disc ml-6 mt-2 mb-2">
                    <li><strong>Efficiëntie:</strong> Minder tijd kwijt aan de klassenindeling, meer tijd voor lesgeven.</li>
                    <li><strong>Objectiviteit:</strong> Geen subjectieve keuzes, maar een eerlijk algoritme.</li>
                    <li><strong>Blije leerlingen:</strong> Kinderen starten in een nieuwe klas met minstens één vriendje, wat zorgt voor een soepele overgang.</li>
                    <li><strong>Flexibiliteit:</strong> Leerkrachten behouden controle en kunnen indien nodig nog aanpassingen doen.</li>
                </ul>

                <p className="mb-10">Wil je ervaren hoe eenvoudig en effectief dit systeem werkt? Probeer het nu zelf en ontdek de voordelen!</p>

            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-10 px-4 md:px-20 lg:px-40 bg-blue-500 text-white p-10 rounded-xl">
                <div className="action-button-text mb-4 md:mb-0">
                    <h2 className="text-xl mb-3 font-semibold">Bespaar tijd, werk objectief en zorg voor blije leerlingen.</h2>
                    <p>Test het nu zelf en ervaar hoe eenvoudig het werkt!</p>
                </div>
                <Link to="/input-students" className="bg-blue-500 p-2 text-white rounded-xl border-white border-2 mt-3 hover:bg-white hover:text-black hover:cursor-pointer">Try it!</Link>
            </div>
        </div>
    )
}

export default MeerInfoPage