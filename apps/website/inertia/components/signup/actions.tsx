import { Button } from "@enei/shadcn/ui/button";
import { useStepper } from "@enei/shadcn/ui/preview/stepper";

function StepperFormActions() {
  const { prevStep, resetSteps, isDisabledStep, hasCompletedAllSteps, isLastStep, isOptionalStep } =
    useStepper();

  return (
    <div className="flex w-full justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          {!isDisabledStep && (
            <Button disabled={isDisabledStep} onClick={prevStep} size="sm" variant="secondary">
              Anterior
            </Button>
          )}
          <Button type="submit" size="sm">
            {isLastStep
              ? "Registar-me na 16ª edição do ENEI"
              : isOptionalStep
                ? "Passar"
                : "Próximo"}
          </Button>
        </>
      )}
    </div>
  );
}

export default StepperFormActions;
