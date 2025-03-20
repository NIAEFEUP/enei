import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { FacebookIcon, MailIcon } from "lucide-react";


export default function Footer() {

    return (
        <footer className="relative">
            <div className="h-32 absolute inset-x-0 bottom-full enei-footer-waves" />
            <div className="text-enei-beige bg-black bg-gradient-to-b from-enei-blue to-enei-blue/50 h-40">
                <div className="pt-12 space-y-4">     
                    <div className="flex flex-row justify-center gap-4 items-center">
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
                    <p className="font-medium tracking-wider text-center">Copyright &copy;ENEI 2025, todos os direitos reservados</p>
                </div>
            </div>
        </footer>
    );
}
