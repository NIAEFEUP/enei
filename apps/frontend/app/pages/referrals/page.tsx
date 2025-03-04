import ReferralsController from "#controllers/referrals_controller";
import { InferPageProps } from "@adonisjs/inertia/types";
import { Link } from "@tuyau/inertia/react";
import { CircleAlert } from "@enei/shadcn/icons";
import Container from "#components/common/containers/base";
import CardContainer from "#components/common/containers/card";
import Page from "#components/common/page";
import { buttonVariants } from "@enei/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@enei/shadcn/ui/card";
import { Input } from "@enei/shadcn/ui/input";
import { Label } from "@enei/shadcn/ui/label";
import { cn } from "@enei/react-utils/cn";

export default function ReferralsPage({
  referralLink,
}: InferPageProps<ReferralsController, "showReferralLink">) {
  const hasReferralLink = referralLink !== null;
  return (
    <Page title="Referenciações" className="bg-enei-blue">
      <Container>
        <CardContainer className="mt-12 max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>
                <h1>Referenciações</h1>
              </CardTitle>
              <CardDescription>
                No ENEI, ao convidares pessoas para o evento, ganhas pontos para trocar por
                recompensas!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="referral-link">Link de referenciação</Label>
                <Input
                  id="referral-link"
                  type="text"
                  defaultValue={referralLink ?? ""}
                  readOnly
                  className="focus-visible:ring-none placeholder:select-none placeholder:blur-sm"
                  placeholder="Precisas de comprar um bilhete para referenciar pessoas..."
                  disabled={!hasReferralLink}
                />
                <p className="text-muted-foreground text-[0.8rem]">
                  Partilha o teu link de referenciação com os teus amigos ou colegas.
                  <br />
                  Por cada pessoa que se inscrever e comprar bilhete para o ENEI 2025 usando o teu
                  link, receberás pontos como recompensa.
                </p>
              </div>
              {!hasReferralLink && (
                <div className="mt-4 rounded-md bg-red-500 px-4 py-2 text-sm text-white">
                  <CircleAlert className="inline-block size-4" /> O link de referenciação só ficará
                  disponível quando{" "}
                  <Link
                    route="pages:tickets"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "m-0 h-fit p-0 text-inherit underline",
                    )}
                  >
                    comprares o teu bilhete para o ENEI 2025
                  </Link>
                  .
                </div>
              )}
            </CardContent>
          </Card>
        </CardContainer>
      </Container>
    </Page>
  );
}
