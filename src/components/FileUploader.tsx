import React, { useEffect, useState } from 'react';
import generateFromCSV from '../helpers/generateFromCSV';


interface IFileUplaoderProps {
    setStudents: React.Dispatch<React.SetStateAction<any[]>>;
}

const FileUploader: React.FC<IFileUplaoderProps> = ({ setStudents }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (file) {
            try {
                generateFromCSV(file).then((students) => {
                    setStudents(students);
                })
            } catch (error) {
                console.log("An error has occured: " + error)
            }
        }
    }, [file]);

    return (
        <div >
            <label htmlFor="file-upload" className="bg-gray-200 p-2 rounded-sm hover:bg-gray-300 hover:cursor-pointer">
                Upload CSV
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} accept='.csv' />
        </div>
    );
};

export default FileUploader;