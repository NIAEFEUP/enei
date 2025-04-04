import { InferPageProps } from "@adonisjs/inertia/types";
import ProfilesController from "#controllers/profiles_controller";
import ParticipantProfile from "#models/participant_profile";
import { Button, buttonVariants } from "~/components/ui/button";
import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { Card } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Eye, EyeOff, CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { Checkbox } from "~/components/ui/checkbox";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "~/lib/utils";
import { PhoneInput } from "~/components/ui/phone-input/phone-input";
import CurricularYearSelector, {
  CurricularYearSelectorType,
} from "~/components/signup/input/curricular_year_input";
import UniversitySelection from "~/components/signup/common/university_selection";
import MultipleSelector from "~/components/ui/multiple-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTuyau } from "~/hooks/use_tuyau";
import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@adonisjs/inertia/types";
import districts from "#data/enei/districts.json" with { type: "json" };
import { universities } from "~/lib/enei/signup/universities";
import { ENEI_EDITIONS } from "~/lib/enei/signup/editions";
import { TRANSPORTS } from "~/lib/enei/signup/transports";
import CvUpload from "~/components/common/cv_upload";
import ProfileInfoForm from "~/components/profile/1_profile_info";

<Container className="mt-8">
  <Card className="bg-enei-beige p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="my-2 grid grid-cols-[auto_1fr] items-center gap-2">
            <Eye />
            <p>
              {" "}
              <span className="font-bold"> Visível: </span> As informações a baixo estão visíveis no
              teu perfil.{" "}
            </p>
          </div>

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Primeiro Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Joca"
                      type="text"
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
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Último Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Costa"
                      type="text"
                      {...field}
                      className="bg-enei-blue text-enei-beige"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Universidade/Faculdade</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="bg-enei-blue text-enei-beige hover:bg-enei-blue hover:text-enei-beige w-full justify-between overflow-ellipsis font-normal"
                    >
                      <UniversitySelection value={field.value} />
                      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="bg-enei-blue border-enei-blue p-0">
                    <Command className="bg-enei-blue text-enei-beige">
                      <CommandInput placeholder="Procurar universidade..." />
                      <CommandList>
                        <CommandEmpty>Nenhuma universidade encontrada</CommandEmpty>
                        <CommandGroup>
                          {universities.map(({ id, name }) => (
                            <CommandItem
                              key={id}
                              value={name.toLowerCase()}
                              onSelect={() => form.setValue(field.name, id, { shouldDirty: true })}
                              className="bg-enei-blue text-enei-beige data-[selected=true]:bg-enei-beige data-[selected=true]:text-enei-blue flex cursor-pointer items-center justify-between text-sm"
                            >
                              <span>{name}</span>
                              <Check
                                className={cn(
                                  "h-4 w-4",
                                  field.value === id ? "opacity-100" : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curso</FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Introduz o teu curso"
                    className="bg-enei-blue text-enei-beige"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="curricularYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano Curricular</FormLabel>
                <FormControl>
                  <CurricularYearSelector
                    defaultValue={form.getValues("curricularYear")}
                    onCurricularYearChange={(curricularYear, lastYear) => {
                      form.setValue(
                        field.name,
                        [curricularYear, lastYear || null] as CurricularYearSelectorType,
                        { shouldDirty: true },
                      );
                    }}
                    variant={"blue"}
                  />
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
                <FormLabel className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (!checked)
                          form.setValue("attendedBeforeEditions", [], { shouldDirty: true });
                      }}
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
          )}

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobre</FormLabel>
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
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>URL do teu GitHub</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/NIAEFEUP"
                    type="text"
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
            name="linkedin"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>URL do teu Linkedin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.linkedin.com/in/oteunome"
                    type="text"
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
            name="website"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>URL do teu Website Pessoal</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://ni.fe.up.pt"
                    type="text"
                    {...field}
                    className="bg-enei-blue text-enei-beige"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem className="flex-1">
            <FormLabel>Currículo</FormLabel>
            <FormControl>
              <CvUpload />
            </FormControl>
            <FormMessage />
          </FormItem>
          {/* TODO: */}
          <div className="hidden">
            <br />
            foto de perfil: // TODO
          </div>

          <div className="my-2 grid grid-cols-[auto_1fr] items-center gap-2">
            <EyeOff />
            <p>
              {" "}
              <span className="font-bold"> Invisível: </span> As informações a baixo não estão
              visíveis no teu perfil.{" "}
            </p>
          </div>

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

          <Button type="submit" disabled={!form.formState.isDirty}>
            Atualizar
          </Button>
        </div>
      </form>
    </Form>
  </Card>
</Container>;
