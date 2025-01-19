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

const CommunicationFormSchema = z.object({
    heardAboutENEI: z.string().min(1, { message: "Please select an option." }),
    participationReason: z.string().min(5, { message: "Please provide a reason." }),
    attendedBefore: z.boolean(),
    termsAndConditions: z
        .boolean()
        .refine((value) => value === true, {
            message: "You must accept the terms and conditions.",
        }),
    photoConsent: z
        .boolean()
        .refine((value) => value === true, {
            message: "You must consent to photo usage.",
        }),
})

const CommunicationInfoForm = () => {
    const { nextStep } = useStepper()

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
        nextStep()
        toast({ title: "Event information submitted!" })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Como ouviste falar do ENEI? */}
                <FormField
                    control={form.control}
                    name="heardAboutENEI"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>How did you hear about ENEI?</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="friends">Friends</SelectItem>
                                        <SelectItem value="socialMedia">Social Media</SelectItem>
                                        <SelectItem value="university">University</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Qual a principal razão pela qual decidiste participar no ENEI? */}
                <FormField
                    control={form.control}
                    name="participationReason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>What is your main reason for attending ENEI?</FormLabel>
                            <FormControl>
                                <Input placeholder="E.g., Networking, Learning, Fun" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Já participaste em edições anteriores do ENEI? */}
                <FormField
                    control={form.control}
                    name="attendedBefore"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                Have you attended previous editions of ENEI?
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* If yes, upper, tell us when */}

                {/* Termos e Condições (Required) */}
                <FormField
                    control={form.control}
                    name="termsAndConditions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                I declare that I have read and accept all the terms and conditions of the event.
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Consentimento para fotografia (Required) */}
                <FormField
                    control={form.control}
                    name="photoConsent"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                                I declare that I can be photographed and that my image can be used for event social media publications.
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