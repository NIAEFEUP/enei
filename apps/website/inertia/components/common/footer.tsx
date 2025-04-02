import { SiInstagram, SiFacebook } from "@icons-pack/react-simple-icons";
import { Linkedin, MailIcon } from "@enei/shadcn/icons";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="enei-footer-waves absolute inset-x-0 bottom-full h-32" />
      <div className="text-enei-beige from-enei-blue to-enei-blue/50 bg-linear-to-b h-40 bg-black">
        <div className="space-y-4 pt-12">
          <div className="flex flex-row items-center justify-center gap-4">
            <a href="https://instagram.com/eneiconf">
              <SiInstagram className="size-6" />
            </a>
            <a href="mailto:geral@eneiconf.pt">
              <MailIcon className="size-6" />
            </a>
            <a href="https://facebook.com/eneiconf">
              <SiFacebook className="size-6" />
            </a>
            <a href="https://linkedin.com/company/eneiconf">
              <Linkedin className="size-6" />
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
