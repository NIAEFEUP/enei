import { CardTitle } from '../ui/card'
import EventCard from './event_card'

interface LongActivitesProps {
  currentActiveIndex: number
}

export default function LongActivities({ currentActiveIndex }: LongActivitesProps) {
  return (
    <div className="flex flex-col space-y-5">
      <CardTitle>Atividades Longas</CardTitle>
      {currentActiveIndex === 0 && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 flex-grow sm:space-x-4 ">
          <EventCard
            title={'Check-in'}
            type={'activity'}
            time={'14:00 - 23:00'}
            location={'TBD - ISEP'}
            speakers={[]}
          />
        </div>
      )}

      {currentActiveIndex === 1 && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 flex-grow sm:space-x-4 ">
          <EventCard
            title={'Check-in'}
            type={'activity'}
            time={'9:00 - 21:30'}
            location={'TBD'}
            speakers={[]}
          />
          <EventCard
            title={'Feira de Emprego'}
            type={'activity'}
            time={'14:00 - 18:30'}
            location={'Corredor B - FEUP'}
            speakers={[]}
          />

          <EventCard
            title={'Competição de Programação'}
            type={'activity'}
            time={'14:30 - 18:30'}
            location={'TBD - FEUP'}
            speakers={[]}
          />
        </div>
      )}

      {currentActiveIndex === 2 && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 flex-grow sm:space-x-4 ">
          <EventCard
            title={'Check-in'}
            type={'activity'}
            time={'9:00 - 21:30'}
            location={'TBD'}
            speakers={[]}
          />
          <EventCard
            title={'Feira de Emprego'}
            type={'activity'}
            time={'14:00 - 18:30'}
            location={'Corredor B - FEUP'}
            speakers={[]}
          />

          <EventCard
            title={'Competição de Pitches'}
            type={'activity'}
            time={'14:30 - 18:30'}
            location={'TBD - FEUP'}
            speakers={[]}
          />

          <EventCard
            title={'Sessão de Cocktails'}
            type={'activity'}
            time={'18:00 - 19:30'}
            location={'Coffee Lounge - FEUP'}
            speakers={[]}
          />
        </div>
      )}

      {currentActiveIndex === 3 && (
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 flex-grow md:space-x-4 ">
          <EventCard
            title={'Check-in'}
            type={'activity'}
            time={'9:00 - 12:00'}
            location={'TBD - FEUP'}
            speakers={[]}
          />
          <EventCard
            title={'Feira de Emprego'}
            type={'activity'}
            time={'9:00 - 14:00'}
            location={'Corredor B - FEUP'}
            speakers={[]}
          />

          <EventCard
            title={'Competição de Pitches'}
            type={'activity'}
            time={'14:30 - 18:30'}
            location={'TBD - FEUP'}
            speakers={[]}
          />

          <EventCard
            title={'Sessão de Cocktails'}
            type={'activity'}
            time={'18:00 - 19:30'}
            location={'Coffee Lounge - FEUP'}
            speakers={[]}
          />
        </div>
      )}
    </div>
  )
}
