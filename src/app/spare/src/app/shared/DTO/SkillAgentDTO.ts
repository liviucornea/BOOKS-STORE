import {SkillDTO} from './SkillDTO';

export class SkillAgentDTO extends SkillDTO {
  level?: string ;
  nonEditable?: boolean;
  agentId?: string;
  reportStatus?: string; // can be changed, added , deleted

  constructor() {
    super();
    this.nonEditable = true;
    this.level = '1';
  }

}
