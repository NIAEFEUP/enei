import * as z from "zod"

import { useForm } from "react-hook-form"
import { useStepper } from "../ui/stepper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import StepperFormActions from "./actions"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select"

const PersonalInfoSchema = z.object({
    firstName: z.string().min(2, {
        message: "O primeiro nome deve ter pelo menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
        message: "O último nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Insere um email válido",
    }),
    birthDate: z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), {
            message: "Insere uma data válida",
        }),
    phone: z
        .string()
        .regex(/^\+?[0-9\s-]{9,15}$/, {
            message: "Insere um número de telemóvel válido",
        }),
    municipality: z.string(),
})

const PersonalInfoForm = () => {
    const { nextStep } = useStepper()

    const form = useForm<z.infer<typeof PersonalInfoSchema>>({
        resolver: zodResolver(PersonalInfoSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            birthDate: "",
            phone: "",
            municipality: "",
        },
    })

    function onSubmit() {
        nextStep()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primeiro Nome*</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Último Nome*</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                                <Input placeholder="participante@eneiconf.pt" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem>
                            {/* TODO: Melhorar */}
                            <FormLabel>Data de Nascimento*</FormLabel>
                            <FormControl>
                                <Input placeholder="YYYY-MM-DD" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            {/* TODO: Melhorar */}
                            <FormLabel>Número de Telemóvel*</FormLabel>
                            <FormControl>
                                <Input placeholder="+351 923 456 789" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="municipality"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Natural de</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecionar distrito/região autónoma" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Aveiro">Aveiro</SelectItem>
                                        <SelectItem value="Beja">Beja</SelectItem>
                                        <SelectItem value="Braga">Braga</SelectItem>
                                        <SelectItem value="Bragança">Bragança</SelectItem>
                                        <SelectItem value="Castelo Branco">Castelo Branco</SelectItem>
                                        <SelectItem value="Coimbra">Coimbra</SelectItem>
                                        <SelectItem value="Évora">Évora</SelectItem>
                                        <SelectItem value="Faro">Faro</SelectItem>
                                        <SelectItem value="Guarda">Guarda</SelectItem>
                                        <SelectItem value="Leiria">Leiria</SelectItem>
                                        <SelectItem value="Lisboa">Lisboa</SelectItem>
                                        <SelectItem value="Portalegre">Portalegre</SelectItem>
                                        <SelectItem value="Porto">Porto</SelectItem>
                                        <SelectItem value="Santarém">Santarém</SelectItem>
                                        <SelectItem value="Setúbal">Setúbal</SelectItem>
                                        <SelectItem value="Viana do Castelo">Viana do Castelo</SelectItem>
                                        <SelectItem value="Vila Real">Vila Real</SelectItem>
                                        <SelectItem value="Viseu">Viseu</SelectItem>
                                        <SelectItem value="Açores">Açores</SelectItem>
                                        <SelectItem value="Madeira">Madeira</SelectItem>
                                        <SelectItem value="Madeira">Estrangeiro</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <StepperFormActions />
            </form>
        </Form>
    )
}

export default PersonalInfoForm;