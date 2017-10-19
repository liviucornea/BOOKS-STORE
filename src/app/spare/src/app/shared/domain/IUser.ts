import {Skill} from './Skill';

export interface  IUser {
  adLoginId: string;
 // skillSynkLoginId: string;
  firstName: string;
  lastName: string;
  isAdministrator: boolean;
  hasAccessToReports: boolean;
  doEdit: boolean;
  skills: Skill [];

}
