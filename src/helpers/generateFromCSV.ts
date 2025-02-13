import Papa, { ParseResult } from "papaparse";
import { IStudent } from "../interfaces/studentInterface";

const generateFromCSV = async (file: File): Promise<IStudent[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                Papa.parse<string[]>(event.target.result as string, {
                    complete: (results: ParseResult<string[]>) => {
                        let students: IStudent[] = [];
                        results.data.forEach((student: string[], index) => {
                            const friendOneID = results.data.findIndex(s => s[0] === student[4]);
                            const friendTwoID = results.data.findIndex(s => s[0] === student[5]);
                            const friendThreeID = results.data.findIndex(s => s[0] === student[6]);
                            console.log(student[2])
                            const newStudent: IStudent = {
                                index: index,
                                name: student[0],
                                gender: student[1].toLowerCase() == "jongen" ? "boy": "girl",
                                cognitive: Number(student[2]),
                                social: Number(student[3]),
                                friends: [friendOneID, friendTwoID, friendThreeID]
                            }
                            students.push(newStudent);
                        });
                        resolve(students);
                    },
                    error: (error: Error) => {
                        reject(error);
                    },
                });
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

export default generateFromCSV;