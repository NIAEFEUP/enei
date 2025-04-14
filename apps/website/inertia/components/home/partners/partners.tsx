import InvitedAssociations from "../invited_associations/invited_associations";
import BronzePartners from "./bronze_partners";
import Collaborators from "./collaborators";
import GoldPartners from "./gold_partners";
import InstitutionalPartners from "./institutional_partners";
import OfficialPartner from "./official_partner";
import Organizers from "./organizers";
import Orgs from "./orgs";
import SilverPartners from "./silver_partners";
import Sponsors from "./sponsors";

export default function Partners() {
  return (
    <div className="mt-32 flex w-full flex-col items-center gap-y-16">
      <h3 className="text-enei-blue text-center text-3xl font-bold lowercase">parceiros</h3>
      <div className="mt-4 flex w-full flex-col items-center">
        <OfficialPartner />
        <GoldPartners />
        <SilverPartners />
        <BronzePartners />
      </div>
      <div className="mt-[5em] flex w-full flex-col gap-y-16 md:mt-[10em]">
        <Sponsors />
        <InstitutionalPartners />
        <InvitedAssociations />
        <Orgs />
        <Collaborators />
        <Organizers />
      </div>
    </div>
  );
}
