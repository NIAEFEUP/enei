import { Button } from "../ui/button"
import { useStepper } from "../ui/stepper"

function StepperFormActions() {
    const {
        prevStep,
        resetSteps,
        isDisabledStep,
        hasCompletedAllSteps,
        isLastStep,
        isOptionalStep,
    } = useStepper()

    return (
        <div className="w-full flex justify-end gap-2">
            {hasCompletedAllSteps ? (
                <Button size="sm" onClick={resetSteps}>
                    Reset
                </Button>
            ) : (
                <>
                    {!isDisabledStep &&
                        <Button
                            disabled={isDisabledStep}
                            onClick={prevStep}
                            size="sm"
                            variant="secondary"
                        >
                            Anterior
                        </Button>
                    }
                    <Button size="sm">
                        {isLastStep ? "Registar-me na 16ªedição do ENEI" : isOptionalStep ? "Passar" : "Próximo"}
                    </Button>
                </>
            )}
        </div>
    )
}

export default StepperFormActions;