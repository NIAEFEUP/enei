import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import StepperFormActions from "./actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import MultipleSelector, { Option } from '../ui/multiple-selector'

const ENEI_EDITIONS: Option[] = [
    { value: '15', label: '15º edição, 2023' },
    { value: '14', label: '14º edição, 2020' },
    { value: '13', label: '13º edição, 2019' },
    { value: '12', label: '12º edição, 2018' },
    { value: '11', label: '11º edição, 2016' },
    { value: '10', label: '10º edição, 2015' },
    { value: '9', label: '9º edição, 2014' },
    { value: '8', label: '8º edição, 2013' },
    { value: '7', label: '7º edição, 2012' },
    { value: '6', label: '6º edição, 2011' },
    { value: '5', label: '5º edição, 2010' },
    { value: '4', label: '4º edição, 2008' },
    { value: '3', label: '3º edição, 2007' },
    { value: '2', label: '2º edição, 2006' },
    { value: '1', label: '1º edição, 2005' },
];

const CommunicationFormSchema = z.object({
    heardAboutENEI: z.string().min(1, { message: "Seleciona uma opção" }),
    participationReason: z.string().optional(),
    attendedBefore: z.boolean(),
    attendedBeforeEditions: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).optional(),
    termsAndConditions: z
        .boolean()
        .refine((value) => value === true, {
            message: "Tens de aceitar os termos e condições",
        }),
    photoConsent: z
        .boolean()
        .refine((value) => value === true, {
            message: "Tens de aceitar o consentimento",
        }),
})

const CommunicationInfoForm = () => {
    const form = useForm<z.infer<typeof CommunicationFormSchema>>({
        resolver: zodResolver(CommunicationFormSchema),
        defaultValues: {
            heardAboutENEI: "",
            participationReason: "",
            attendedBefore: false,
            termsAndConditions: false,
            photoConsent: false,
        },
    })

    function onSubmit() {
        //TODO: Submit data
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="heardAboutENEI"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Como ouviste falar do ENEI?</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleciona uma opção" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="friends">Amigos</SelectItem>
                                        <SelectItem value="socialMedia">Redes Sociais</SelectItem>
                                        <SelectItem value="university">Banca</SelectItem>
                                        <SelectItem value="other">Outro</SelectItem>
                                        <SelectItem value="unknow">Já não me lembro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="participationReason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Qual a principal razão para te inscreveres no ENEI?</FormLabel>
                            <FormControl>
                                <Input placeholder="Eg. Networking, Workshops, Palestras, etc." {...field} />
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
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
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
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <p>Declaro que li e aceito todos os termos e condições do evento.</p>
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="photoConsent"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <p>Declaro que posso ser fotografado e que a minha imagem pode ser utilizada para publicações nas redes sociais do evento.</p>
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <StepperFormActions />
            </form>
        </Form>
    )
}

export default CommunicationInfoForm