import { PageProps } from "@adonisjs/inertia/types";
import ParticipantProfile from "#models/participant_profile";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
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
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import CurricularYearSelector, {
  CurricularYearSelectorType,
} from "~/components/signup/input/curricular_year_input";
import UniversitySelection from "~/components/signup/common/university_selection";
import MultipleSelector from "~/components/ui/multiple-selector";
import { CommonInfo, commonSchema, profileToCommonInfo } from "./common/common_info";
import { useTuyau } from "~/hooks/use_tuyau";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { universities } from "~/lib/enei/signup/universities";
import { ENEI_EDITIONS } from "~/lib/enei/signup/editions";
import { Textarea } from "../ui/textarea";
import CvUpload from "../common/cv_upload";
import { IsVisibleDisclaimer } from "./visibility_disclaimer";
import AvatarUpload from "../common/avatar_upload";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ProfileInfoProps = {
  profile: ParticipantProfile;
};

const ProfileInfoForm = ({ profile }: ProfileInfoProps) => {
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

  const [cacheBuster, setCacheBuster] = useState(Date.now());

  const refreshAvatar = () => {
    setCacheBuster(Date.now()); // update with current timestamp
  };

  return (
    <Form {...form}>
      <IsVisibleDisclaimer />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Primeiro Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Joca" type="text" {...field} />
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
                    <Input placeholder="Costa" type="text" {...field} />
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
                    <Input placeholder="https://github.com/NIAEFEUP" type="text" {...field} />
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
                    <Input placeholder="https://ni.fe.up.pt" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Avatar className="size-fit self-center">
              <AvatarImage
                src={"/user/avatar" + "#" + cacheBuster}
                alt={profile.slug}
                className="text-enei-beige h-64 w-64"
              />
              <AvatarFallback className="bg-enei-blue text-enei-beige h-64 w-64">
                {profile.slug}
              </AvatarFallback>
            </Avatar>
            <FormItem className="flex-1">
              <FormLabel>Foto de Perfil</FormLabel>
              <FormControl>
                <AvatarUpload onUploadComplete={refreshAvatar} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem className="flex-1">
              <FormLabel>Currículo</FormLabel>
              <FormControl>
                <CvUpload />
              </FormControl>
              <FormMessage />
            </FormItem>
          </div>
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
                    className="w-full justify-between overflow-ellipsis font-normal"
                  >
                    <UniversitySelection value={field.value} />
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Procurar universidade..." />
                    <CommandList>
                      <CommandEmpty>Nenhuma universidade encontrada</CommandEmpty>
                      <CommandGroup>
                        {universities.map(({ id, name }) => (
                          <CommandItem
                            key={id}
                            value={name.toLowerCase()}
                            onSelect={() => form.setValue(field.name, id, { shouldDirty: true })}
                            className="flex cursor-pointer items-center justify-between text-sm"
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
              <FormLabel className="mt-2 flex items-center gap-2">
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
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-16 flex w-full justify-center">
          <Button type="submit" disabled={!form.formState.isDirty}>
            Guardar Alterações
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileInfoForm;
