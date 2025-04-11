import React, { useState } from "react";
import axios from "axios";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useEffect } from "react";
import { useTuyau } from "~/hooks/use_tuyau";

const CvUpload = () => {
  const tuyau = useTuyau();
  const [fetchedName, setfetchedName] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchFileName = async () => {
      try {
        const response = await axios.get(tuyau.$url("actions:cv.name"));
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
      await axios.post(tuyau.$url("actions:cv.upload"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setErrorMsg("");
    } catch (error) {
      if (error.response.data) {
        setErrorMsg(error.response.data);
      } else {
        setErrorMsg("Não foi possível guardar o ficheiro.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    setUploading(true);
    try {
      await axios.delete(tuyau.$url("actions:cv.delete"), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFile(null);
    } catch (error) {
    } finally {
      setUploading(false);
      setErrorMsg("");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {fileName ? (
          <div className="flex flex-col lg:flex-row gap-2">
            <Input className="lg:w-64 w-full" type="text" value={fileName} disabled />
            <Button className="lg:w-48 w-full" onClick={handleDelete} disabled={uploading || !fetchedName}>
              {uploading ? "Uploading..." : "Clear CV"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-2">
            <Input className="lg:w-64 w-full" type="file" accept=".pdf" onChange={handleFileChange} />
            <Button className="lg:w-48 w-full" onClick={handleUpload} disabled={uploading || !fetchedName || !file}>
              {uploading ? "Uploading..." : "Upload CV"}
            </Button>
          </div>
        )}
      </div>
      {errorMsg && <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>}
    </>
  );
};

export default CvUpload;
