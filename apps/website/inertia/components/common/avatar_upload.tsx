import React, { useState } from "react";
import axios from "axios";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useEffect } from "react";
import { useTuyau } from "~/hooks/use_tuyau";

type AvatarUploadProps = {
  onUploadComplete: () => void;
};

const AvatarUpload = ({ onUploadComplete }: AvatarUploadProps) => {
  const tuyau = useTuyau();
  const [fetchedName, setfetchedName] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchFileName = async () => {
      try {
        const response = await axios.get(tuyau.$url("actions:avatar.name"));
        setFileName(response.data.fileName);
        setfetchedName(true);
      } catch (error) {
        setFileName(null);
        setfetchedName(true);
      }
    };

    fetchFileName();
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
    formData.append("avatar", file);

    try {
      await axios.post(tuyau.$url("actions:avatar.upload"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setErrorMsg("");
    } catch (error) {
      if (error.response.data) {
        setErrorMsg(error.response.data);
      } else {
        setErrorMsg("Não foi possível guardar a imagem.");
      }
    } finally {
      setUploading(false);
      onUploadComplete();
    }
  };

  const handleDelete = async () => {
    setUploading(true);
    try {
      await axios.delete(tuyau.$url("actions:avatar.delete"), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
    } catch (error) {
    } finally {
      setUploading(false);
      setErrorMsg("");
      onUploadComplete();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {fileName ? (
          <div className="flex flex-col lg:flex-row gap-2">
            <Input className="lg:w-64 w-full" type="text" value={fileName} disabled />
            <Button className="lg:w-48 w-full"  onClick={handleDelete} disabled={uploading || !fetchedName}>
              {uploading ? "Uploading..." : "Clear avatar"}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-2">
            <Input className="lg:w-64 w-full" type="file" accept="image/*" onChange={handleFileChange} />
            <Button className="lg:w-48 w-full"  onClick={handleUpload} disabled={uploading || !fetchedName || !file}>
              {uploading ? "Uploading..." : "Upload avatar"}
            </Button>
          </div>
        )}
      </div>
      {errorMsg && <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>}
    </>
  );
};

export default AvatarUpload;
