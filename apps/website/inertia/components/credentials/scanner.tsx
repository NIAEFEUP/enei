import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@enei/shadcn/ui/tabs";
import NFC from "./nfc";

interface CredentialScannerProps {
  onScan: (slug: string) => void;
}

function CredentialScanner({ onScan }: CredentialScannerProps) {
  return (
    <Tabs defaultValue="qr">
      <TabsList className="w-full">
        <TabsTrigger value="qr">QR Code</TabsTrigger>
        <TabsTrigger value="nfc">NFC</TabsTrigger>
      </TabsList>
      <TabsContent value="qr">
        <Scanner
          key={"credential-scanner"}
          onScan={(data: IDetectedBarcode[]) => {
            const value = data[0].rawValue.split("/");
            const slug = value[value.length - 1];

            onScan(slug);
          }}
          components={{ audio: false }}
          allowMultiple={true}
          scanDelay={0}
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
