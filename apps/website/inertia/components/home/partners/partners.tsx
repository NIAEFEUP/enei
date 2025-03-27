import BronzePartners from "./bronze-partners";
import Collaborators from "./collaborators";
import GoldPartners from "./gold-partners";
import InstitutionalPartners from "./institutional-partners";
import OfficialPartner from "./official-partner";
import Organizers from "./organizers";
import Orgs from "./orgs";
import SilverPartners from "./silver-partners";
import Sponsors from "./sponsors";

export default function Partners() {
    return (
        <div className="w-full flex flex-col items-center mt-32">
            <h3 className="text-3xl font-bold text-center text-enei-blue lowercase">parceiros</h3>
            <div className="w-full flex flex-col items-center mt-4">
                <OfficialPartner />
                <GoldPartners />
                <SilverPartners />
                <BronzePartners />
            </div>
            <div className="w-full flex flex-col gap-y-16 mt-[20em]">
                <Sponsors />
                <InstitutionalPartners />
                <Orgs />
                <Collaborators />
                <Organizers />
            </div>
        </div>
    )
}