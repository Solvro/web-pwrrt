import type messages from "../../messages/en.json";

type DivisionMessages = (typeof messages)["divisions"];

export type DivisionKey = Exclude<keyof DivisionMessages, "subprojects">;
export type SubprojectKey = keyof DivisionMessages["subprojects"];

export interface Division {
  key: DivisionKey;
  image: string;
  /** CSS object-position of the photo; defaults to "center 20%". */
  imagePosition?: string;
  subprojects: readonly { key: SubprojectKey; name: string }[];
}

/** Team structure: 3 divisions (piony) with 16 subprojects. Names stay in English in every locale. */
export const DIVISIONS: readonly Division[] = [
  {
    key: "mechanical",
    image: "/images/departments/mechanical.png",
    subprojects: [
      { key: "suspensionSteering", name: "Suspension & Steering" },
      { key: "drivetrainBrakes", name: "Drivetrain & Brakes" },
      { key: "powertrain", name: "Powertrain" },
      { key: "cooling", name: "Cooling" },
      { key: "aerodynamics", name: "Aerodynamics" },
      { key: "chassis", name: "Chassis" },
      { key: "vehicleDynamics", name: "Vehicle Dynamics" },
    ],
  },
  {
    key: "electrical",
    image: "/images/departments/electrical.png",
    subprojects: [
      { key: "battery", name: "Battery" },
      { key: "wiringHarness", name: "Wiring Harness" },
      { key: "autonomy", name: "Autonomy" },
      { key: "dataAcquisitionTesting", name: "Data Acquisition & Testing" },
      { key: "electronics", name: "Electronics" },
    ],
  },
  {
    key: "operations",
    image: "/images/departments/operations.jpg",
    // Keep the stage and the team logo on the shirt in a narrow crop.
    imagePosition: "80% 20%",
    subprojects: [
      { key: "marketing", name: "Marketing" },
      { key: "partners", name: "Partners" },
      { key: "bpp", name: "BPP – Business Plan Presentation" },
      { key: "cm", name: "C&M – Cost and Manufacturing" },
    ],
  },
];
