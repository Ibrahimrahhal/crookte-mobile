import BreadcrumbStepper from "home/components/breadcrumb-stepper";
import Stepper from "home/components/stepper";
import t from "home/utils/i18n";
import { View } from "react-native";
import ScreenSlideNavigator from "home/components/screen-slide-navigator";
import ReportSideCarInfo from "home/pages/report-side-car-info";
import ReportSideAccidentInfo from "home/pages/report-side-accident-info";
import { useState } from "react";
import ReportSideCarPictures from "home/pages/report-side-car-pictures";
import ReportSideNotes from "home/pages/report-side-notes";

const steps = [t("carInfo"), t("accidentInfo"), t("carPictures"), t("notes")];

const screens = [
  ReportSideCarInfo,
  ReportSideAccidentInfo,
  ReportSideCarPictures,
  ReportSideNotes,
];

export default function ReportSides() {
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <Stepper active={activeCarIndex} numberOfSteps={3} />
        <BreadcrumbStepper steps={steps} active={activeStepIndex} />
        <ScreenSlideNavigator
          screens={screens}
          moveNext={() => {
            setActiveStepIndex(activeStepIndex + 1);
          }}
        />
      </View>
    </>
  );
}
