import { Link } from "react-router-dom"

const HomePage = () => {
    return (
        <body>
            <div className="flex pt-10 pl-5 pr-5 md:pl-60 md:pr-60 pb-10 bg-slate-700 text-white">
                <div className="flex-col">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">Slimme Groepsindeling:</h1>
                    <h2 className="text-xl md:text-3xl font-bold mb-5">Efficiënt, Objectief en Kindvriendelijk</h2>
                    <p className="mb-3">Maak eenvoudig evenwichtige groepen voor het nieuwe schooljaar. Ons slimme algoritme verdeelt leerlingen op basis van geslacht, cognitief niveau, gedrag en vriendschappen—zodat elke klas een sterke start heeft. </p>
                    <ul className="list-disc ml-5">
                        <li>
                            Bespaar tijd voor leerkrachten
                        </li>
                        <li>
                            Zorg voor eerlijke en gebalanceerde groepen
                        </li>
                        <li>Houd rekening met de voorkeuren van leerlingen

                        </li>
                    </ul>
                    <p className="mt-3 mb-8">Ervaar het zelf! Probeer het nu en ontdek hoe eenvoudig het werkt:</p>
                    <Link to="/input-students" className="bg-blue-500 p-3 text-md md:text-2xl font-semibold text-white rounded-xl mt-3 hover:bg-blue-600 hover:cursor-pointer">Probeer het!</Link>
                </div>
                <img src="/beta-text-icon.svg" alt="" className="hidden md:inline w-100 h-100" />
            </div>


            <div className="flex flex-col items-center pt-10 pb-10 md:pl-100 md:pr-100 mb-15 ">
                <h1 className="text-xl md:text-3xl text-center font-semibold mb-10">Ontdek de kracht van Edusort</h1>
                <ul className="flex flex-col md:flex-row list-none">
                    <li className="mr-8 flex flex-col items-center">
                        <img src="/clock-icon.svg" alt="" className="w-30 h-30 rounded-full mb-2" />
                        <p>Tijdbesparend</p>
                        {/* {Hidden needs to be hover} */}
                        <p className="hidden">Het samenstellen van nieuwe klassen kost normaal gesproken uren of zelfs dagen. Ons slimme algoritme doet dit werk in enkele minuten, terwijl het rekening houdt met alle belangrijke factoren.</p>
                    </li>
                    <li className="mr-5 flex flex-col items-center">
                        <img src="objectivity-icon.svg" alt="" className="w-30 h-30  rounded-full mb-2" />
                        <p>Objectief  </p>
                        {/* {Hidden needs to be hover} */}
                        <p className="hidden">In plaats van handmatig keuzes te maken, zorgt het algoritme voor een gebalanceerde verdeling op basis van geslacht, cognitief niveau, gedrag en vriendschappen. Geen willekeur, maar een eerlijke verdeling voor iedereen.</p>
                    </li>

                    <li className="mr-5 flex flex-col items-center">
                        <img src="transparency-clean.svg" alt="" className="w-30 h-30 rounded-full mb-2" />
                        <p>Transparant </p>
                        <p className="hidden">Leerkrachten krijgen inzicht in de groepsverdeling en kunnen, indien nodig, aanpassingen maken. Het systeem helpt bij het nemen van onderbouwde beslissingen zonder giswerk.</p>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col pr-5 pl-5 pt-20 pb-20 md:pl-80 md:pr-80 items-center bg-zinc-200 mb-15">
                <h1 className="text-2xl italic md:text-4xl ">“The advance of technology is based on making it fit in so that you don’t really even notice it, so it’s part of everyday life.” 
                </h1>
                <p className="self-end text-md md:text-xl">- Bill Gates</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-10 md:ml-60 md:mr-60 bg-blue-500 text-white p-10 rounded-xl">
                <div className="action-button-text">
                    <h2 className="text-xl mb-3 font-semibold">Bespaar tijd, werk objectief en zorg voor blije leerlingen.</h2>
                    <p>Test het nu zelf en ervaar hoe eenvoudig het werkt!</p>
                </div>
                <Link to="/input-students" className="bg-blue-500 p-2 text-white rounded-xl border-white border-2 mt-3 hover:bg-white hover:text-black hover:cursor-pointer">Probeer het!</Link>
            </div>
        </body>
    )
}

export default HomePage