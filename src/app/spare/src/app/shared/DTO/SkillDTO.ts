import {Skill} from '../domain/Skill';

export class SkillDTO implements Skill {
  code: string;
  description: string;
  isSelected: boolean;
  levels?: string [];
  level?: string;
  managerId?: string;

  constructor() {
  }

}
