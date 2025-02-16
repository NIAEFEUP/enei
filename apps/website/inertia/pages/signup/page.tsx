import { Step, Stepper } from '~/components/ui/stepper'
import PersonalInfoForm from '~/components/signup/1_personal_info'
import EducationInfoForm from '~/components/signup/2_student_info'
import LogisticsInfoForm from '~/components/signup/3_logistics_info'
import CommunicationInfoForm from '~/components/signup/4_communication_info'

const steps = [
  { label: 'Informação Pessoal' },
  { label: 'Informação de Estudante' },
  { label: 'Informações de Logística' },
  { label: 'Informações de Comunicação' },
]

import Page from '~/components/common/page'
import { Card } from '~/components/ui/card'
import Container from '~/components/common/containers'

export default function Signup() {
  return (
    <Page title="Criar Perfil" className="bg-enei-blue text-white">
      <Container className="max-w-xl">
        <Card className="px-6 py-12">
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
                  {index === 1 && <EducationInfoForm />}
                  {index === 2 && <LogisticsInfoForm />}
                  {index === 3 && <CommunicationInfoForm />}
                </div>
              </Step>
            ))}
          </Stepper>
        </Card>
      </Container>
    </Page>
  )
}
