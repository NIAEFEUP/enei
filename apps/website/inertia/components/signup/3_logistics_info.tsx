import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import MultipleSelector from "../ui/multiple-selector";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LogisticsInfo, logisticsInfoSchema } from "~/pages/signup/schema";
import sizes from "#data/enei/signup/shirts.json" with { type: "json" };
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepper } from "../ui/stepper";
import { useAtom, useSetAtom } from "jotai/react";
import { logisticsInfoAtom } from "~/pages/signup/atoms";
import StepperFormActions from "./actions";
import { TRANSPORTS } from "~/lib/enei/signup/transports";

const SIZES = sizes;

const LogisticsInfoForm = () => {
  const { nextStep } = useStepper();

  const setLogisticsInfo = useSetAtom(logisticsInfoAtom);
  const [logisticsInfo] = useAtom(logisticsInfoAtom);

  const form = useForm({
    resolver: zodResolver(logisticsInfoSchema),
    defaultValues: logisticsInfo || {
      shirtSize: "",
      dietaryRestrictions: "",
      isVegetarian: false,
      isVegan: false,
      transports: [],
    },
  });

  const onSubmit = (data: LogisticsInfo) => {
    setLogisticsInfo(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="shirtSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tamanho da T-shirt*</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      {SIZES.map((size) => {
                        return (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        );
                      })}
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
                <FormLabel className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
                <FormLabel className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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
            name="transports"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como estou a pensar deslocar-me para o evento</FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    defaultOptions={TRANSPORTS}
                    placeholder="Selecionar meios de transporte"
                    hidePlaceholderWhenSelected={true}
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
        </div>
      </form>
    </Form>
  );
};

export default LogisticsInfoForm;
