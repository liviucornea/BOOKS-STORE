import {SkillAgentDTO} from './SkillAgentDTO';

export class SkillAgentForReportDTO extends SkillAgentDTO {
  level?: string;
  nonEditable?: boolean;
  agentId?: string;
  reportStatus?: string; // can be changed, added , deleted
  fromLevel?: string;
  toLevel?: string;
  changedBy?: string;
  changedDate?: string;
  agentName?: string;

  constructor() {
    super();
  }

}
