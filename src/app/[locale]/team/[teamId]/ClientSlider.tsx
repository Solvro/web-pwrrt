"use client";

import Slider from "@/components/section/BolidSection/Slider";

interface ParametersClientSlider {
  teamId: string;
  showRt15e?: boolean;
}
const ClientSlider: React.FC<ParametersClientSlider> = ({
  teamId,
  showRt15e,
}) => {
  return <Slider showRt15e currentBolid={teamId} darkMode></Slider>;
};

export default ClientSlider;
