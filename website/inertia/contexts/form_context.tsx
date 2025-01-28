import { createContext, ReactNode, useContext, useState } from 'react'

type FormData = {
  firstName: string
  lastName: string
  dateOfBirth: Date
  email: string
  phone: string
  university: string
  course: string
  curricularYear: Array<number>
  municipality: string
  tShirtSize: string
  dietaryRestrictions: string
  isVegetarian: boolean
  isVegan: boolean
  transportationModes: Array<string>
  heardAboutENEI: string
  participationReason: string
  attendedBeforeEditions: Array<string>
}

const defaultFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: new Date(),
  email: '',
  phone: '',
  university: '',
  course: '',
  curricularYear: [],
  municipality: '',
  tShirtSize: '',
  dietaryRestrictions: '',
  isVegetarian: false,
  isVegan: false,
  transportationModes: [],
  heardAboutENEI: '',
  participationReason: '',
  attendedBeforeEditions: [],
}

export const FormContext = createContext({
  formData: defaultFormData,
  getValue: (_key: keyof FormData): any => {}, // Placeholder function for default context
  updateFormData: (_key: any, _value: unknown) => {}, // Placeholder function for default context
})

type FormProviderProps = {
  children: ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, setFormData] = useState(defaultFormData)

  const updateFormData = (key: keyof FormData, value: unknown) => {
    if (key in formData) {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }))
    }

    console.log(formData)
  }

  const getValue = (key: keyof FormData) => {
    return formData[key]
  }

  return (
    <FormContext.Provider value={{ formData, updateFormData, getValue }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
