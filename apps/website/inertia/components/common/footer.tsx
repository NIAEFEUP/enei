import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Link } from "@tuyau/inertia/react";
import { FacebookIcon, MailIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "~/lib/utils";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="enei-footer-waves absolute inset-x-0 bottom-full h-32" />
      <div className="text-enei-beige from-enei-blue to-enei-blue/50 h-60 bg-black bg-gradient-to-b">
        <div className="flex flex-col space-y-4 pt-12">
          <div className="mb-3 flex flex-col space-y-1">
            <a href="/regulamento-sistema-pontos.pdf" className="mx-auto hover:underline">
              Regulamento do Sistema de Pontos
            </a>
            <Link
              route="pages:team"
              className={cn(buttonVariants({ variant: "link" }), "text-enei-beige p-0")}
            >
              Equipa
            </Link>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <a href="https://instagram.com/eneiconf">
              <InstagramLogoIcon className="size-6" />
            </a>
            <a href="mailto:geral@eneiconf.pt">
              <MailIcon className="size-6" />
            </a>
            <a href="https://facebook.com/eneiconf">
              <FacebookIcon className="size-6" />
            </a>
            <a href="https://linkedin.com/company/eneiconf">
              <LinkedInLogoIcon className="size-6" />
            </a>
          </div>
          <p className="text-center font-medium tracking-wider">
            Copyright &copy;ENEI 2025, todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
