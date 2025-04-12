import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import NFC from "./nfc";
import { useToast } from "~/hooks/use_toast";

interface CredentialScannerProps {
  onScan: (slug: string) => void;
}

function CredentialScanner({ onScan }: CredentialScannerProps) {
  const { toast } = useToast();

  return (
    <Tabs defaultValue="qr">
      <TabsList className="w-full">
        <TabsTrigger value="qr">QR Code</TabsTrigger>
        <TabsTrigger value="nfc">NFC</TabsTrigger>
      </TabsList>
      <TabsContent value="qr">
        <Scanner
          key={"credential-scanner"}
          onError={async () => {
            const perm = await navigator.permissions.query({ name: "camera" });
            if (perm.state === "prompt") {
              await navigator.mediaDevices.getUserMedia({ video: true });
            } else if (perm.state === "denied") {
              toast({
                title: "Erro de permissões",
                description:
                  "O browser não permitiu o acesso à câmara do dispositivo. Por favor, contacte a staff do evento.",
              });
            }
          }}
          onScan={(data: IDetectedBarcode[]) => {
            const value = data[0].rawValue.split("/");
            const slug = value[value.length - 1];

            onScan(slug);
          }}
          components={{ audio: false }}
          allowMultiple={true}
          scanDelay={1500}
        />
      </TabsContent>
      <TabsContent value="nfc">
        <NFC
          onRead={(data) => {
            const decoder = new TextDecoder();
            const value = decoder.decode(data.records[0].data).split("/");
            const slug = value[value.length - 1];

            onScan(slug);
          }}
        />
      </TabsContent>
    </Tabs>
  );
}

export default CredentialScanner;
