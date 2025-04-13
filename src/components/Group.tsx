import { FC } from "react";
import { IStats } from "../algoritme/helpers/test";
import SortedStudentCard from "../components/SortedStudentCard";
import { IStudent } from "../interfaces/studentInterface";

interface GroupProps {
    group: number[];
    stats: IStats;
    students: IStudent[];
    index: number;
}

const Group: FC<GroupProps> = ({ group, stats, students, index}) => {
    return (
        <div className="ml-5">
            <p className="text-2xl mb-1 font-medium text-center">Groep {index + 1}</p>
            <div className="p-3 items-center bg-gray-200 mb-3 rounded-md">
                <p>Groeps grote: {stats.groepsGrote}</p>
                <p>
                    Gemiddeld cognitief niveau:{" "}
                    {Math.round(stats.gemiddeldCognitief * 10) /
                        10}
                </p>
                <p>
                    Gemiddeld zorg behoefte:{" "}
                    {Math.round(stats.gemiddeldGedrag * 10) / 10}
                </p>
                <p>Jongens: {stats.jongens}</p>
                <p>meisjes: {stats.meisjes}</p>
            </div>
            {group.map((studentIndex: number) => {
                return (
                    <SortedStudentCard
                        students={students}
                        index={studentIndex}
                        key={studentIndex}
                        group={group}
                    />
                );
            })}
        </div>
    )
}

export default Group