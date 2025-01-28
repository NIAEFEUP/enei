import { useForm } from '@inertiajs/react'
import { Link } from '@tuyau/inertia/react'
import { Button, buttonVariants } from '~/components/ui/button'
import { useAuth } from '~/hooks/use_auth'
import { useTuyau } from '~/hooks/use_tuyau'
import { cn } from '~/lib/utils'
import Container from './containers'
import { useEffect, useState } from 'react'

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
      Login
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

export function Navbar({ className }: { className?: string }) {
  const auth = useAuth()
  const [onTop, setOnTop] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener('scroll', () => {
      setOnTop(window.scrollY === 0)
    }, { signal: controller.signal })

    return () => controller.abort()
  }, [])

  return (
    <nav className={cn('w-full transition-colors duration-300', !onTop && "bg-enei-blue", className)}>
      <Container>
        <div className="w-full py-6 flex flex-row justify-between items-center">
          <Link route="pages:home">
            <img className="w-20 md:w-28 h-auto" src="/images/logo-white.svg" alt="Logótipo do ENEI" />
            <span className='sr-only'>Ir para a página inicial</span>
          </Link>
          {auth.state === 'authenticated' ? (
            <LogoutButton />
          ) : (
            auth.state === 'unauthenticated' && <LoginButton />
          )}
        </div>
      </Container>
    </nav>
  )
}
