import { FC, useState } from "react"
import { IStudent } from "../interfaces/studentInterface"
import { MdDragIndicator } from "react-icons/md";
import { IconContext } from "react-icons";
import { useDraggable } from "@dnd-kit/core";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface MainProps {
    students: IStudent[],
    index: number
    group: number[]
}

interface SideProps {
    friendIDs: number[]
    group: number[]
    students: IStudent[]
}

const ReturnGroupedFriends: FC<SideProps> = ({ friendIDs, group, students }) => {
    const groupedFriends: IStudent[] = []
    friendIDs.forEach((id) => {
        if (group.includes(id)) {
            groupedFriends.push(students[id])
        }
    })

    return (
        <>
            {
                groupedFriends.map((friend: IStudent, index) => {
                    return (
                        <p
                            key={index}
                            className="mr-3 bg-gray-300 rounded-md  p-1">{friend.name}</p>
                    )
                })
            }
        </>
    )
}

const SortedStudentCard: FC<MainProps> = ({ students, index, group }) => {
    const [zoomed, setZoomed] = useState(false)

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `student-${index}`,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.05)`,
        cursor: "move",
    } : undefined;


    const student = students.find((student) => student.index === index)
    if (!student) {
        return null
    }

    if (zoomed) {
        return (
            <div className="flex p-3 items-center justify-between bg-gray-200 mb-3 rounded-md" style={style} ref={setNodeRef} {...attributes}>
                <div className="flex flex-col gap-2">
                    <p className="font-bold">{student.name}</p>
                    <div className="flex gap-2 items-center">
                        <p>vriendjes: </p>
                        {student.friends.map((friendID, index) => {
                            const friend = students.find((s) => s.index === friendID);
                            return <p className="bg-gray-300 rounded-md  p-1" key={index}>{friend ? friend.name : "Vriendje niet gevonden"}</p>
                        })}
                    </div>
                    <p>Cognitief Niveau: {student.cognitive}</p>
                    <p>Zorg Niveau: {student.social}</p>
                    <p>Geslacht: {student.gender == "boy" ? "Jongen" : "Meisje"}</p>
                </div>
                <button onClick={() => setZoomed(false)}>
                    <IconContext.Provider value={{ className: "text-gray-500 mr-2 hover:cursor-pointer w-5 h-5 hover:scale-120 hover:cursor-pointer" }}>
                        <FaEyeSlash />
                    </IconContext.Provider>
                </button>
            </div>
        )
    }

    return (
        <div className="flex p-3 items-center justify-between bg-gray-200 mb-3 rounded-md" style={style} ref={setNodeRef} {...attributes}>
            <IconContext.Provider value={{ className: "text-gray-500 mr-2 hover:cursor-move w-5 h-5" }}>
                <MdDragIndicator {...listeners} />
            </IconContext.Provider>
            <div className="flex items-center rounded-md flex-wrap">
                <p className="mr-10 font-bold">{student.name}</p>
                <p className="mr-3">Matched Vriendjes:</p>
                <ReturnGroupedFriends friendIDs={student.friends} group={group} students={students} />
            </div>
            <button onClick={() => setZoomed(true)}>
                <IconContext.Provider value={{ className: "text-gray-500 mr-2 hover:cursor-pointer w-5 h-5 hover:scale-120 hover:cursor-pointer" }}>
                    <FaEye />
                </IconContext.Provider>
            </button>

        </div>
    )
}

export default SortedStudentCard