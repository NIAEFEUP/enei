import React, { useState } from "react";
import axios from "axios";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useEffect } from "react";
import { useTuyau } from "~/hooks/use_tuyau";
import { Trash } from "lucide-react";

type AvatarUploadProps = {
  onUploadComplete: () => void;
};

const AvatarUpload = ({ onUploadComplete }: AvatarUploadProps) => {
  const tuyau = useTuyau();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchFileName = async () => {
      try {
        const response = await axios.get(tuyau.$url("actions:avatar.name"));
        setFileName(response.data.fileName);
      } catch (error) {
        setFileName(null);
      }
    };

    fetchFileName();
  }, [uploading, deleting]);

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
    setDeleting(true);
    try {
      await axios.delete(tuyau.$url("actions:avatar.delete"), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
    } catch (error) {
    } finally {
      setDeleting(false);
      setErrorMsg("");
      onUploadComplete();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 lg:flex-row">
          <Input
            className="w-full lg:w-64"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            className="lg:w-38 w-full"
            onClick={handleUpload}
            disabled={uploading || deleting || !file}
          >
            {uploading ? "A carregar..." : "Carregar foto"}
          </Button>
          {fileName && (
            <Button
              variant="destructive"
              className="w-9"
              onClick={handleDelete}
              disabled={uploading || deleting}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {errorMsg && <p className="mt-4 text-center text-sm text-red-600">{errorMsg}</p>}
    </>
  );
};

export default AvatarUpload;
