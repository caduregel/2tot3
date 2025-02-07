import { useEffect, useState } from "react"

const SortStudentsPage = () => {

    const [loading, setLoading] = useState(true)
    const [dots, setDots] = useState("")
    
    useEffect(() => {
        const interval = setInterval(() => {
          setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 300); // Adjust timing as needed
    
        return () => clearInterval(interval);
      }, []);

    return (
        <div>
            <h1 className="text-2xl">Sorting students{dots}</h1>
        </div>
    )
}

export default SortStudentsPage