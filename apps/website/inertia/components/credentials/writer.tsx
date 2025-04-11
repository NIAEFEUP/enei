import { useTuyau } from "~/hooks/use_tuyau";
import NFC from "./nfc";

interface CredentialWriterProps {
  slug: string;
}

function CredentialWriter({ slug }: CredentialWriterProps) {
  const tuyau = useTuyau();

  return (
    <NFC
      makeReadOnly
      writeValue={{
        records: [
          {
            recordType: "url",
            data: tuyau.$url("pages:profile.show", {
              params: { slug },
            }),
          },
        ],
      }}
    />
  );
}

export default CredentialWriter;
