import { Link } from "react-router-dom"

function NavBar() {
    return (
        <header className="flex flex-col md:flex-row pl-4 pr-4 md:pl-80 md:pr-80 pt-2 pb-2 items-center justify-between bg-slate-700 text-white">
            <Link to="/" className="flex items-center hover:cursor-pointer mb-2 md:mb-0">
                <img src="/favicon.svg" className="w-10 h-10" alt="" />
                <p className="ml-4 text-xl font-semibold">EduSort</p>
            </Link>
            <div className="flex justify-center md:justify-end w-full md:w-auto">
                <Link to="/input-students" className="m-1 md:m-3 p-1 font-medium">Proberen</Link>
                <Link to="how-to" className="m-1 md:m-3 p-1 font-medium">Handleiding</Link>
                <Link to="more-info" className="m-1 md:m-3 p-1 font-medium">Meer Info</Link>
                <Link to="contact" className="m-1 md:m-3 p-1 font-medium">Contact</Link>
            </div>
        </header>
    )
}

export default NavBar