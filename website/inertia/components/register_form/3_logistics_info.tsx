import * as z from "zod"

import { useForm } from "react-hook-form"
import { useStepper } from "../ui/stepper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import StepperFormActions from "./actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import MultipleSelector, { Option } from '../ui/multiple-selector'

const OPTIONS: Option[] = [
    { label: 'CP - Comboios de Portugal', value: 'CP' },
    { label: 'Metro do Porto', value: 'Metro do Porto' },
    { label: 'STCP', value: 'STCP' },
    { label: 'Rede Expresso', value: 'Rede Expresso' },
    { label: 'FlixBus', value: 'FlixBus' },
    { label: 'Avião', value: 'Avião' },
    { label: 'Carro', value: 'Carro' },
    { label: 'Uber/Bolt', value: 'Uber/Bolt' },
    { label: 'Táxi', value: 'Táxi' },
    { label: 'Bicicleta', value: 'Bicicleta' },
    { label: 'Trotinete', value: 'Trotinete' },
    { label: 'Pé', value: 'Pé' },
];

const LogisticsInfoSchema = z.object({
    tShirtSize: z.string().min(1, { message: "Seleciona um tamanho" }),
    dietaryRestrictions: z.string().optional(),
    isVegetarian: z.boolean(),
    isVegan: z.boolean(),
    transportationModes: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).optional(),
})

const LogisticsInfoForm = () => {
    const { nextStep } = useStepper()

    const form = useForm<z.infer<typeof LogisticsInfoSchema>>({
        resolver: zodResolver(LogisticsInfoSchema),
        defaultValues: {
            tShirtSize: "",
            dietaryRestrictions: "",
            isVegetarian: false,
            isVegan: false,
            transportationModes: []
        },
    })

    function onSubmit() {
        nextStep()
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Tamanho da T-Shirt */}
                <FormField
                    control={form.control}
                    name="tShirtSize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tamanho da T-shirt*</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecionar tamanho" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="XS">XS</SelectItem>
                                        <SelectItem value="S">S</SelectItem>
                                        <SelectItem value="M">M</SelectItem>
                                        <SelectItem value="L">L</SelectItem>
                                        <SelectItem value="XL">XL</SelectItem>
                                        <SelectItem value="2XL">2XL</SelectItem>
                                        <SelectItem value="3XL">3XL</SelectItem>
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
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
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
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
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
                    name="transportationModes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Como estou a pensar deslocar-me para o evento</FormLabel>
                            <FormControl>
                                <MultipleSelector
                                    {...field}
                                    defaultOptions={OPTIONS}
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

                <StepperFormActions />
            </form>
        </Form>
    )
}

export default LogisticsInfoForm
