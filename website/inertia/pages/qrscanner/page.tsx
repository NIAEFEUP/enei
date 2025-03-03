import axios from "axios";
import { useState } from "react";
import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import CredentialScanner from "~/components/credentials/scanner";
import ProfileInfoDrawer from "~/components/profile/profile_info_drawer";
import { useTuyau } from "~/hooks/use_tuyau";

export default function QrScanner() {
    const tuyau = useTuyau()

    const [profile, setProfile] = useState<any>(null)

    return (
        <Page title="QRCode Scanner" className="bg-enei-beige text-enei-blue" variant="beige">
            <Container className="max-w-xl">
                <CredentialScanner 
                    onScan={(slug: string) => {
                        axios.get(tuyau.$url('actions:profile.info', { params: { slug }})).then((res) => {
                            setProfile(res.data.profile)
                        })
                    }}
                />
                {profile && (
                    <ProfileInfoDrawer 
                        profile={profile}
                    />
                )}
            </Container>
        </Page>
    )
}