import Page from "~/components/common/page";
import Container from "~/components/common/containers";
import { InferPageProps } from "@adonisjs/inertia/types";

import LeaderboardController from "#controllers/leaderboard_controller";
import LeaderboardTitle from "~/components/leaderboard/leaderboard_title";
import LeaderboardList from "~/components/leaderboard/leaderboard_list";
import User from "#models/user";

export default function Leaderboard({
  leaderboard,
}: InferPageProps<LeaderboardController, "index">) {
  return (
    <Page title="Leaderboard" className="bg-enei-beige text-enei-blue" variant="beige">
      <Container className="flex flex-col gap-y-8">
        <LeaderboardTitle />
        <LeaderboardList leaderboard={leaderboard as Array<User>} />
      </Container>
    </Page>
  );
}
