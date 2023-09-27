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

const screens: any = [
  ReportSideCarInfo,
  ReportSideAccidentInfo,
  ReportSideCarPictures,
  ReportSideNotes,
];

export default function ReportSides({ route }: any) {
  const { cars } = route.params as { cars: number };

  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [carsMap, setCarMap] = useState({});

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        <Stepper active={activeCarIndex} numberOfSteps={cars} />
        <BreadcrumbStepper steps={steps} active={activeStepIndex} />
        <ScreenSlideNavigator
          screens={screens}
          state={carsMap}
          currentActive={activeCarIndex}
          updateState={setCarMap}
          currentActiveIndex={activeStepIndex}
          moveNext={() => {
            if (activeStepIndex < steps.length - 1) {
              setActiveStepIndex(activeStepIndex + 1);
            } else {
              setActiveStepIndex(0);
              setActiveCarIndex(activeCarIndex + 1);
            }
          }}
        />
      </View>
    </>
  );
}
