import * as z from "zod"

import { useForm } from "react-hook-form"
import { useStepper } from "../ui/stepper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import StepperFormActions from "./actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"

const StudentInfoSchema = z.object({
    university: z.string().min(1, { message: "Seleciona uma universidade/faculdade" }),
    course: z.string().min(1, { message: "Seleciona um curso" }),
    year: z.number().int().min(1).max(5),
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
            year: 1,
            completedCourse: false,
            graduationYear: 2024, //TODO: remove this if completedCourse is false ig on submmited
        },
    })

    function onSubmit() {
        nextStep()
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
                            <FormLabel>Universidade/Faculdade*</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleciona a tua universidade/faculdade" />
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
                            <FormLabel>Curso*</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleciona o teu curso" />
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
                            <FormLabel>Ano Curricular*</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => field.onChange(parseInt(value))}
                                    defaultValue={field.value.toString()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleciona o teu ano" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1ª Ano</SelectItem>
                                        <SelectItem value="2">2ª Ano</SelectItem>
                                        <SelectItem value="3">3ª Ano</SelectItem>
                                        <SelectItem value="4">4ª Ano</SelectItem>
                                        <SelectItem value="5">5ª Ano</SelectItem>
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
                            <FormLabel className="flex gap-2 items-center">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <p>Já terminei o curso</p>
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
                                <FormLabel>Ano de conclusão</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        defaultValue={field.value?.toString() ?? "2024"}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="XXXX" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Array.from({ length: 75 }, (_, i) => 2024 - i).map((year) => (
                                                <SelectItem key={year} value={year.toString()}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

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
