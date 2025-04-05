import { Option } from "~/components/ui/multiple-selector";
import editions from "#data/enei/editions.json" with { type: "json" };

export const ENEI_EDITIONS: Option[] = editions
  .sort((a, b) => b.year - a.year)
  .map(({ year, location }) => {
    return {
      label: location + ", " + year.toString(),
      value: year.toString(),
    };
  });
