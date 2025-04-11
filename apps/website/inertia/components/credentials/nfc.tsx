/// <reference types="@types/w3c-web-nfc"/>

import { useCallback, useEffect, useState } from "react";
import { Button } from "@enei/shadcn/ui/button";

type NFCProps = {
  onRead?: (data: NDEFMessage) => void;
  writeValue?: NDEFMessageSource;
  makeReadOnly?: boolean;
};

function NFC({ onRead, writeValue, makeReadOnly }: NFCProps) {
  const [reader, setReader] = useState<NDEFReader | null>(null);

  const [message, setMessage] = useState<string | null>("A carregar...");

  const [reading, setReading] = useState(false);
  const [writing, setWriting] = useState(false);
  const [makingReadOnly, setMakingReadOnly] = useState(false);

  const busy = writing || makingReadOnly || reading;

  const onError = useCallback((error: DOMException) => {
    switch (error.name) {
      case "AbortError":
        setMessage("Ação cancelada");
        break;
      case "NotAllowedError":
        setMessage("Permissão não concedida");
        break;
      case "NotSupportedError":
      case "NotReadableError":
        setMessage("NFC não suportado");
        break;
      case "NetworkError":
        setMessage("A credencial foi removida");
        break;
    }

    setReading(false);
    setWriting(false);
    setMakingReadOnly(false);
  }, []);

  const read = useCallback(() => {
    if (reader && onRead && !busy) {
      reader
        .scan()
        .then(() => {
          setMessage("Aproxima a credencial ao leitor");
          setReading(true);
        })
        .catch(onError);
    }
  }, [reader, onRead, busy, onError]);

  const write = useCallback(() => {
    if (reader && writeValue && !busy) {
      setMessage("Aproxima a credencial ao leitor");
      setWriting(true);

      reader
        .write(writeValue)
        .then(() => {
          setMessage("Credencial escrita com sucesso");
          setWriting(false);
        })
        .catch(onError);
    }
  }, [reader, writeValue, busy, onError]);

  const makeReadOnlyFn = useCallback(() => {
    if (reader && makeReadOnly && !busy) {
      setMessage("Aproxima a credencial ao leitor para a tornar permanente");
      setMakingReadOnly(true);

      reader
        .makeReadOnly()
        .then(() => {
          setMessage("Credencial tornada permanente com sucesso");
          setMakingReadOnly(false);
        })
        .catch(onError);
    }
  }, [reader, makeReadOnly, busy, onError]);

  useEffect(() => {
    if (!("NDEFReader" in window)) {
      setMessage("O teu browser não suporta NFC");
      return;
    }

    const newReader = new NDEFReader();
    setReader(newReader);
    setMessage(null);

    newReader.onreadingerror = () => {
      setMessage("Erro a ler a credencial");
      setReading(false);
    };
  }, []);

  useEffect(() => {
    if (reader) {
      reader.onreading = (event) => {
        setMessage("Credencial lida com sucesso");
        setReading(false);

        onRead?.(event.message);
      };
    }

    return () => {
      if (reader) {
        reader.onreading = () => {};
      }
    };
  }, [reader, onRead]);

  return (
    <div className="flex w-full flex-col gap-2 p-4 text-center">
      {message}

      {reader && onRead && (
        <Button onClick={read} disabled={busy}>
          Ler credencial
        </Button>
      )}

      {reader && writeValue && (
        <Button onClick={write} disabled={busy}>
          Escrever credencial
        </Button>
      )}

      {reader && makeReadOnly && (
        <Button onClick={makeReadOnlyFn} disabled={busy}>
          Tornar credencial permanente
        </Button>
      )}
    </div>
  );
}

export default NFC;
