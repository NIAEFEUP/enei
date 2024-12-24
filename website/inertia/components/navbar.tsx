import React from "react";

import { Link } from "@inertiajs/react";

export default function NavBar() {
  /*
  const navButtonStyle =
    "font-space-grotesk uppercase group inline-flex h-9 w-max items-center justify-center text-base font-bold text-enei-beige focus:outline-none disabled:pointer-events-none";
  const navLoginStyle =
    "font-space-grotesk group inline-flex h-10 px-6 rounded-md w-max items-center justify-center text-base font-bold bg-enei-beige text-enei-blue focus:outline-none disabled:pointer-events-none";
  */

  return (
    <>
      <nav className="px-6 sm:px-12 md:px-24 lg:px-36 flex flex-row justify-between items-center flex-grow md:flex-grow-0">
        <Link href="/">
          <img
            className="w-28 max-md:w-24"
            src="/images/logo-white.svg"
            alt="Logótipo da SINF"
          />
        </Link>
        {
          /*
        <NavigationMenu>
          <NavigationMenuList className="gap-5">
            <NavigationMenuItem className="hidden sm:block">
              <Link href="/">
                <NavigationMenuLink className={navButtonStyle}>
                  Programa
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:block">
              <Link href="/">
                <NavigationMenuLink className={navButtonStyle}>
                  Loja
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:block">
              <Link href="/">
                <NavigationMenuLink className={navButtonStyle}>
                  Equipa
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:block">
              <Link href="/">
                <NavigationMenuLink className={navLoginStyle}>
                  Login
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
          */
        }
      </nav>
    </>
  );
}
