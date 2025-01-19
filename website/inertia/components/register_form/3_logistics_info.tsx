import * as z from "zod"

import { useForm } from "react-hook-form"
import { useStepper } from "../ui/stepper"
import { toast } from "~/hooks/use_toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import StepperFormActions from "./actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"

const LogisticsInfoSchema = z.object({
    tShirtSize: z.string().min(1, { message: "Please select a T-Shirt size." }),
    dietaryRestrictions: z.string().optional(),
    isVegetarian: z.boolean(),
    isVegan: z.boolean(),
    transportationModes: z.array(z.string()).optional(),
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
            transportationModes: [],
        },
    })

    function onSubmit() {
        nextStep()
        toast({ title: "Additional information submitted!" })
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
                            <FormLabel>T-Shirt Size</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="S">Small</SelectItem>
                                        <SelectItem value="M">Medium</SelectItem>
                                        <SelectItem value="L">Large</SelectItem>
                                        <SelectItem value="XL">Extra Large</SelectItem>
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
                            <FormLabel>Dietary Restrictions</FormLabel>
                            <FormControl>
                                <Input placeholder="E.g., Gluten-free, Nut allergy" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Vegetariano? */}
                <FormField
                    control={form.control}
                    name="isVegetarian"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                Vegetarian?
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
                            <FormLabel>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                Vegan?
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Transporte até ao evento */}
                <FormField
                    control={form.control}
                    name="transportationModes"
                    render={() => (
                        <FormItem>
                            <FormLabel>Transportation Modes</FormLabel>
                            <FormControl>

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
