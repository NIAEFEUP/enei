import React, { useState } from "react";
import axios from "axios";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useTuyau } from "~/hooks/use_tuyau";

const CvUpload = () => {
  const tuyau = useTuyau();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

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
      setFile(null);
      setErrorMsg("");
    } catch (error) {
      if (error.response.data) {
        if (error.response.data.status === 413) {
          setErrorMsg("O ficheiro é demasiado grande.");
        } else {
          setErrorMsg(error.response.data.message);
        }
      } else {
        setErrorMsg("Não foi possível guardar o ficheiro.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 lg:flex-row">
          <Input className="w-full lg:w-64" type="file" accept=".pdf" onChange={handleFileChange} />
          <Button
            className="w-full lg:w-48"
            type="button"
            onClick={handleUpload}
            disabled={uploading || !file}
          >
            {uploading ? "A carregar..." : "Carregar CV"}
          </Button>
        </div>
      </div>
      {errorMsg && <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>}
    </>
  );
};

export default CvUpload;
