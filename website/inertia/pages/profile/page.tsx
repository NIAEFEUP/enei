import axios from 'axios'
import { InferPageProps } from '@adonisjs/inertia/types'
import ProfilesController from '#controllers/profiles_controller'
import ParticipantProfile from '#models/participant_profile'
import { Button, buttonVariants } from '~/components/ui/button'
import Page from '~/components/common/page'
import Container from '~/components/common/containers'
import { getUniversityById } from '~/lib/enei/signup/universities'
import { Download, User, Github, Linkedin, Globe, QrCode, LucideProps, Pencil, Landmark, GraduationCap } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog'
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react'
import { Link } from '@tuyau/inertia/react'
import { cn } from '~/lib/utils'
import { Badge } from '~/components/ui/badge'
import { ENEI_EDITIONS } from '~/lib/enei/signup/editions'
import { useTuyau } from '~/hooks/use_tuyau'
import { DialogTitle } from '@radix-ui/react-dialog'

interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}

const SocialIcon = ({ icon: Icon, link }: SocialIconProps) => {
  return (
    <a href={link} className='border-2 border-enei-blue rounded-full h-9 w-9 flex justify-center items-center' target="_blank" rel="noopener noreferrer">
      <Icon className='h-5' />
    </a>
  )
}


const SocialItem = ({ icon: Icon, link }: SocialIconProps) => {
  return (
    <li className='w-fit flex flex-row items-center gap-6'>
      <span className='h-9 w-9'>
        <Icon className='h-9 w-9' />
      </span>
      <a href={link} className='text-sm font-bold' target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    </li>
  )
}

interface RoundBadgeProps {
  icon: React.FC<LucideProps>;
  text: string;
}

const RoundBadge = ({ icon: Icon, text }: RoundBadgeProps) => {
  return (
    <span className='bg-cambridge-blue text-enei-beige h-fit w-fit py-[0.375rem] px-[0.625rem] gap-[0.625rem] rounded-full flex flex-row items-center'>
      <Icon className='h-6 flex-shrink-0' />
      <p className='text-sm font-bold'>{text}</p>
    </span>
  )
}

export default function ProfilePage(props: InferPageProps<ProfilesController, 'index'> & { profile: ParticipantProfile }) {
  const tuyau = useTuyau()
  const { profile, isUser } = props

  const [windowHref, setWindowHref] = useState("");

  useEffect(() => {
    setWindowHref(window.location.href)
  })

  const profileEditions = ENEI_EDITIONS.filter((edition) => profile.attendedBeforeEditions.includes(edition.value)).map((edition) => edition.value)

  const socials: SocialIconProps[] = []

  if (profile.github) socials.push({ icon: Github, link: profile.github })
  if (profile.linkedin) socials.push({ icon: Linkedin, link: profile.linkedin })
  if (profile.website) socials.push({ icon: Globe, link: profile.website })

  const [hasCv, setHasCv] = useState<boolean>(false);

  useEffect(() => {
    const fetchFileName = async () => {
      try {
        const response = await axios.get(tuyau.$url('pages:profile.cv.show', { params: { slug: profile.slug } }));

        setHasCv(response.status === 200)
      } catch (error) {
      }
    };

    fetchFileName();
  }, []);

  return (
    <Page title={`${profile.firstName} ${profile.lastName}`} className="bg-enei-beige text-enei-blue">
      <Container className='mt-8 grid grid-cols-[auto_3fr] gap-16 min-h-screen'>
        <section className='bg-dark-cyan bg-opacity-20 h-full w-[22rem] px-12 pt-12'>
          <div className='size-fit rounded-full overflow-clip bg-enei-blue mb-12'>
            <User className='w-64 h-64 text-enei-beige' />
          </div>
          <ul className='flex flex-col gap-5 mt-7'>
            {socials.length > 0 &&
              socials.map((social: SocialIconProps) => (
                <SocialItem {...social} />
              ))
            }
          </ul>
        </section>

        <section className='pt-12 flex flex-col gap-20'>
          <header>
            <p className='text-5xl uppercase font-bold mb-5'>
              {profile.firstName} {profile.lastName}
            </p>

            <p className='text-xl font-bold mb-4'>
              {profile.about ?? "Sem informação."}
            </p>

            <div className='flex flex-row flex-wrap mb-4 gap-5 gap-y-2'>
              <RoundBadge icon={Landmark} text={getUniversityById(profile.university)!.name} />
              <RoundBadge icon={GraduationCap} text={profile.course} />
              <RoundBadge icon={GraduationCap} text={(profile.curricularYear === 'already-finished') ? ("Concluído em " + profile.finishedAt) : (profile.curricularYear + "º ano")} />
            </div>

            {profileEditions.length > 0 ?
              <div className='flex flex-row flex-wrap gap-4 gap-y-2'>
                {profileEditions.map((edition) => (
                  <span className='bg-sunray rounded-lg px-[0.625rem] py-1'>
                    <p className='text-base font-bold text-enei-beige'>
                      ENEI {edition}
                    </p>
                  </span>
                ))}
              </div>
              :
              <div>
                <Badge variant={'default'}>
                  <p className='text-base font-bold'>
                    Primeiro ENEI
                  </p>
                </Badge>
              </div>
            }
          </header>

          <div>
            <p className='text-persian-orange text-3xl uppercase font-bold mb-5'>
              Currículo
            </p>
            Visualizar Curriculo aqui!
          </div>

        </section>
      </Container>

      <Container className='mt-8'>
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
                {socials.length > 0 &&
                  socials.map((social: SocialIconProps) => (
                    <SocialIcon {...social} />
                  ))
                }
                <div className='flex flex-row gap-2'>
                  {hasCv &&
                    <a href={tuyau.$url('pages:profile.cv.show', { params: { slug: profile.slug } })} className={cn(buttonVariants({ variant: 'default' }), 'w-fit')} target="_blank" rel="noopener noreferrer">
                      <Download />
                      Currículo
                    </a>
                  }
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className='w-fit'>
                        <QrCode />
                        Código QR
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-4/5 max-w-96 sm:w-96 pt-12">
                      <DialogTitle />
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
                {profile.about ?? "Sem informação."}
              </p>
            </div>
          </section>
        </section>
      </Container>
    </Page >
  )
}
