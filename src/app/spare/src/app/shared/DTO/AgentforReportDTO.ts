import {Agent} from '../domain/Agent';
import {UserDTO} from './UserDTO';
import {SkillAgentForReportDTO} from './SkillAgentForReportDTO';

export  class AgentForReportDTO implements Agent {
  id: string;
  cmsLoginId: string;
  adLoginId: string;
  firstName: string;
  lastName: string;
  userLoginId?: string;
  dataSourceId?: string;
  skills: SkillAgentForReportDTO [];
  changedBy?: UserDTO;
  changedDate: string;
  constructor(cmsLoginId, firstName, lastName, changedDate ) {
    this.firstName = firstName;
    this.cmsLoginId = cmsLoginId;
    this.lastName = lastName;
    this.changedDate = changedDate;
  }
}
