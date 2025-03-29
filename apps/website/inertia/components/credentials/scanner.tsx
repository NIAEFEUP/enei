import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

interface CredentialScannerProps {
  onScan: (slug: string) => void;
}

function CredentialScanner({ onScan }: CredentialScannerProps) {
  return (
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
  );
}

export default CredentialScanner;
