import { GENERAL_SURGERY } from './generalSurgeryData';
import { DERMATOLOGY } from './dermatologyData';
import { ORTHOPEDICS } from './orthopedicsData';
import { ENT } from './entData';
import { OPHTHALMOLOGY } from './ophthalmologyData';
import { CARDIOLOGY } from './cardiologyData';
import { GASTROENTEROLOGY } from './gastroData';
import { UROLOGY } from './urologyData';

export const ALL_PROCEDURES = [
  ...GENERAL_SURGERY,
  ...DERMATOLOGY,
  ...ORTHOPEDICS,
  ...ENT,
  ...OPHTHALMOLOGY,
  ...CARDIOLOGY,
  ...GASTROENTEROLOGY,
  ...UROLOGY,
];

export type Procedure = {
  id: string;
  name: string;
  specialty: string;
  duration: string;
  hospital: string;
  complexity: string;
  anesthesia: string;
};
