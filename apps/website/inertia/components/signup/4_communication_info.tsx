import { useForm } from "react-hook-form";
import { useTuyau } from "~/hooks/use_tuyau";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import MultipleSelector, { Option } from "../ui/multiple-selector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

import heardaboutfrom from '#data/enei/signup/heard-about.json' with { type: 'json' }
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CommunicationsInfo,
  communicationsInfoSchema,
} from '~/pages/signup/schema'
import { useAtom, useSetAtom } from 'jotai/react'
import {
  personalInfoAtom,
  educationInfoAtom,
  logisticsInfoAtom,
  communicationsInfoAtom,
} from '~/pages/signup/atoms'
import StepperFormActions from './actions'
import { PageProps } from '@adonisjs/inertia/types'
import { router, usePage } from '@inertiajs/react'
import { ENEI_EDITIONS } from '~/lib/enei/signup/editions'

const HEARD_ABOUT_FROM: Option[] = heardaboutfrom;

const CommunicationInfoForm = () => {
  const tuyau = useTuyau();

  const { csrfToken } = usePage<PageProps & { csrfToken: string }>().props;

  const setCommunicationsInfo = useSetAtom(communicationsInfoAtom);
  const [communicationsInfo] = useAtom(communicationsInfoAtom);
  const [personalInfo] = useAtom(personalInfoAtom);
  const [educationInfo] = useAtom(educationInfoAtom);
  const [logisticsInfo] = useAtom(logisticsInfoAtom);

  const form = useForm({
    resolver: zodResolver(communicationsInfoSchema),
    defaultValues: communicationsInfo || {
      heardAboutEnei: "",
      reasonForSignup: "",
      attendedBefore: false,
      attendedBeforeEditions: [],
      termsAndConditions: false,
    },
  });

  const onSubmit = async (data: CommunicationsInfo) => {
    setCommunicationsInfo(data);

    // data is added to the payload with instead of communicationInfo
    // because it does not get updated right away
    const payload = {
      ...personalInfo,
      ...educationInfo,
      ...logisticsInfo,
      ...data,
      _csrf: csrfToken,
    };

    router.post(tuyau.$url("actions:signup"), payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="heardAboutEnei"
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

          <FormField
            control={form.control}
            name="attendedBefore"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={(checked) => {
                      field.onChange(checked)
                      if (!checked) form.setValue("attendedBeforeEditions", [], { shouldDirty: true })
                    }} />
                  </FormControl>
                  <p>Já participaste em alguma edição do ENEI?</p>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("attendedBefore") && (
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
            name="termsAndConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <p>
                    Declaro que li e aceito todos os{" "}
                    <a href="/terms-and-conditions.pdf" target="_blank" className="underline">
                      termos e condições
                    </a>{" "}
                    do evento.
                  </p>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <StepperFormActions />
        </div>
      </form>
    </Form>
  );
};

export default CommunicationInfoForm;
