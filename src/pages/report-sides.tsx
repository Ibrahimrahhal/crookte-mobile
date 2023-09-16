import BreadcrumbStepper from "home/components/breadcrumb-stepper";
import Stepper from "home/components/stepper";
import t from "home/utils/i18n";

const steps = [t("carInfo"), t("accidentInfo"), t("carPictures"), t("notes")];
export default function ReportSides() {
  return (
    <>
      <Stepper active={0} numberOfSteps={2} />
      <BreadcrumbStepper steps={steps} active={0} />
    </>
  );
}
