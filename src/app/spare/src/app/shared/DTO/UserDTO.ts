import {IUser} from '../domain/IUser';
import {SkillDTO} from './SkillDTO';


export class UserDTO implements IUser {
  adLoginId: string;
  skillSynkLoginId: string;
  firstName: string;
  lastName: string;
  dataSource: string;
  isAdministrator: boolean;
  hasAccessToReports: boolean;
  skills: SkillDTO [];
  message?: string;
  doEdit = false;
  isLoggedIn = false;
  isActive = true;
  isNew = false;
  selectForMassUpdate =  false;
  constructor(adLoginId: string) {
    this.adLoginId = adLoginId;
    this.skills = [];
    this.doEdit = false;
    this.isLoggedIn = false;
    this.doEdit = false;
    this.isNew = false;
    this.selectForMassUpdate = false;
  };

}
