import * as XLSX from 'xlsx';
import testFunction from '../../algoritme/helpers/test';
import { IStudent } from '../../interfaces/studentInterface';

// This function will take your groups data and convert it to an Excel file
const exportToExcel = (groups: number[][], students: IStudent[], exportName: string) => {
  // Create a workbook
  const workbook = XLSX.utils.book_new();
  const stats = testFunction(students, groups);

  // Create a worksheet for group summary
  const groupSummaryData = groups.map((group: number[], index: number) => {
    console.log(group)
    return {
      'Groep': index + 1,
      'Groeps Grote': stats[index].groepsGrote,
      'Gemiddeld Cognitief Niveau': Math.round(stats[index].gemiddeldCognitief * 10) / 10,
      'Gemiddeld Zorg Behoefte': Math.round(stats[index].gemiddeldGedrag * 10) / 10,
      'Jongens': stats[index].jongens,
      'Meisjes': stats[index].meisjes,
      'Leerlingen Zonder Vrienden': stats[index].leerlingenZonderVrienden
        .map(studentId => students.find(student => student.index === studentId)?.name)
        .join(', ')
    };
  });

  const groupSummarySheet = XLSX.utils.json_to_sheet(groupSummaryData);
  XLSX.utils.book_append_sheet(workbook, groupSummarySheet, 'Groep Overzicht');

  // Create a second worksheet with detailed student information by group
  const detailedStudentData: Array<Record<string, any>> = [];
  
  groups.forEach((group, groupIndex) => {
    // Add a header row for the group
    detailedStudentData.push({
      'Groep': `Groep ${groupIndex + 1}`,
      'Naam': '',
      'Cognitief Niveau': '',
      'Zorg Behoefte': '',
      'Geslacht': ''
    });
    
    // Add rows for each student in the group
    group.forEach(studentIndex => {
      const student = students.find(s => s.index === studentIndex);
      if (student) {
        detailedStudentData.push({
          'Groep': '',
          'Naam': student.name,
          'Cognitief Niveau': student.cognitive, // Adjust property name if needed
          'Zorg Behoefte': student.social, // Adjust property name if needed
          'Geslacht': student.gender === 'boy' ? 'Jongen' : 'Meisje'
        });
      }
    });
    
    // Add an empty row between groups for better readability
    detailedStudentData.push({
      'Groep': '',
      'Naam': '',
      'Cognitief Niveau': '',
      'Zorg Behoefte': '',
      'Geslacht': ''
    });
  });

  const detailedStudentSheet = XLSX.utils.json_to_sheet(detailedStudentData);
  XLSX.utils.book_append_sheet(workbook, detailedStudentSheet, 'Gedetailleerde Leerlingen');

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `${exportName}.xlsx`);
};

// A button component that triggers the Excel export
interface ExportToExcelButtonProps {
  groups: number[][];
  students: IStudent[];
  exportName: string;
}

const ExportToExcelButton: React.FC<ExportToExcelButtonProps> = ({ groups, students, exportName }) => {
  return (
    <button
      className="bg-green-200 p-1 mb-2 mr-5 ml-5 grid-cols-8 col-start-8 col-end-9 rounded-sm hover:cursor-pointer hover:bg-green-300"
      onClick={() => exportToExcel(groups, students, exportName)}
    >
      Exporteer naar Excel
    </button>
  );
};

export { exportToExcel, ExportToExcelButton };