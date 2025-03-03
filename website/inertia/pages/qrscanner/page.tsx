import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import CredentialScanner from "~/components/credentials/scanner";

export default function QrScanner() {
    return (
        <Page title="QRCode Scanner" className="bg-enei-beige text-enei-blue" variant="beige">
            <Container className="max-w-xl">
                <CredentialScanner />
            </Container>
        </Page>
    )
}