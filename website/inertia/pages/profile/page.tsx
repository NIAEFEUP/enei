import { InferPageProps } from '@adonisjs/inertia/types'
import ProfilesController from '#controllers/profiles_controller'
import ParticipantProfile from '#models/participant_profile'
import { Button, buttonVariants } from '~/components/ui/button'
import Page from '~/components/common/page'
import Container from '~/components/common/containers'
import { getUniversityById } from '~/lib/enei/signup/universities'
import { Download, EyeOff, User, Github, Instagram, Linkedin, Globe, QrCode, LucideProps, Pencil } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react'
import { Link } from '@tuyau/inertia/react'
import { cn } from '~/lib/utils'
import { Badge } from '~/components/ui/badge'
import editions from '#data/enei/editions.json' with { type: 'json' }
import { Option } from '~/components/ui/multiple-selector'

interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}

const ENEI_EDITIONS: Option[] = editions
  .sort((a, b) => b.year - a.year)
  .map(({ year, location }) => {
    return {
      label: location + ', ' + year.toString(),
      value: year.toString(),
    }
  })

function SocialIcon({ icon: Icon, link }: SocialIconProps) {
  return (
    <a href={link} className='border-2 border-enei-blue rounded-full h-9 w-9 flex justify-center items-center'>
      <Icon className='h-5' />
    </a>
  )
}

export default function ProfilePage(props: InferPageProps<ProfilesController, 'index'> & { profile: ParticipantProfile }) {
  const { profile, isUser } = props

  const [windowHref, setWindowHref] = useState("");

  useEffect(() => {
    setWindowHref(window.location.href)
  })

  const profileEditions = ENEI_EDITIONS.filter((edition) => profile.attendedBeforeEditions.includes(edition.value)).map((edition) => edition.label)

  return (
    <Page title={profile.firstName} className="bg-enei-beige text-enei-blue">
      <Container>
        <section className="relative flex flex-col gap-8 md:justify-between z-10">
          <div className='flex flex-row justify-normal gap-4'>
            <h3 className='text-2xl'>Perfil do Participante</h3>
            {isUser &&
              <Link route="pages:profile.edit" className={cn(buttonVariants({ variant: 'default' }), 'w-fit')}>
                <Pencil />
                <p className=''>Editar</p>
              </Link>
            }
          </div>

          <section className='grid md:grid-cols-[auto_1fr] items-center gap-4 md:gap-8'>
            <div className='size-fit rounded-sm bg-enei-blue mx-auto md:mx-0'>
              <User className='w-48 h-48 text-enei-beige' />
            </div>
            <div className='h-full flex flex-col gap-2 justify-between text-center md:text-start'>
              <p className='text-3xl'>
                {profile.firstName} {profile.lastName}
              </p>
              <div>
                <p className='text-lg'> {profile.course} &#183; {(profile.curricularYear === 'already-finished') ? ("Concluído em " + profile.finishedAt) : (profile.curricularYear + "º ano")} </p>
                <p className='text-lg'> @ {getUniversityById(profile.university)!.name} </p>
              </div>
              <div className='flex flex-row flex-wrap gap-2 justify-center md:justify-start'>
                <div className='flex flex-row gap-2'>
                  <SocialIcon icon={Github} link={"https://github.com"} />
                  <SocialIcon icon={Instagram} link={"https://instagram.com"} />
                  <SocialIcon icon={Linkedin} link={"https://linkedin.com"} />
                  <SocialIcon icon={Globe} link={"https://google.com"} />
                </div>
                <div className='flex flex-row gap-2'>
                  <Button className='w-fit'>
                    <Download />
                    Currículo
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className='w-fit'>
                        <QrCode />
                        Código QR
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-4/5 max-w-96 sm:w-96 pt-12">
                      <QRCodeSVG value={windowHref} className='aspect-square w-full h-full' />
                      <p className='text-center'> {windowHref} </p>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              {profileEditions.length > 0 ?
                <div className='flex flex-row flex-wrap gap-2 justify-center md:justify-normal'>
                  {profileEditions.map((edition) => (
                    <Badge>
                      {edition}
                    </Badge>
                  ))}
                </div>
                :
                <div>
                  <Badge variant={'default'}>
                    Primeiro ENEI
                  </Badge>
                </div>
              }
            </div>
          </section>
          <section className='grid grid-rows-[auto_1fr] gap-4 mt-4'>
            <div>
              <h4 className='font-bold text-lg text-center md:text-left'>
                Sobre
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </section>
          {isUser &&
            <section>
              <div className='grid grid-cols-[auto_1fr] gap-2 items-center my-2'>
                <EyeOff />
                <p> As informações a baixo estão visíveis apenas para ti. </p>
              </div>
            </section>
          }
        </section>
      </Container>
    </Page>
  )
}
