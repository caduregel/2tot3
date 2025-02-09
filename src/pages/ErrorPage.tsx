import { useRouteError } from "react-router-dom"
import NavBar from "../components/NavBar"

interface RouteError {
    status: number
    message: string
}

function ErrorPage() {
    const error = useRouteError() as RouteError || null
    console.log(error)

    if (error.message = "Not Found") {
        return (
            <>
                <NavBar />
                <div className="mt-5 ml-5">

                    <h1 className="text-2xl font-bold">404 Not Found</h1>
                    <p>Deze pagina bestaat niet</p>
                </div>
            </>
        )
    }

    return (
        <>
            <NavBar />
            <div className="mt-5 ml-5">

                <h1 className="text-2xl font-bold">Oeps! Er is iets misgegaan</h1>
                <p>Dit product is momenteel in de bètafase, wat betekent dat we nog volop bezig zijn met testen en verbeteren. Het kan gebeuren dat je een fout tegenkomt. Onze excuses voor het ongemak</p>
                <p>Wat kun je doen?</p>
                <ol className="ml-5">
                    <li>🔄 Probeer de pagina te vernieuwen.</li>
                    <li>📧 Als het probleem blijft bestaan, laat het ons weten zodat we het kunnen oplossen.</li>
                </ol>
                <p>Bedankt voor je geduld en hulp bij het verbeteren van dit systeem! </p>
            </div>
        </>
    )
}

export default ErrorPage