import { Step, Stepper } from '~/components/ui/stepper'
import PersonalInfoForm from '~/components/register_form/1_personal_info'
import StudentInfoForm from '~/components/register_form/2_student_info'
import LogisticsInfoForm from '~/components/register_form/3_logistics_info'
import CommunicationInfoForm from '~/components/register_form/4_communication_info'

const steps = [
  { label: 'Informação Pessoal' },
  { label: 'Informação de Estudante' },
  { label: 'Informações de Logística' }, //TODO: (later) See how to make this optional
  { label: 'Comunicação' },
]

import Page from '~/components/common/page'
import { Card } from '~/components/ui/card'
import Container from '~/components/common/containers'
import { Form } from '~/components/ui/form'
import { SignupInfo, signupInfoSchema } from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from 'jotai/react'

const signupInfoAtom = atomWithStorage<SignupInfo>(
  'enei:signup',
  {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: new Date(),
    phone: '',
    municipality: '',
    university: '',
    course: '',
    shirtSize: '',
    dietaryRestrictions: '',
    isVegetarian: false,
    isVegan: false,
    transports: [],
    heardAboutENEI: '',
    participationReason: '',
    reasonForSignup: '',
    attendedBefore: false,
    attendedBeforeEditions: [],
    termsAndConditions: false,
    photoConsent: false,
  },
  undefined,
)

export default function Signup() {
  const [signupInfo, setSignupInfo] = useAtom(signupInfoAtom)

  const form = useForm<SignupInfo>({
    resolver: zodResolver(signupInfoSchema),
    values: signupInfo,
  })

  useEffect(() => {
    const { unsubscribe } = form.watch(($values) => {
      const values = $values as SignupInfo
      setSignupInfo(values)
    })

    return unsubscribe
  }, [form.watch])

  function onSubmit(values: SignupInfo) {
    console.log(values)
  }

  return (
    <Page title="Criar Perfil" className="bg-enei-blue text-white">
      <Container className="max-w-xl">
        <Card className="px-6 py-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Stepper
                variant="circle-alt"
                initialStep={0}
                steps={steps}
                orientation="horizontal"
                responsive={true}
                size="md"
              >
                {/* Content */}
                {steps.map((stepProps, index) => (
                  <Step key={stepProps.label} {...stepProps}>
                    <div className="mt-4">
                      {index === 0 && <PersonalInfoForm />}
                      {index === 1 && <StudentInfoForm />}
                      {index === 2 && <LogisticsInfoForm />}
                      {index === 3 && <CommunicationInfoForm />}
                    </div>
                  </Step>
                ))}
              </Stepper>
            </form>
          </Form>
        </Card>
      </Container>
    </Page>
  )
}
