// FileUploader.tsx
import React, { useEffect, useState } from 'react';
import generateFromExcel from '../helpers/generateFromExcell';
import { IconContext } from 'react-icons';
import { MdOutlineFileUpload } from 'react-icons/md';

// Define the Student interface
export interface IStudent {
  index: number;
  name: string;
  cognitive: number;
  social: number;
  gender: string;
  friends: number[];
}

interface IFileUploaderProps {
  setStudents: React.Dispatch<React.SetStateAction<IStudent[]>>;
}

const FileUploader: React.FC<IFileUploaderProps> = ({ setStudents }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      try {
        generateFromExcel(file).then((students) => {
          setStudents(students);
        }).catch((error) => {
          console.error("Error parsing Excel file:", error);
        });
      } catch (error) {
        console.error("An error has occurred: ", error);
      }
    }
  }, [file, setStudents]);

  return (
    <div>
      <label htmlFor="file-upload" className="flex  items-center bg-gray-200 p-2 rounded-sm hover:bg-gray-300 hover:cursor-pointer">
        <IconContext.Provider value={{ className: "text-gray-500 mr-2 hover:cursor-pointer w-5 h-5 hover:cursor-pointer" }}>
          <MdOutlineFileUpload />
        </IconContext.Provider>
        Upload Excel
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept='.xlsx, .xls'
      />
    </div>
  );
};

export default FileUploader;