import dbConfig from "#config/database"
import SpeakerProfile from "#models/speaker_profile"
import { LucidResource } from "@adminjs/adonis"

const SpeakerProfileResource = {
  resource: new LucidResource(SpeakerProfile, dbConfig.connection),
  options: {
    properties: {
      company_id: {
        isVisible: { list: true, filter: true, show: true, edit: true },
      },
    },
  }
}

export default SpeakerProfileResource