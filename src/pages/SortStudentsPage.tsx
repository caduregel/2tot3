import sortStudents from "../algoritme/sorting/sortStudents"
import SortedStudentCard from "../components/SortedStudentCard"
import BreadCrumbs, { IPath } from "../components/BreadCrumbs"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { ISavedGroups } from "../interfaces/groupsInterface"

const SortStudentsPage = () => {
    const [savedGroups, setSavedGroups] = useState<ISavedGroups[]>(localStorage.getItem('savedGroups')
        ? JSON.parse(localStorage.getItem('savedGroups') || '{}')
        : [])

    const students = JSON.parse(localStorage.getItem("students") || "{}")
    const sorted = sortStudents(students)

    const path: IPath = {
        links: [
            {
                href: "/input-students",
                label: "Proberen"
            },
        ],
        current: "Sorteren"
    }

    const handleSave = () => {
        const groups: ISavedGroups = {
            name: "randomString",
            groupOne: [],
            groupTwo: [],
            stats: sorted.stats
        }
        sorted.groups[0].forEach((studentIndex) => {
            groups.groupOne.push(students[studentIndex])
        })
        sorted.groups[1].forEach((studentIndex) => {
            groups.groupTwo.push(students[studentIndex])
        })
        const newSavedGroups = [...savedGroups]
        newSavedGroups.push(groups)
        setSavedGroups(newSavedGroups)
    }

    useEffect(() => {
        localStorage.setItem("savedGroups", JSON.stringify(savedGroups))
    }, [savedGroups])

    console.log(savedGroups)

    return (
        <div className="flex-flex-col">
            <BreadCrumbs path={path} />
            <div className="grid grid-cols-3">
                <div className="justify-self-center self-center col-start-2">
                    <Link to="/input-students" className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer">Terug</Link>
                    <Link to="/contact" className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer">Contact Ons!</Link>
                </div>
                <button className="justify-self-end bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer" onClick={handleSave}>Groep Opslaan</button>
            </div>
            <div className="grid grid-cols-2 mb-10">
                <div className="ml-10 mr-10">
                    <p className="text-2xl mb-1 font-medium text-center">Groep 1</p>
                    <div className="p-3 items-center bg-gray-200 mb-3 rounded-md">
                        <p>Groeps grote: {sorted.stats.groep1.groepsGrote}</p>
                        <p>Gemiddeld cognitief niveau: {Math.round(sorted.stats.groep1.gemiddeldCognitief * 10) / 10}</p>
                        <p>Gemiddeld zorg behoefte: {Math.round(sorted.stats.groep1.gemiddeldGedrag * 10) / 10}</p>
                        <p>Jongens: {sorted.stats.groep1.jongens}</p>
                        <p>meisjes: {sorted.stats.groep1.meisjes}</p>
                    </div>
                    {sorted.groups[0].map((studentIndex) => {
                        return <SortedStudentCard
                            students={students}
                            index={studentIndex}
                            key={studentIndex}
                            group={sorted.groups[0]} />
                    })}
                </div>
                <div className="ml-10 mr-10">
                    <p className="text-2xl mb-1 font-medium text-center ">Groep 2</p>
                    <div className="p-3 items-center bg-gray-200 mb-3 rounded-md">
                        <p>Groeps grote: {sorted.stats.groep2.groepsGrote}</p>
                        <p>Gemiddeld cognitief niveau: {Math.round(sorted.stats.groep2.gemiddeldCognitief * 10) / 10}</p>
                        <p>Gemiddeld zorg behoefte: {Math.round(sorted.stats.groep2.gemiddeldGedrag * 10) / 10}</p>
                        <p>Jongens: {sorted.stats.groep2.jongens}</p>
                        <p>meisjes: {sorted.stats.groep2.meisjes}</p>
                    </div>
                    {sorted.groups[1].map((studentIndex) => {
                        return <SortedStudentCard
                            students={students}
                            index={studentIndex}
                            key={studentIndex}
                            group={sorted.groups[1]} />

                    })}
                </div>
            </div>
        </div>
    )
}

export default SortStudentsPage