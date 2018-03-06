export interface IUser {
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

}

/*
roles may be:
RMs /Leadership , delegate etc....
 */
