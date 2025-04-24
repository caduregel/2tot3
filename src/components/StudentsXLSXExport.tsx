import * as XLSX from 'xlsx';
import { IStudent } from '../interfaces/studentInterface';
import { IconContext } from 'react-icons';
import { MdOutlineFileDownload } from 'react-icons/md';

interface IStudentsXLSXExportProps {
    students: IStudent[];
}

const StudentsXLSXExport: React.FC<IStudentsXLSXExportProps> = ({ students }) => {
    const generateExcel = (students: IStudent[]) => {
        // Create a map of student indices to names for easy lookup
        const studentMap: { [key: number]: string } = {};
        students.forEach(student => {
            studentMap[student.index] = student.name;
        });

        // Transform data to required format
        const excelData = students.map(student => {
            // Map gender to "Jongen" or "Meisje"
            const genderText = student.gender === "J" ? "Jongen" : "Meisje";

            // Get friend names based on indices
            const friendNames = student.friends.map(friendIndex =>
                studentMap[friendIndex] || ""
            );

            // Create row with required columns
            return {
                "Leerling naam": student.name,
                "J/M": genderText,
                "Cognitief niveau": student.cognitive,
                "Zorg niveau": student.social,
                "Vriendje 1": friendNames[0] || "",
                "Vriendje 2": friendNames[1] || "",
                "Vriendje 3": friendNames[2] || ""
            };
        });

        // Create workbook and worksheet
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Studenten");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "studenten.xlsx");
    };

    return (
        <>
            <button
                className="flex items-center bg-gray-200 p-2 rounded-sm ml-5 hover:bg-gray-300 hover:cursor-pointer"
                onClick={() => generateExcel(students)}
            >
                <IconContext.Provider  value={{ className: "text-gray-500 mr-2 hover:cursor-pointer w-5 h-5 hover:cursor-pointer" }}>
                    <MdOutlineFileDownload />
                </IconContext.Provider>
                Download Excel
            </button>
        </>
    );
};

export default StudentsXLSXExport;