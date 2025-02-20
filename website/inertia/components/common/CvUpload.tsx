import React, { useState } from 'react';
import axios from 'axios';
import { Button} from '~/components/ui/button';
import { Input } from "~/components/ui/input"


const CvUpload= () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('cv', file);

        try {
            await axios.post('/cv/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
        } finally {
            setUploading(false);
        }
    };

return (
                <div className='flex flex-row gap-2' >
                 <Input className="w-min" type="file" accept=".pdf" onChange={handleFileChange} />
                 <Button onClick={handleUpload} disabled={uploading}>
                     {uploading ? 'Uploading...' : 'Upload CV'}</Button>
                 </div>
                )


         
};

export default CvUpload;
