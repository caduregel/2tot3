import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div className="flex  p-3 justify-center">
            <Link to="/" className="m-3 p-1 font-medium underline">Home</Link>
            <Link to="how-to" className="m-3 p-1 font-medium underline">How to use</Link>
            <Link to="about" className="m-3 p-1 font-medium underline">About</Link>
        </div>
    )
}

export default NavBar