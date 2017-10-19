import {Agent} from '../domain/Agent';
import {SkillAgentDTO} from './SkillAgentDTO';

export class AgentDTO implements Agent {
  cmsLoginId: string;
  adLoginId: string;
  firstName: string;
  lastName: string;
  skills?: SkillAgentDTO[];
  isSelected?: boolean;
  userLoginId?: string;
  dataSourceId?: string;
  doEdit = false;
  selectForMassUpdate =  false;

  constructor(cmsLoginId: string, adLoginId: string, firstName: string,  lastName: string) {
    this.cmsLoginId = cmsLoginId;
    this.adLoginId = adLoginId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isSelected = false;
    this.doEdit = false;
  }
}

