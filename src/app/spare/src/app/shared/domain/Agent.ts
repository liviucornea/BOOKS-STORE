import {Skill} from './Skill';

export interface Agent {
  cmsLoginId: string;
  adLoginId: string;
  firstName: string;
  lastName: string;
  userLoginId?: string;
  dataSourceId?: string;
  skills?: Skill[];
}
