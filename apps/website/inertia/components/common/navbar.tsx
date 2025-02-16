import { useForm } from '@inertiajs/react'
import { Link } from '@tuyau/inertia/react'
import { Button, buttonVariants } from '~/components/ui/button'
import { useAuth } from '~/hooks/use_auth'
import { useTuyau } from '~/hooks/use_tuyau'
import { cn } from '~/lib/utils'
import Container from './containers'
import { useEffect, useState } from 'react'
import { NotificationContainer } from '../notifications'

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

function LoginButton() {
  return (
    <Link route="pages:auth.login" className={buttonVariants({ variant: 'secondary' })}>
      Entrar
    </Link>
  )
}

function LogoutButton() {
  const tuyau = useTuyau()
  const { post } = useForm()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post(tuyau.$url('actions:auth.logout'))
  }

  return (
    <form onSubmit={onSubmit} method="post">
      <Button type="submit" variant="secondary">
        Logout
      </Button>
    </form>
  )
}

export function Navbar({ className, variant = "blue" }: { className?: string, variant?: string }) {
  const auth = useAuth()
  const [onTop, setOnTop] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener(
      'scroll',
      () => {
        setOnTop(window.scrollY === 0)
      },
      { signal: controller.signal }
    )

    return () => controller.abort()
  }, [])

  const bgColor = variant === "blue" ? "enei-blue" : "enei-beige"
  const textColor = variant === "blue" ? "enei-beige" : "enei-blue"

  return (
    <>
      <NotificationContainer className='w-full flex flex-col' />
      <nav
        className={cn('w-full transition-colors duration-300', !onTop && 'bg-enei-blue', `bg-${bgColor}`, className)}
      >
        <Container>
          <div className="w-full py-6 flex flex-row justify-between items-center flex-wrap gap-2">
            <Link route="pages:home">
              <img
                className="w-20 md:w-28 h-auto"
                src={variant === "blue" ? "/images/logo-white.svg" : "/images/logo-blue.svg"}
                alt="Logótipo do ENEI"
              />
              <span className="sr-only">Ir para a página inicial</span>
            </Link>
            <div className='flex gap-4 items-center justify-between'>
              <div className={auth.state === 'authenticated' ? 'block' : 'hidden'}>
                <Link route="pages:store" className={cn("", `text-${textColor}`)}>
                    <span>Loja</span>
                </Link>
              </div>
              <div className={auth.state === 'authenticated' ? 'block' : 'hidden'}>
                <Link route="pages:referrals" className={cn(buttonVariants({ variant: 'link' }), "text-enei-beige p-0")}>
                  Referenciações
                </Link>
              </div>
              <div>
                {auth.state === 'authenticated' ? (
                  <LogoutButton />
                ) : (
                  auth.state === 'unauthenticated' && <LoginButton />
                )}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  )
}
