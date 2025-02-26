import { InferPageProps } from '@adonisjs/inertia/types'
import ProfilesController from '#controllers/profiles_controller'
import ParticipantProfile from '#models/participant_profile'
import { Button } from '~/components/ui/button'
import Page from '~/components/common/page'
import Container from '~/components/common/containers'
import { getUniversityById } from '~/lib/enei/signup/universities'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { AdditionalInfo, additionalInfoSchema, CommunicationsInfo, communicationsInfoSchema, EducationInfo, educationInfoSchema, LogisticsInfo, logisticsInfoSchema, PersonalInfo, personalInfoSchema } from '~/pages/signup/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import {
  Download,
  User,
  Github,
  Linkedin,
  Globe,
  LucideProps,
  Eye,
  EyeOff,
  CalendarIcon,
  Check,
  ChevronsUpDown,
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Input } from '~/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Calendar } from '~/components/ui/calendar'
import { Checkbox } from '~/components/ui/checkbox'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { cn } from '~/lib/utils'
import { PhoneInput } from '~/components/ui/phone-input/phone-input'
import { z } from 'zod'
import CurricularYearSelector, { CurricularYearSelectorType } from '~/components/signup/input/curricular_year_input'
import UniversitySelection from '~/components/signup/common/university_selection'
import districts from '#data/enei/districts.json' with { type: 'json' }
import sizes from '#data/enei/signup/shirts.json' with { type: 'json' }
import heardaboutfrom from '#data/enei/signup/heard-about.json' with { type: 'json' }
import { universities } from '~/lib/enei/signup/universities'
import { ENEI_EDITIONS } from '~/lib/enei/signup/editions'
import MultipleSelector, { Option } from '~/components/ui/multiple-selector'
import { TRANSPORTS } from '~/lib/enei/signup/transports'
import { Textarea } from '~/components/ui/textarea'

// TODO: Refactor exists in profile/page.tsx
interface SocialIconProps {
  icon: React.FC<LucideProps>;
  link: string;
}

const INITIAL_MONTH = new Date(2004, 0, 1)
const SIZES = sizes
const HEARD_ABOUT_FROM: Option[] = heardaboutfrom

const SocialIcon = ({ icon: Icon, link }: SocialIconProps) => {
  return (
    <a href={link} className='border-2 border-enei-blue rounded-full h-9 w-9 flex justify-center items-center' target="_blank" rel="noopener noreferrer">
      <Icon className='h-5' />
    </a>
  )
}

type CommonInfo =
  & PersonalInfo
  & EducationInfo
  & LogisticsInfo
  & CommunicationsInfo
  & AdditionalInfo

const commonSchema = z.object({
  ...personalInfoSchema.shape,
  ...educationInfoSchema.shape,
  ...logisticsInfoSchema.shape,
  ...communicationsInfoSchema.shape,
  ...additionalInfoSchema.shape,
})

export default function ProfilePage(props: InferPageProps<ProfilesController, 'index'> & { profile: ParticipantProfile }) {
  const { profile } = props

  const profileEditions = ENEI_EDITIONS.filter((edition) => profile.attendedBeforeEditions.includes(edition.value)).map((edition) => edition.label)

  const socials: SocialIconProps[] = []

  if (profile.github) socials.push({ icon: Github, link: `https://github.com/${profile.github}` })
  if (profile.linkedin) socials.push({ icon: Linkedin, link: `https://linkedin.com/in/${profile.linkedin}` })
  if (profile.website) socials.push({ icon: Globe, link: `//${profile.website}` })


  const form = useForm<CommonInfo>({
    resolver: zodResolver(commonSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      university: '',
      course: '',
      curricularYear: ['1', null] as CurricularYearSelectorType,
      shirtSize: '',
      dietaryRestrictions: '',
      isVegetarian: false,
      isVegan: false,
      transports: [],
      heardAboutENEI: '',
      reasonForSignup: '',
      attendedBefore: false,
      attendedBeforeEditions: [],
      termsAndConditions: false,
      about: '',
      github: '',
      linkedin: '',
      website: '',
    },
  })

  const onSubmit = (data: CommonInfo) => {
    console.log(data)
  }

  return (
    <Page title={`${profile.firstName} ${profile.lastName}`} className="bg-enei-beige text-enei-blue">
      <Container className='mt-8'>
        <Card className='p-4'>
          <section className="relative flex flex-col gap-8 md:justify-between z-10">
            <h3 className='text-2xl'>Perfil do Participante</h3>

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
                    <Button className='w-fit'>
                      <Download />
                      Currículo
                    </Button>
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




          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <div className='grid grid-cols-[auto_1fr] gap-2 items-center my-2'>
                  <Eye />
                  <p> <span className='font-bold'> Visível: </span> As informações a baixo estão visíveis no teu perfil. </p>
                </div>

                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Primeiro Nome*</FormLabel>
                        <FormControl>
                          <Input placeholder="Joca" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Último Nome*</FormLabel>
                        <FormControl>
                          <Input placeholder="Costa" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Universidade/Faculdade*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between overflow-ellipsis font-normal"
                          >
                            <UniversitySelection value={field.value} />
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Procurar universidade..." />
                            <CommandList>
                              <CommandEmpty>Nenhuma universidade encontrada</CommandEmpty>
                              <CommandGroup>
                                {universities.map(({ id, name }) => (
                                  <CommandItem
                                    key={id}
                                    value={name.toLowerCase()}
                                    onSelect={() => form.setValue(field.name, id)}
                                    className="flex cursor-pointer items-center justify-between text-sm"
                                  >
                                    <span>{name}</span>
                                    <Check
                                      className={cn(
                                        'h-4 w-4',
                                        field.value === id ? 'opacity-100' : 'opacity-0'
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curso*</FormLabel>
                      <FormControl>
                        <Input
                          onChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Introduz o teu curso"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="curricularYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ano Curricular*</FormLabel>
                      <FormControl>
                        <CurricularYearSelector
                          defaultValue={form.getValues('curricularYear')}
                          onCurricularYearChange={(curricularYear, lastYear) => {
                            form.setValue(field.name, [
                              curricularYear,
                              lastYear || null,
                            ] as CurricularYearSelectorType)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attendedBefore"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <p>Já participaste em alguma edição do ENEI?</p>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('attendedBefore') && (
                  <FormField
                    control={form.control}
                    name="attendedBeforeEditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Em qual edição?</FormLabel>
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            defaultOptions={ENEI_EDITIONS}
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                Sem resultados
                              </p>
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobre</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Aprender novas tecnologias, melhorar soft skills..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Username do GitHub</FormLabel>
                      <FormControl>
                        <Input placeholder="NIAEFEUP" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Username do Linkedin</FormLabel>
                      <FormControl>
                        <Input placeholder="NIAEFEUP" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Website Pessoal</FormLabel>
                      <FormControl>
                        <Input placeholder="ni.fe.up.pt" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                { /* TODO: */}
                <br />
                foto de perfil: // todo
                <br />
                Currículo: // TODO

                <div className='grid grid-cols-[auto_1fr] gap-2 items-center my-2'>
                  <EyeOff />
                  <p> <span className='font-bold'> Invisível: </span> As informações a baixo não estão visíveis no teu perfil. </p>
                </div>

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Nascimento*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP', { locale: pt })
                              ) : (
                                <span>Seleciona uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            initialMonth={INITIAL_MONTH}
                            selected={field.value}
                            onSelect={field.onChange}
                            locale={pt}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>Número de telemóvel*</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder="923 456 789"
                          defaultCountry="PT"
                          locales="pt"
                          countryOptionsOrder={['PT', '...']}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Não incluas o código do país.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="municipality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Natural de*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar distrito/região autónoma" />
                          </SelectTrigger>

                          <SelectContent>
                            {districts.map((dist) => {
                              return (
                                <SelectItem key={dist.id} value={dist.id}>
                                  {dist.name}
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Indica o distrito onde nasceste.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shirtSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tamanho da T-shirt*</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecionar tamanho" />
                          </SelectTrigger>
                          <SelectContent>
                            {SIZES.map((size) => {
                              return <SelectItem key={size} value={size}>{size}</SelectItem>
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Restrições Alimentares */}
                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restrições alimentares</FormLabel>
                      <FormControl>
                        <Input placeholder="Intolerâncias, alergias, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isVegetarian"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <p>Vegetariano?</p>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Vegan? */}
                <FormField
                  control={form.control}
                  name="isVegan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <p>Vegan?</p>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Transporte até ao evento */}
                <FormField
                  control={form.control}
                  name="transports"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Como estou a pensar deslocar-me para o evento</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={TRANSPORTS}
                          placeholder="Selecionar meios de transporte"
                          hidePlaceholderWhenSelected={true}
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              Sem resultados
                            </p>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="heardAboutENEI"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Como ouviste falar do ENEI?</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleciona uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            {HEARD_ABOUT_FROM.map((source) => (
                              <SelectItem key={source.value} value={source.value}>
                                {source.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reasonForSignup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qual a principal razão para te inscreveres no ENEI?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Aprender novas tecnologias, melhorar soft skills..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Atualizar</Button>
              </div>
            </form>
          </Form>
        </Card>
      </Container>
    </Page>
  )
}
