import TeamController from "#controllers/team_controller";
import Department from "#models/department";
import User from "#models/user";
import { InferPageProps } from "@adonisjs/inertia/types";
import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import TeamSection from "~/components/team/team_section";

export default function Team({
  departments,
  staffByDepartment,
}: InferPageProps<TeamController, "index">) {
  return (
    <Page title="Equipa" variant="beige">
      <Container className="flex flex-col gap-y-16">
        <section className="">
          <h1 className="text-enei-blue text-center text-3xl font-bold">Equipa</h1>
          <p className="text-enei-blue mt-4 text-center">
            Uma equipa dedicada, movida pela paixão pela Engenharia Informática, transformando
            ideias em realidade para fazer do ENEI uma experiência inesquecível!
          </p>
        </section>
        {departments.map((department) => (
          <TeamSection
            key={`team-section-${department.id}`}
            department={department as Department}
            people={staffByDepartment[department.name] as User[]}
          />
        ))}
      </Container>
    </Page>
  );
}
