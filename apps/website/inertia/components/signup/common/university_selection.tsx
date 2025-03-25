import { useMemo } from "react";
import { getUniversityById } from "~/lib/enei/signup/universities";

export default function UniversitySelection({ value }: { value?: string }) {
  const name = useMemo(() => value && getUniversityById(value)?.name, [value]);

  return name ? (
    <span className="max-w-full overflow-hidden overflow-ellipsis">{name}</span>
  ) : (
    <span>Selecionar Universidade...</span>
  );
}
