import {Approver} from './Approver';
import {FileAttachment} from './FileAttachment';

export interface Appointment {
  VPAppointmentFormID: number;
  JobTitle: string;
  JobLevel: string;
  CreatedByUserID: number;
  BusinessLineID: string;
  TransitNumber: string;
  City: string;
  Country: string;
  NumOfDirectReports: number;

  ReportingToNewManagerName: string;
  ReportingToNewMangerTitle: string;
  ReportingToBusinessLine: string;
  ReportingToDivision: string;

  SecondaryToNewManagerName: string;
  SecondaryToNewMangerTitle: string;
  SecondaryToBusinessLine: string;
  SecondaryToDivision: string;


  JobIs: string;
  NameCurrentIncumbent: string;
  HCCApproval: string;
  ImpactToVPPComplement: string;
  Comments: string;
  HasJobBeenEvaluated: boolean;
  ApprovalDate: string;
  TrueOpportunity: boolean;
  ReplacementReason: string;
  ReorganizationDetail: string;
  ConfirmJobPosted: boolean;
  ReasonForNotPosting: string;
  LeadershipPreApproval: string;
  SCTPreApproval: string;
  PresidentCEOCHRLPreApproval: string;

  NumberOfInternalApplicantsMale: number;
  NumberOfInternalApplicantsFemale: number;
  NumberOfInternalInterviewsMale: number;
  NumberOfInternalInterviewsFemale: number;
  NumberOfExternalApplicantsMale: number;
  NumberOfExternalApplicantsFemale: number;
  NumberOfExternalInterviewsMale: number;
  NumberOfExternalInterviewsFemale: number;
  CriticalJobRequirements: string;

  InterviewMethodAndInterviewers: string;

  TopCandidate1: string;
  TopCandidate2: string;
  TopCandidate3: string;

  IfNoFemaleCandidatesExplain: string;

  CandidateFirstName: string;
  CandidateLastName: string;
  CandidateGender: string;
  CandidateCurrentTitle: string;
  CandidateCurrentBusinessLine: string;
  CandidateCurrentManagerNameTitle: string;
  CandidateCurrentJobLevel: string;
  CandidateTalentFlag: string;
  CandidateFirstTimeVP: string;
  CandidateLRPSuccessor: string;

  BaseSalaryIncreaseAmount: number;
  BaseSalaryIncreasePercent: number;
  BaseSalaryNewSalary: number;
  BaseSalaryApprovalDate: string;
  BaseSalarySalaryTermSheetAttached: boolean;
  AnnouncementDate: string;
  AnnouncementEffectiveDate: string;
  Approvals: Array<Approver>;
  ApproversZoneA: Array<Approver>;
  ApproversZoneB: Array<Approver>;

  // new fields
  AppointmentStatus: string;
  CreateDate: string;
  GeneralComments: string;
  DirectOrIndirectReporting: string;
  Files?: Array<FileAttachment>;

  // fields used for listing only ;
  apApproveVPSvpHrDte: string;
  apApproveSCTDte: string;
  apApproveLeadershipDte: string;
  apApproveCEODte: string;
  apCandidateHrRmDte: string;
  apCandidateLeadershipDte: string;
//  apCandidateGroupHeadDte: string;
  toBeDeleted: boolean;
  expandAppApprovals: boolean;
  expandCandidateApproval: boolean;
  creatorName: string;
  isChanged: boolean;
  // bellow property can be : CREATOR, APPROVAL, DELEGATE , LEADERSHIP etc
  relationToForm: string;

}
