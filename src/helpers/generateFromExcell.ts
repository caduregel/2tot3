import * as XLSX from 'xlsx';
import { IStudent } from "../interfaces/studentInterface";

const generateFromExcel = async (file: File): Promise<IStudent[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          reject(new Error("Could not read file"));
          return;
        }
        
        // Parse the Excel file
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to array of arrays (similar to CSV parsing)
        const rows = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });
        
        // Process student data
        let students: IStudent[] = [];
        
        rows.forEach((student: any[], index) => {
          // Skip header row if present
          if (index === 0 && typeof student[0] === 'string' && 
             (student[0].toLowerCase().includes('naam') || 
              student[0].toLowerCase().includes('name'))) {
            return;
          }
          
          // Find friend indices by name
          const friendOneName = student[4];
          const friendTwoName = student[5];
          const friendThreeName = student[6];
          
          const friendOneID = rows.findIndex(s => s[0] === friendOneName);
          const friendTwoID = rows.findIndex(s => s[0] === friendTwoName);
          const friendThreeID = rows.findIndex(s => s[0] === friendThreeName);
          
          // Create new student object
          const newStudent: IStudent = {
            index: index - (rows[0][0].toLowerCase().includes('naam') ? 1 : 0), // Adjust index if header row exists
            name: student[0],
            gender: student[1].toLowerCase() === "jongen" ? "boy" : "girl",
            cognitive: Number(student[2]),
            social: Number(student[3]),
            friends: [
              friendOneID !== -1 ? friendOneID : -1, 
              friendTwoID !== -1 ? friendTwoID : -1, 
              friendThreeID !== -1 ? friendThreeID : -1
            ].filter(id => id !== -1) // Filter out invalid friend IDs
          };
          
          students.push(newStudent);
        });
        
        resolve(students);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    
    // Read the file as binary string
    reader.readAsBinaryString(file);
  });
};

export default generateFromExcel;