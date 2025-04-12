import Container from "~/components/common/containers";
import Page from "~/components/common/page";
import { ParticipantsTable } from "~/components/companies/participants/participants_table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface Participant {
  id: number;
  name: string;
  photoUrl?: string;
  faculty: string;
  course: string;
  year: string;
  cvLink: string;
  likedBy: string[];
  isLiked: boolean;
}

interface ParticipantsPageProps {
  allParticipants: Participant[];
  checkedParticipants: Participant[];
  likedParticipants: Participant[];
}

export default function CompanyParticipantsPage({
  allParticipants,
  checkedParticipants,
  likedParticipants,
}: ParticipantsPageProps) {
  console.log({allParticipants, checkedParticipants, likedParticipants})
  return (
    <Page title="Participantes" variant="beige" className="bg-enei-beige">
      <Container>
        <Tabs defaultValue="all-participants">
          <TabsList className="bg-enei-blue grid w-full grid-cols-3">
            <TabsTrigger
              value="all-participants"
              className="text-enei-beige data-[state=active]:bg-enei-beige data-[state=active]:text-enei-blue"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              value="checked-participants"
              className="text-enei-beige data-[state=active]:bg-enei-beige data-[state=active]:text-enei-blue"
            >
              Presentes
            </TabsTrigger>
            <TabsTrigger
              value="liked-participants"
              className="text-enei-beige data-[state=active]:bg-enei-beige data-[state=active]:text-enei-blue"
            >
              Favoritos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all-participants">
            {allParticipants && <ParticipantsTable participants={allParticipants} />}
          </TabsContent>
          <TabsContent value="checked-participants">
            <ParticipantsTable participants={checkedParticipants} />
          </TabsContent>
          <TabsContent value="liked-participants">
            <ParticipantsTable participants={likedParticipants} />
          </TabsContent>
        </Tabs>
      </Container>
    </Page>
  );
}
