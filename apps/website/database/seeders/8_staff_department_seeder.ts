import Department from "#models/department";
import ParticipantProfile from "#models/participant_profile";
import StaffProfile from "#models/staff_profile";
import User from "#models/user";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  async generateUser(name: string, department: string) {
    const user = await User.create({ email: `${name}-${crypto.randomUUID()}@eneiconf.pt` });

    const staffProfile = await StaffProfile.create({ isAdmin: false });

    const departmentModel = await Department.findBy("name", department);
    await staffProfile
      .related("department")
      .associate(departmentModel ?? (await Department.create({ name: department })));
    await staffProfile.related("user").save(user);

    await user.related("staffProfile").associate(staffProfile);

    const participantProfile = await ParticipantProfile.create({
      firstName: name,
      lastName: name,
      dateOfBirth: DateTime.now().minus({ years: 20 }),
      phone: "+351 123456789",
      university: "feup",
      course: "leic",
      curricularYear: "1",
      municipality: "porto",
      shirtSize: "M",
      dietaryRestrictions: "None",
      transports: ["Car"],
      attendedBeforeEditions: ["2022"],
      isVegan: false,
      isVegetarian: false,
      heardAboutEnei: "",
      github: "github.com/niaefeup",
      linkedin: "linkedin.com/niaefeup",
      website: "niaefeup.pt",
    });
    await user.related("participantProfile").associate(participantProfile);
  }

  async run() {
    await Department.createMany([
      { name: "Coordenação Geral", orderPriority: 0 },
      { name: "Animação", orderPriority: 1 },
      { name: "Competições", orderPriority: 1 },
      { name: "Comunicação", orderPriority: 1 },
      { name: "Imagem", orderPriority: 1 },
      { name: "Informática", orderPriority: 1 },
      { name: "Logística", orderPriority: 1 },
      { name: "Programa", orderPriority: 1 },
      { name: "Recreativo", orderPriority: 1 },
      { name: "Relações Empresariais", orderPriority: 1 },
      { name: "Secretaria", orderPriority: 1 },
      { name: "Tesouraria", orderPriority: 1 },
    ]);

    await this.generateUser("João", "Coordenação Geral");
    await this.generateUser("Pedro", "Coordenação Geral");
    await this.generateUser("Maria", "Coordenação Geral");

    await this.generateUser("João", "Animação");
    await this.generateUser("Pedro", "Animação");
    await this.generateUser("Maria", "Animação");
    await this.generateUser("Carlos", "Animação");
    await this.generateUser("Ana", "Animação");
    await this.generateUser("Luís", "Animação");
    await this.generateUser("Joana", "Animação");
    await this.generateUser("Mariana", "Animação");
    await this.generateUser("Francisco", "Animação");
    await this.generateUser("José", "Animação");

    await this.generateUser("João", "Competições");
    await this.generateUser("Pedro", "Competições");
    await this.generateUser("Maria", "Competições");
    await this.generateUser("Carlos", "Competições");
    await this.generateUser("Ana", "Competições");
    await this.generateUser("Luís", "Competições");
    await this.generateUser("Joana", "Competições");
    await this.generateUser("Mariana", "Competições");
    await this.generateUser("Francisco", "Competições");
    await this.generateUser("José", "Competições");

    await this.generateUser("João", "Comunicação");
    await this.generateUser("Pedro", "Comunicação");
    await this.generateUser("Maria", "Comunicação");
    await this.generateUser("Carlos", "Comunicação");
    await this.generateUser("Ana", "Comunicação");
    await this.generateUser("Luís", "Comunicação");
    await this.generateUser("Joana", "Comunicação");

    await this.generateUser("João", "Imagem");
    await this.generateUser("Pedro", "Imagem");
    await this.generateUser("Maria", "Imagem");
    await this.generateUser("Carlos", "Imagem");
    await this.generateUser("Ana", "Imagem");
    await this.generateUser("Luís", "Imagem");
    await this.generateUser("Joana", "Imagem");
    await this.generateUser("Mariana", "Imagem");
    await this.generateUser("Francisco", "Imagem");
    await this.generateUser("José", "Imagem");

    await this.generateUser("João", "Informática");
    await this.generateUser("Pedro", "Informática");
    await this.generateUser("Maria", "Informática");
    await this.generateUser("Carlos", "Informática");
    await this.generateUser("Ana", "Informática");
    await this.generateUser("Luís", "Informática");
    await this.generateUser("Joana", "Informática");
    await this.generateUser("Mariana", "Informática");
    await this.generateUser("Francisco", "Informática");
    await this.generateUser("José", "Informática");

    await this.generateUser("João", "Logística");
    await this.generateUser("Pedro", "Logística");
    await this.generateUser("Maria", "Logística");
    await this.generateUser("Carlos", "Logística");

    await this.generateUser("João", "Programa");
    await this.generateUser("Pedro", "Programa");
    await this.generateUser("Maria", "Programa");
    await this.generateUser("Carlos", "Programa");
    await this.generateUser("Ana", "Programa");
    await this.generateUser("Luís", "Programa");
    await this.generateUser("Joana", "Programa");
    await this.generateUser("Mariana", "Programa");
    await this.generateUser("Francisco", "Programa");
    await this.generateUser("José", "Programa");

    await this.generateUser("João", "Recreativo");
    await this.generateUser("Pedro", "Recreativo");
    await this.generateUser("Maria", "Recreativo");
    await this.generateUser("Carlos", "Recreativo");
    await this.generateUser("Ana", "Recreativo");
    await this.generateUser("Luís", "Recreativo");
    await this.generateUser("Joana", "Recreativo");

    await this.generateUser("João", "Relações Empresariais");
    await this.generateUser("Pedro", "Relações Empresariais");
    await this.generateUser("Maria", "Relações Empresariais");
    await this.generateUser("Carlos", "Relações Empresariais");
    await this.generateUser("Ana", "Relações Empresariais");
    await this.generateUser("Luís", "Relações Empresariais");
    await this.generateUser("Joana", "Relações Empresariais");

    await this.generateUser("João", "Secretaria");

    await this.generateUser("João", "Tesouraria");
    await this.generateUser("Pedro", "Tesouraria");
    await this.generateUser("Maria", "Tesouraria");
  }
}
