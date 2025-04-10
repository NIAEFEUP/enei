import Company from "#models/company";
import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import CompanyRepresentatives from "~/components/company/company_representatives";
import CompanySponsorText from "~/components/company/company_sponsors";

interface CompanyProfileProps {
  company: Company;
}

export default function CompanyProfile({ company }: CompanyProfileProps) {
  return (
    <Page title="Perfil de empresa" variant="beige">
      <Container className="flex w-1/2 flex-col gap-y-8">
        <div>
          <h1 className="text-enei-blue text-5xl font-bold uppercase">{company.name}</h1>
          <CompanySponsorText sponsor={company.sponsor} />
        </div>

        <section className="flex flex-row gap-x-8">
          <img
            src="/images/company/uphold.png"
            alt="Logo da empresa"
            className="h-48 w-48 rounded-md border border-black object-cover p-4"
          />
          <section className="flex flex-col gap-y-2">
            <h3 className="text-persian-orange text-2xl font-bold uppercase">Sobre</h3>
            <p>
              {company.about ?? "Sem descrição."}
            </p>
          </section>
        </section>
        <CompanyRepresentatives representatives={company.representativeProfiles} />
      </Container>
    </Page>
  );
}
