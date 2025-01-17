import { Link } from '@inertiajs/react'
import { Button } from '~/components/ui/button'

/*
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";

type PageRoute = {
  href: string;
  title: string;
};

*/

export default function NavBar() {
  /*
  const navButtonStyle =
    "font-space-grotesk uppercase group inline-flex h-9 w-max items-center justify-center text-base font-bold text-enei-beige focus:outline-none disabled:pointer-events-none";
  const navLoginStyle =
    "font-space-grotesk group inline-flex h-10 px-6 rounded-md w-max items-center justify-center text-base font-bold bg-enei-beige text-enei-blue focus:outline-none disabled:pointer-events-none";
  const routes: PageRoute[] = [{
    href: "/",
    title: "Programa",
  }, {
    href: "/",
    title: "Loja",
  }, {
    href: "/",
    title: "Equipa",
  }];
  */

  return (
    <>
      <nav className="py-5 px-6 sm:px-12 md:px-24 lg:px-36 flex flex-row justify-between items-center flex-grow md:flex-grow-0">
        <Link href="/">
          <img className="w-28 max-md:w-24" src="/images/logo-white.svg" alt="Logótipo da SINF" />
        </Link>
        <Button className="bg-enei-beige text-enei-blue">
          <Link href="/login">
            <span>Login</span>
          </Link>
        </Button>
        {/*
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList className="gap-5">
            {routes.map(function (route, _) {
              return (
                <NavigationMenuItem>
                  <Link href={route.href}>
                    <NavigationMenuLink className={navButtonStyle}>
                      {route.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
            <NavigationMenuItem>
              <Link href="/">
                <NavigationMenuLink className={navLoginStyle}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="sm:hidden">
            <Button
              variant="outline"
              size="icon"
              className="border border-input bg-enei-beige shadow-sm text-enei-blue hover:bg-enei-beige hover:text-enei-blue"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-enei-beige border-enei-blue">
            <DropdownMenuGroup>
              {routes.map(function (route, _) {
                return (
                  <Link
                    href={route.href}
                    className="uppercase font-space-grotesk font-semibold text-enei-blue"
                  >
                    <DropdownMenuItem className="focus:bg-enei-beige focus:text-enei-blue">
                      {route.title}
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-enei-blue" />
            <DropdownMenuItem className="font-space-grotesk font-semibold text-enei-blue focus:bg-enei-beige focus:text-enei-blue">
              Login
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
            */}
      </nav>
    </>
  )
}
