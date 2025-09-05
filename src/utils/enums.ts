// This file contains all the enums required in the app.
export const enum RequestStatus {
  Pending = 10,
  Approved = 20,
  Rejected = 30,
  Deleted = 31,
}

export const enum DutyTypeCategory {
  FlightDuty = "FlightDuty",
  Off = "Off",
  Standby = "Standby",
  OfficeDuty = "OfficeDuty",
  Training = "Training",
  Sick = "Sick",
  Vacation = "Vacation",
  GoldenOff = "GoldenOff",
  Others = "Others",
  Flight="Flight"
}
export const enum MaritalStatusOptions {
  None = "None", // for 0 → No entry in table
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
  Widowed = "Widowed",
  DeFactoSpouse = "De Facto Spouse",
}

// Map backend numeric values → enum string
export const marStatusMap: Record<number, MaritalStatusOptions> = {
  0: MaritalStatusOptions.None,
  1: MaritalStatusOptions.Single,
  2: MaritalStatusOptions.Married,
  3: MaritalStatusOptions.Divorced,
  4: MaritalStatusOptions.Widowed,
  5: MaritalStatusOptions.DeFactoSpouse,
};
