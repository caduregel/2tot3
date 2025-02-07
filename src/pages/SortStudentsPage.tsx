// import { useEffect, useState } from "react"
import sortStudents from "../algoritme/sorting/sortStudents"
import SortedStudentCard from "../components/SortedStudentCard"

const SortStudentsPage = () => {

    const students = JSON.parse(localStorage.getItem("students") || "{}")

    const sorted = sortStudents(students)
    return (
        <div className="flex justify-around">
            <div>
                <p className="text-xl">Groep Een</p>
                <div className="p-3 items-center bg-gray-200 mb-3 rounded-md">
                    <p>Groeps grote: {sorted.stats.groep1.groepsGrote}</p>
                    <p>Gemiddeld Cognitief niveau: {Math.round(sorted.stats.groep1.gemiddeldCognitief * 10) / 10}</p>
                    <p>Gemiddeld Gedrag niveau: {Math.round(sorted.stats.groep1.gemiddeldGedrag * 10) / 10}</p>
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
            <div>
                <p className="text-xl">Groep Twee</p>
                <div className="p-3 items-center bg-gray-200 mb-3 rounded-md">
                    <p>Groeps grote: {sorted.stats.groep2.groepsGrote}</p>
                    <p>Gemiddeld Cognitief niveau: {Math.round(sorted.stats.groep2.gemiddeldCognitief * 10) / 10}</p>
                    <p>Gemiddeld Gedrag niveau: {Math.round(sorted.stats.groep2.gemiddeldGedrag * 10) / 10}</p>
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
    )
}

export default SortStudentsPage