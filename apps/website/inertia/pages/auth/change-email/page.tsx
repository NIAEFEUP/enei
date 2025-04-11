import { Link } from "@tuyau/inertia/react";
import { buttonVariants } from "@enei/shadcn/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@enei/shadcn/ui/card";
import BaseLayout from "~/layouts/base";
import CardLayout from "~/layouts/card";

export default function EmailChangeResult(props: { title: string; text: string }) {
  const { title, text } = props;

  return (
    <BaseLayout title={title}>
      <CardLayout>
        <Card>
          <CardHeader>
            <CardTitle>{text}</CardTitle>
          </CardHeader>
          <CardContent>
            <Link route="pages:auth.login" className={buttonVariants()}>
              Ir para a página de login
            </Link>
          </CardContent>
        </Card>
      </CardLayout>
    </BaseLayout>
  );
}
