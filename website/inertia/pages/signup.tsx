'use client'

import AppLayout from '~/layouts/applayout'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
import { Input } from '~/components/ui/input'
import { useForm } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'

export default function SignUpPage() {

  const { data, setData, post, processing, errors } = useForm({
    name: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/users", {
      onSuccess: () => alert("Form submitted successfully!"),
    });
  };

  return (
    <AppLayout title="SignUp" className="flex flex-col bg-enei-blue">
      <p>OO.00</p>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto text-enei-beige">
        <Accordion type="single" collapsible >
          <AccordionItem value="item-1" aria-expanded="true">
            <AccordionTrigger>
              <h1 className="text-3xl font-bold text-center">1. Informação Pessoal*</h1>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-2">
              <label className="block text-sm font-medium">
                Primeiro e último nome
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Email
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Data de Nascimento
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Telemóvel
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Natural de
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" aria-expanded="true">
            <AccordionTrigger>
              <h1 className="text-3xl font-bold text-center">2. Informação de Estudante*</h1>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-2">
              <label className="block text-sm font-medium">
                Faculdade / Universidade
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Curso
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Ano
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              {/* Já completei o curso */}
              <label className="block text-sm font-medium">
                Já completei o curso
                <Checkbox id="terms2" />
              </label>

              {/* Ano de conclusão */}
              <label className="block text-sm font-medium">
                Ano de conclusão
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" aria-expanded="true">
            <AccordionTrigger>
              <h1 className="text-3xl font-bold text-center">3. Informações de Logística*</h1>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-2">
              <label className="block text-sm font-medium">
                Tamanho da T-Shirt
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Restrições Alimentares
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Vegetariano?
                <Checkbox id="terms2" />
              </label>

              <label className="block text-sm font-medium">
                Vegan?
                <Checkbox id="terms2" />
              </label>

              <label className="block text-sm font-medium">
                O que estou a pensar utilizar para me deslocar até ao evento?
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" aria-expanded="true">
            <AccordionTrigger>
              <h1 className="text-3xl font-bold text-center">4. Comunicação</h1>
            </AccordionTrigger>
            <AccordionContent>
              <label className="block text-sm font-medium">
                Como ouviste falar do ENEI?
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>
              <label className="block text-sm font-medium">
                Qual a principal razão pela qual decidiste participar no ENEI?
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>

              <label className="block text-sm font-medium">
                Já participaste em edições anteriores do ENEI?
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </label>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col space-y-4 py-5">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms1" />
            <Label htmlFor="terms1">Declaro que li e aceito todos os termos e condições do evento</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <Label htmlFor="terms2">Declaro que possa ser fotografado e a minha imagem possa ser usada para publicação nas redes sociais do evento</Label>
          </div>
          <Button type="submit" disabled={processing}>
            Registar na 16ª Edição do ENEI
          </Button>
        </div>
      </form>

    </AppLayout>
  )
}
