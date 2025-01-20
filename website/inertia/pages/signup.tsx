'use client'

import AppLayout from '~/layouts/applayout'
import { Step, Stepper } from '~/components/ui/stepper'
import PersonalInfoForm from '~/components/register_form/1_personal_info'
import StudentInfoForm from '~/components/register_form/2_student_info'
import LogisticsInfoForm from '~/components/register_form/3_logistics_info'
import CommunicationInfoForm from '~/components/register_form/4_communication_info'

const steps = [
  { label: "Informação Pessoal" },
  { label: "Informação de Estudante" },
  { label: "Informações de Logística" }, //TODO: (later) See how to make this optional
  { label: "Comunicação" },
]

export default function SignUpPage() {

  return (
    <AppLayout title="SignUp" className="flex flex-col bg-enei-blue">
      <p></p>
      <div className="flex flex-col gap-4 max-w-96 mx-auto text-enei-beige">
        <Stepper variant="circle-alt" initialStep={0} steps={steps} orientation="horizontal" responsive={true} size="md">

          {/* Content */}
          {steps.map((stepProps, index) => (
            <Step key={stepProps.label} {...stepProps}>
              {index === 0 && <PersonalInfoForm />}
              {index === 1 && <StudentInfoForm />}
              {index === 2 && <LogisticsInfoForm />}
              {index === 3 && <CommunicationInfoForm />}
            </Step>
          ))}
        </Stepper>
      </div>

    </AppLayout>
  )
}
