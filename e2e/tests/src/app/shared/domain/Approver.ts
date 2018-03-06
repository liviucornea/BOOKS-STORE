import {IUser} from './IUser';

export interface Approver {
  ApprovalID: number;
  UserID: number;
  FormID: number;
  PositionIdentifier: string;
  Order: number;
  FormPartIdentifier: string;
  Approved: boolean;
  ApprovedDate: string;
  CommentForReturn: string;
  Email: string;
  intendToReturn?: boolean;
  isVisible: boolean;
  approvalsList: Array<IUser>;
}
