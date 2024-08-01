import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { Odds, getSpreadOdds } from "../../../../../lib/api";
import OddsContainer from "@/components/OddsContainer";
import OddsTable from "@/components/OddsTable";
import Spread from "@/components/Spread";

const Page = async ({ params }: { params: Params }) => {
  const { sport } = params;
  const league = sport.replaceAll("_", " ").toUpperCase();
  const odds: Odds[] = (await getSpreadOdds(sport)) ?? [];

  if (!odds.length) {
    return <h2 className="text-3xl text-center">No Odds available!</h2>;
  }

  return (
    <OddsContainer hasOdds={!!odds} league={league}>
      {odds?.map((odd) => {
        return (
          !!odd.bookmakers.length && (
            <div key={odd.id}>
              <OddsTable
                key={odd.id}
                oddsItem={odd}
                away={<Spread id={odd.id} odds={odds} team={odd.away_team} />}
                home={<Spread id={odd.id} odds={odds} team={odd.home_team} />}
              />
            </div>
          )
        );
      })}
    </OddsContainer>
  );
};

export default Page;
