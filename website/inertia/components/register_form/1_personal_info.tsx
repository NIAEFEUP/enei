import * as z from "zod"

import { useForm } from "react-hook-form"
import { useStepper } from "../ui/stepper"
import { toast } from "~/hooks/use_toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import StepperFormActions from "./actions"

const PersonalInfoSchema = z.object({
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    birthDate: z
        .string()
        .refine((value) => !isNaN(Date.parse(value)), {
            message: "Please enter a valid date.",
        }),
    phone: z
        .string()
        .regex(/^\+?[0-9\s-]{9,15}$/, {
            message: "Please enter a valid phone number.",
        }),
    municipality: z.string().min(2, {
        message: "Please enter a valid municipality.",
    }),
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
        toast({
            title: "First step submitted!",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
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
                            <FormLabel>Last Name</FormLabel>
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@email.com" {...field} />
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
                            <FormLabel>Date of Birth</FormLabel>
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
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="+351 123 456 789" {...field} />
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
                            <FormLabel>Municipality</FormLabel>
                            <FormControl>
                                <Input placeholder="Lisbon" {...field} />
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