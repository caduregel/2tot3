import { Link } from "react-router-dom"

function NavBar() {
    return (

        <header className="flex pl-80 pr-80 pt-2 pb-2 items-center justify-between bg-slate-700 text-white">
            <Link to="/" className="flex items-center hover:cursor-pointer">
                <img src="/favicon.svg" className="w-10 h-10" alt="" />
                <p className="ml-4 text-xl  font-semibold">EduSort</p>
            </Link>
            <div className="flex justify-end">
                <Link to="/input-students" className="m-3 p-1 font-medium">Proberen</Link>
                <Link to="how-to" className="m-3 p-1 font-medium">Handleiding</Link>
                <Link to="more-info" className="m-3 p-1 font-medium">Meer Info</Link>

            </div>
        </header>
    )
}

export default NavBar