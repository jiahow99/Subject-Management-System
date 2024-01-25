import { RiUploadCloud2Line } from "react-icons/ri";
import {useDropzone} from 'react-dropzone'
import { useCallback, useEffect, useState } from "react";

export default function FIleDropzone({setSubjects}) {
    // States
    const [isLoading, setIsLoading] = useState(false);

    // Function to get data from text file
    const getDataFromFile = (text) => {
        // Split data by each line
        const lines = text.split('\n');
        // Extract data divided by "|" & skip first line
        return lines.slice(1).map(line => {
            const [form, subject, teacher, topic] = line.split(' | ');
            return { form, subject, teacher, topic };
        })
    }

    // When upload unaccepted file type
    const onDropRejected = useCallback(() => {
        alert("Only text files are accepted.");
        setIsLoading(false);
    }, [])

    // Do something when upload
    const onDrop = useCallback(acceptedFiles => {
        setIsLoading(true);

        acceptedFiles.forEach(file => {
            // Tell reader what to do when load
            const reader = new FileReader();
            reader.onload = () => {
                const text = reader.result;
                const data = getDataFromFile(text);
                setSubjects(data);
                setIsLoading(false);
            };
            // Start read file
            reader.readAsText(file);
        })
    }, []);

    // useDropzone hook
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'text/plain': ['.txt']
        },
        onDropRejected
    })

    return (
        <div 
            {...getRootProps()}
            className="flex items-center justify-center w-8/12 mx-auto mt-5"
        >
            <label 
                htmlFor="dropzone-file" 
                className={`flex flex-col items-center justify-center w-full h-64 border-2 
                    border-dashed rounded-lg cursor-pointer hover:bg-bray-800  border-gray-600 
                    hover:border-gray-500 hover:bg-gray-600 ${isDragActive ? 'bg-gray-800' : 'bg-gray-700'}`}
                >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="text-5xl text-slate-300">
                        <RiUploadCloud2Line />
                    </div>
                    <p className="my-2 text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-sm text-gray-400">Txt file is accepted only</p>
                </div>
                <input {...getInputProps()} id="dropzone-file" type="file" className="hidden" />
            </label>
        </div> 
    )
}