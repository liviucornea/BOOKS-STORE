import {IUser} from '../domain/IUser';


export class UserDTO implements IUser {
  UserID: number;
  EMail: string;
  UserDomain: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  RoleID: string;
  IsActive: boolean;
  LastLoggedInDate: string;
  LastUpdated: string;
  LastUpdatedBy: string;
  RoleName: string;
  hasAccessToReports: boolean;
  doEdit: boolean;
  BusinessLines?: Array<any>;
  message?: string;

  isLoggedIn = false;
  isActive = true;
  isNew = false;
  IsGuest: boolean;
  GuestApprovalID: number;
  GuestFormID: number;



  constructor(userId: number) {
    this.UserID = userId;
    this.doEdit = false;
    this.isLoggedIn = false;
    this.doEdit = false;
    this.isNew = false;
    this.BusinessLines = [];
  }

}
