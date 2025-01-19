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

const StudentInfoSchema = z.object({
    university: z.string().min(1, { message: "Please select a university." }),
    course: z.string().min(1, { message: "Please select a course." }),
    year: z.string().min(1, { message: "Please select a year." }),
    completedCourse: z.boolean(),
    graduationYear: z
        .number()
        .int()
        .min(1900)
        .max(new Date().getFullYear())
        .optional()
})

const StudentInfoForm = () => {
    const { nextStep } = useStepper()

    const form = useForm<z.infer<typeof StudentInfoSchema>>({
        resolver: zodResolver(StudentInfoSchema),
        defaultValues: {
            university: "",
            course: "",
            year: "1",
            completedCourse: false,
            graduationYear: undefined,
        },
    })

    function onSubmit() {
        nextStep()
        toast({ title: "First step submitted!" })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Campo de Universidade com Command */}
                <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>University</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a university" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="University A">University A</SelectItem>
                                        <SelectItem value="University B">University B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Course A">Course A</SelectItem>
                                        <SelectItem value="Course B">Course B</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ano Curricular</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1ª Ano</SelectItem>
                                        <SelectItem value="2">2ª Ano</SelectItem>
                                        <SelectItem value="3">3ª Ano</SelectItem>
                                        <SelectItem value="4">4ª Ano</SelectItem>
                                        <SelectItem value="5">5ª Ano</SelectItem>
                                        <SelectItem value="6">6ª Ano</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="completedCourse"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                Completed Course
                            </FormLabel>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.watch("completedCourse") && (
                    <FormField
                        control={form.control}
                        name="graduationYear"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Graduation Year</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="2025" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <StepperFormActions />
            </form>
        </Form>
    )
}

export default StudentInfoForm
