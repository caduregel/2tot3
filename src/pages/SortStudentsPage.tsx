import SortedStudentCard from "../components/SortedStudentCard"
import BreadCrumbs, { IPath } from "../components/BreadCrumbs"
import sortStudents from "../algoritme/sorting/sortStudents"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { IGroups, ISavedGroups } from "../interfaces/groupsInterface"
import SavedGroups from "../components/SavedGroups"

const SortStudentsPage = () => {
    const [savedGroups, setSavedGroups] = useState<ISavedGroups[]>(localStorage.getItem('savedGroups')
        ? JSON.parse(localStorage.getItem('savedGroups') || '{}')
        : [])

    const students = JSON.parse(localStorage.getItem("students") || "{}")

    const [currentSorted, setCurrentSorted] = useState<IGroups>(localStorage.getItem('sorted')
        ? JSON.parse(localStorage.getItem('sorted') || '{}')
        : sortStudents(students)
    )

    const [saveGroupName, setSaveGroupName] = useState<string>("")

    const saveGroupDialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        localStorage.setItem("sorted", JSON.stringify(currentSorted))
    }, [currentSorted])

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
            name: saveGroupName,
            groupOne: [],
            groupTwo: [],
            stats: currentSorted.stats
        }
        currentSorted.groups[0].forEach((studentIndex) => {
            groups.groupOne.push(students[studentIndex])
        })
        currentSorted.groups[1].forEach((studentIndex) => {
            groups.groupTwo.push(students[studentIndex])
        })
        const newSavedGroups = [...savedGroups]
        newSavedGroups.push(groups)
        setSavedGroups(newSavedGroups)
    }

    useEffect(() => {
        localStorage.setItem("savedGroups", JSON.stringify(savedGroups))
    }, [savedGroups])

    const saveGroupDialog = () => {
        if (!saveGroupDialogRef.current) {
            return
        }
        saveGroupDialogRef.current.hasAttribute("open")
            ? saveGroupDialogRef.current.close()
            : saveGroupDialogRef.current.showModal()
    }

    const handleSavGroupName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaveGroupName(event.target.value)
    }

    const setSorted = (groups: IGroups) => {
        setCurrentSorted(groups);
    }

    const deleteSavedGroup = (index: number) => {
        const newSavedGroups = [...savedGroups]
        newSavedGroups.splice(index, 1)
        setSavedGroups(newSavedGroups)
    }

    const handleNewSorted = () => {
        const newSorted = sortStudents(students)
        setCurrentSorted(newSorted)
    }

    return (
        <div className="flex-flex-col mb-10 ">
            <BreadCrumbs path={path} />
            <div className="grid grid-cols-3">
                <div className="justify-self-center self-center col-start-2">
                    <Link to="/input-students" className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer">Terug</Link>
                    <Link to="/contact" className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer">Contact Ons!</Link>
                </div>
                <div className="justify-self-end self-center col-start-3">
                    <button className="justify-self-end bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                        onClick={handleNewSorted}>Maak Nieuwe Groepen</button>
                    <button className="justify-self-end bg-gray-200 p-2 rounded-sm hover:bg-gray-300 m-4 hover:cursor-pointer"
                        onClick={saveGroupDialog}>Groep Opslaan</button>
                </div>
            </div>
            <div className={savedGroups.length > 0 ? "grid grid-cols-3" : "grid grid-cols-2"}>
                <div className="ml-5">
                    <p className="text-2xl mb-1 font-medium text-center">Groep 1</p>
                    <div className="p-3 items-center bg-gray-200 mb-3 rounded-md">
                        <p>Groeps grote: {currentSorted.stats.groep1.groepsGrote}</p>
                        <p>Gemiddeld cognitief niveau: {Math.round(currentSorted.stats.groep1.gemiddeldCognitief * 10) / 10}</p>
                        <p>Gemiddeld zorg behoefte: {Math.round(currentSorted.stats.groep1.gemiddeldGedrag * 10) / 10}</p>
                        <p>Jongens: {currentSorted.stats.groep1.jongens}</p>
                        <p>meisjes: {currentSorted.stats.groep1.meisjes}</p>
                    </div>
                    {currentSorted.groups[0].map((studentIndex: number) => {
                        return <SortedStudentCard
                            students={students}
                            index={studentIndex}
                            key={studentIndex}
                            group={currentSorted.groups[0]} />
                    })}
                </div>
                <div className="ml-10 ">
                    <p className="text-2xl mb-1 font-medium text-center ">Groep 2</p>
                    <div className="p-3 items-center bg-gray-200 mb-3 rounded-md">
                        <p>Groeps grote: {currentSorted.stats.groep2.groepsGrote}</p>
                        <p>Gemiddeld cognitief niveau: {Math.round(currentSorted.stats.groep2.gemiddeldCognitief * 10) / 10}</p>
                        <p>Gemiddeld zorg behoefte: {Math.round(currentSorted.stats.groep2.gemiddeldGedrag * 10) / 10}</p>
                        <p>Jongens: {currentSorted.stats.groep2.jongens}</p>
                        <p>meisjes: {currentSorted.stats.groep2.meisjes}</p>
                    </div>
                    {currentSorted.groups[1].map((studentIndex: number) => {
                        return <SortedStudentCard
                            students={students}
                            index={studentIndex}
                            key={studentIndex}
                            group={currentSorted.groups[1]} />

                    })}
                </div>
                {savedGroups.length > 0 ? <SavedGroups
                    savedGroups={savedGroups}
                    setSorted={setSorted}
                    deleteGroup={deleteSavedGroup} />
                    : null}

                <dialog
                    ref={saveGroupDialogRef}
                    className="p-6 rounded-lg shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div>
                        <input
                            className="bg-gray-200 p-1 mb-4 rounded-sm"
                            placeholder="Opslaan als... "
                            type="text"
                            value={saveGroupName}
                            onChange={handleSavGroupName} />

                        <div className="text-right">
                            <button
                                className="bg-red-500 text-white p-2 rounded-sm hover:bg-red-600 hover:cursor-pointer mr-2"
                                onClick={saveGroupDialog}>
                                Cancel</button>
                            <button
                                onClick={() => { handleSave(); saveGroupDialog() }}
                                className="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 hover:cursor-pointer">
                                Opslaan
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default SortStudentsPage