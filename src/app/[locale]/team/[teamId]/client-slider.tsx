"use client";

import { Slider } from "@/components/section/BolidSection/slider";

interface ParametersClientSlider {
  teamId: string;
  showRt15e?: boolean;
}
export function ClientSlider({ teamId, showRt15e }: ParametersClientSlider) {
  return <Slider showRt15e={showRt15e} currentBolid={teamId} darkMode></Slider>;
}
