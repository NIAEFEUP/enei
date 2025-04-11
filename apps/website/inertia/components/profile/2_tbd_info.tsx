import { PageProps } from "@adonisjs/inertia/types";
import ParticipantProfile from "#models/participant_profile";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { format } from "date-fns";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import MultipleSelector from "~/components/ui/multiple-selector";
import {
  CommonInfo,
  commonSchema,
  HEARD_ABOUT_FROM,
  INITIAL_MONTH,
  profileToCommonInfo,
  SIZES,
} from "./common/common_info";
import { useTuyau } from "~/hooks/use_tuyau";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { IsNotVisibleDisclaimer } from "./visibility_disclaimer";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { pt } from "date-fns/locale";
import { PhoneInput } from "~/components/ui/phone-input/phone-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TRANSPORTS } from "~/lib/enei/signup/transports";
import districts from "#data/enei/districts.json" with { type: "json" };

type TbdInfoProps = {
  profile: ParticipantProfile;
};

// TODO: Rename this
const TbdInfoForm = ({ profile }: TbdInfoProps) => {
  const tuyau = useTuyau();

  const { csrfToken } = usePage<PageProps & { csrfToken: string }>().props;

  const [initialValues] = useState<CommonInfo>(profileToCommonInfo(profile));

  const form = useForm<CommonInfo>({
    resolver: zodResolver(commonSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (data: CommonInfo) => {
    let payload: Partial<CommonInfo> = {};

    for (const [key, value] of Object.entries(form.formState.dirtyFields)) {
      if (!value) continue;
      const k: keyof CommonInfo = key as keyof CommonInfo;

      payload = { ...payload, [k]: data[k] };
    }

    router.patch(tuyau.$url("actions:profile.update"), {
      ...payload,
      _csrf: csrfToken,
    });
  };

  return (
    <Form {...form}>
      <IsNotVisibleDisclaimer />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "bg-enei-blue text-enei-beige hover:bg-enei-blue/90 hover:text-enei-beige w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: pt })
                        ) : (
                          <span>Seleciona uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialMonth={INITIAL_MONTH}
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={pt}
                      className="bg-enei-blue text-enei-beige"
                      classNames={{
                        day: cn(
                          buttonVariants({ variant: "ghost" }),
                          "DAY table-cell h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-enei-beige",
                        ),
                      }}
                      monthButtonClassName="hover:bg-enei-beige hover:text-enei-blue border-enei-beige"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Número de telemóvel</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder="923 456 789"
                    defaultCountry="PT"
                    locales="pt"
                    countryOptionsOrder={["PT", "..."]}
                    blueVariant
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-enei-blue">
                  Não incluas o código do país.
                </FormDescription>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-enei-blue text-enei-beige">
                      <SelectValue placeholder="Selecionar distrito/região autónoma" />
                    </SelectTrigger>

                    <SelectContent className="bg-enei-blue text-enei-beige">
                      {districts.map((dist) => {
                        return (
                          <SelectItem
                            key={dist.id}
                            value={dist.id}
                            className="bg-enei-blue text-enei-beige focus:bg-enei-beige focus:text-enei-blue"
                          >
                            {dist.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription className="text-enei-blue">
                  Indica o distrito onde nasceste.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shirtSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tamanho da T-shirt</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-enei-blue text-enei-beige">
                      <SelectValue placeholder="Selecionar tamanho" />
                    </SelectTrigger>
                    <SelectContent className="bg-enei-blue text-enei-beige">
                      {SIZES.map((size) => {
                        return (
                          <SelectItem
                            key={size}
                            value={size}
                            className="bg-enei-blue text-enei-beige focus:bg-enei-beige focus:text-enei-blue"
                          >
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
                  <Input
                    placeholder="Intolerâncias, alergias, etc."
                    {...field}
                    className="bg-enei-blue text-enei-beige"
                  />
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
                    className="bg-enei-blue text-enei-beige"
                    badgeClassName="bg-enei-beige text-enei-blue hover:bg-enei-beige/80"
                    commandGroupClassName="bg-enei-blue text-enei-beige"
                    commandGroupInputClassName="data-[selected=true]:bg-enei-beige data-[selected=true]:text-enei-blue"
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
          <FormField
            control={form.control}
            name="heardAboutEnei"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Como ouviste falar do ENEI?</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-enei-blue text-enei-beige">
                      <SelectValue placeholder="Seleciona uma opção" />
                    </SelectTrigger>
                    <SelectContent className="bg-enei-blue text-enei-beige">
                      {HEARD_ABOUT_FROM.map((source) => (
                        <SelectItem
                          key={source.value}
                          value={source.value}
                          className="bg-enei-blue text-enei-beige focus:bg-enei-beige focus:text-enei-blue"
                        >
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
                    className="bg-enei-blue text-enei-beige resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default TbdInfoForm;
