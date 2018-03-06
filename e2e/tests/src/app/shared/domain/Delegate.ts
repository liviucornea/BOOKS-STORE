export interface Delegate {
  AccessDelegationID: number;
  FromUserID: number;
  ToUserID: number;
  ToUserFirstName?: string;
  ToUserLastName?: string;
  ToUserEmail?: string;
  DateDelegated: string;

}
