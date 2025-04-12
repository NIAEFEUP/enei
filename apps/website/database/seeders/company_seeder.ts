import { BaseSeeder } from "@adonisjs/lucid/seeders";
import RepresentativeProfile from "#models/representative_profile";
import User from "#models/user";
import Event from "#models/event"
import { DateTime } from "luxon";
import Company from "#models/company";

export default class ProductGroupSeeder extends BaseSeeder {
  public async run() {
    const company = await Company.create({
      name: "ENEI",
      logo: "/images/logo-blue.svg",
    });
    
    const companyRepresentative = await User.create({
      email: "company@eneiconf.pt",
      emailVerifiedAt: DateTime.now(),
    });
    
    await companyRepresentative.related("accounts").create({
      id: `credentials:company@eneiconf.pt`,
      password: "password",
    });
    
    const companyRepresentativeProfile = await RepresentativeProfile.create({
      firstName: "João",
      lastName: "Silva",
      jobTitle: "CEO",
      ORCIDLink: "https://orcid.org/0000-0002-1825-0097",
    });
    
    await companyRepresentative
      .related("representativeProfile")
      .associate(companyRepresentativeProfile);
    
    await companyRepresentativeProfile.related("company").associate(company);
    
    const companyEvent = await Event.create({
      title: "Banca - Blip",
      date: DateTime.fromObject({ year: 2025, month: 4, day: 12, hour: 13, minute: 30}),
      duration: 330,
      type: "company",
      location: "Corredor B - FEUP",
      registrationRequirements: "",
      requiresRegistration: false,
    })
    
    await companyEvent.related("company").associate(company);
  }
}