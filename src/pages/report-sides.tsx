import BreadcrumbStepper from "home/components/breadcrumb-stepper";
import Stepper from "home/components/stepper";
import t from "home/utils/i18n";
import { View } from "react-native";
import ScreenSlideNavigator from "home/components/screen-slide-navigator";
import ReportSideCarInfo from "./report-side-car-info";
const steps = [t("carInfo"), t("accidentInfo"), t("carPictures"), t("notes")];

const screens = [ReportSideCarInfo];
export default function ReportSides() {
  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <Stepper active={0} numberOfSteps={3} />
        <BreadcrumbStepper steps={steps} active={0} />
        <ScreenSlideNavigator screens={screens} />
      </View>
    </>
  );
}
