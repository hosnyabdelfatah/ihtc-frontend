import React, {useState} from 'react';
import axios from "axios";

function InsertDoctors() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadResponse = await axios.post('https://file.io', formData);
            const fileUrl = uploadResponse.data.link;

            const proccessResponse = await axios.post('http://localhost:5000/dashboard/insert-json-doctors', {fileUrl});
            setMessage(proccessResponse.data.message);
        } catch (error) {
            setMessage('Error uploading or processing file: ' + error.response?.data?.message || error.message);

        }
        console.log(message)
    }

    return (
        <div
            className="w-[50%] mx-auto my-8 rounded-xl min-h-[400px] flex flex-col justify-center items-center border-2">
            <h2 className="mb-5 font-bold text-xl  w-[80%]">Upload and Process File</h2>
            <input type="file" className="my-5 mx-auto border w-[80%]" onChange={handleFileChange}/>
            <button className="border-2 px-8 py-2 mt-4" onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default InsertDoctors;