import type EventCheckin from "#events/event_checkin";
import PointsService from "#services/points_service";

export default class EventCheckinListener {
    async handle(checkin: EventCheckin) {
        await PointsService.eventCheckinPointAttribution(
            checkin.user,
            checkin.participationProduct
        )
    }
}