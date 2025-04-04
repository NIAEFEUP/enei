import React, { useState } from "react";
import axios from "axios";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useEffect } from "react";
import { useTuyau } from '~/hooks/use_tuyau'
const CvUpload = () => {
  const tuyau = useTuyau()
  const [fetchedName, setfetchedName] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileName = async () => {
      try {
        const response = await axios.get(tuyau.$url('actions:cv_name'));
        setFileName(response.data.fileName);
      } catch (error) {
        setFileName(null);
      }
    };

    fetchFileName();
    setfetchedName(true);
  }, [uploading]);
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
    formData.append("cv", file);

    try {
      await axios.post(tuyau.$url('actions:cv_upload'), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    setUploading(true);
    try {
      await axios.delete(tuyau.$url('actions:cv_delete'), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {fileName ? (
        <div className="flex flex-row gap-2">
          <Input className="w-64" type="text" value={fileName} disabled />
          <Button onClick={handleDelete} disabled={uploading || !fetchedName}>
            {uploading ? "Uploading..." : "Clear CV"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <Input className="w-64" type="file" accept=".pdf" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={uploading || !fetchedName}>
            {uploading ? "Uploading..." : "Upload CV"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CvUpload;
