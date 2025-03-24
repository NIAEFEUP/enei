import ReferralsController from "#controllers/referrals_controller";
import { InferPageProps } from "@adonisjs/inertia/types";
import { Link } from "@tuyau/inertia/react";
import { CircleAlert, Info } from "lucide-react";
import Container from "~/components/common/containers";
import CardContainer from "~/components/common/containers/card";
import Page from "~/components/common/page";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export default function ReferralsPage({
  referralLink,
  referralCount,
  indirectReferralCount,
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
                {referralCount !== null && (
                  <div className="bg-primary/90 text-primary-foreground mt-4 flex flex-row items-center gap-2 rounded-md px-4 py-2 text-sm">
                    <Info className="inline-block size-4 flex-shrink-0" />
                    {referralCount === 0 ? (
                      <p>O teu link ainda não foi utilizado.</p>
                    ) : (
                      <p>
                        O teu link já foi utilizado por <strong>{referralCount}</strong> pessoa
                        {referralCount !== 1 && "s"}
                        {indirectReferralCount !== null && (
                          <>
                            , abrangendo <strong>{indirectReferralCount}</strong> pessoa
                            {indirectReferralCount !== 1 && "s"} no total
                          </>
                        )}
                        !
                      </p>
                    )}
                  </div>
                )}
              </div>
              {!hasReferralLink && (
                <div className="mt-4 flex flex-row items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-sm text-white">
                  <CircleAlert className="inline-block size-4 flex-shrink-0" />
                  <p>
                    O link de referenciação só ficará disponível quando{" "}
                    <Link
                      route="pages:tickets"
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "m-0 inline h-fit p-0 text-inherit underline",
                      )}
                    >
                      comprares o teu bilhete para o ENEI 2025
                    </Link>
                    .
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContainer>
      </Container>
    </Page>
  );
}
