export const FileAttachmentsMockData = [{
  FormID: '1',
FileID: '1',
FileName: 'Testing.txt',
  type: 'excel'
}
];
const ApproversMock = [
  {
    UserID: 10,
    FormID: 100,
    PositionIdentifier: 1,
    Order: 1,
    FormPartIdentifier: 'A',
    Approved: false,
    ApprovedDate: '2017-12-14',
    CommentForReturn: ''
  },
  {
    UserID: 20,
    FormID: 100,
    PositionIdentifier: 2,
    Order: 1,
    FormPartIdentifier: 'A',
    Approved: false,
    ApprovedDate: '2017-12-14',
    CommentForReturn: ''
  },
  {
    UserID: 22,
    FormID: 100,
    PositionIdentifier: 3,
    Order: 1,
    FormPartIdentifier: 'A',
    Approved: false,
    ApprovedDate: '2017-12-14',
    CommentForReturn: ''
  },
  {
    UserID: 30,
    FormID: 100,
    PositionIdentifier: 1,
    Order: 1,
    FormPartIdentifier: 'B',
    Approved: false,
    ApprovedDate: '2017-12-14',
    CommentForReturn: ''
  },
  {
    UserID: 40,
    FormID: 100,
    PositionIdentifier: 2,
    Order: 1,
    FormPartIdentifier: 'B',
    Approved: false,
    ApprovedDate: '2017-12-14',
    CommentForReturn: ''
  },
  {
    UserID: 41,
    FormID: 100,
    PositionIdentifier: 3,
    Order: 1,
    FormPartIdentifier: 'B',
    Approved: false,
    ApprovedDate: '2017-12-14',
    CommentForReturn: ''
  }
];

export const AppointmentsList = [
  {
    VPAppointmentFormID: 100,
    JobTitle: 'Branch Manager',
    JobLevel: '01',
    BusinessLine: 1,
    ReportingToBusinessLine: '01',
    SecondaryToBusinessLine: '01',
    CandidateCurrentBusinessLine: '01',
    TransitNumber: 234,
    NumOfDirectReports: 10,
    CandidateFirstName: 'Joe',
    CandidateLastName: 'Test',
    City: 'Toronto',
    JobIs: '01',
    ImpactToVPPComplement: 'Increase',
    HCCApproval: '2015-12-14',
    Approvals: ApproversMock,
    HasJobBeenEvaluated: true,
    TrueOpportunity: true,
    AppointmentStatus: 'Pending Candidate Approval',
    CreateDate: '2014-10-14'
  },
  {
    VPAppointmentFormID: 105,
    JobTitle: 'IT Manager',
    JobLevel: '02',
    BusinessLine: 2,
    ReportingToBusinessLine: '01',
    SecondaryToBusinessLine: '01',
    CandidateCurrentBusinessLine: '01',
    HCCApproval: '06/01/1998 00:00:00',
    TransitNumber: 234,
    NumOfDirectReports: 10,
    CandidateFirstName: 'Jimmy',
    CandidateLastName: 'Hendrix',
    City: 'London',
    ImpactToVPPComplement: 'Increase',
    JobIs: '03',
    Approvals: ApproversMock,
    HasJobBeenEvaluated: false,
    AppointmentStatus: 'Complete',
    CreateDate: '2017-02-14'
  },
  {
    VPAppointmentFormID: 140,
    JobTitle: 'Department Manager',
    JobLevel: '01',
    BusinessLine: 3,
    ReportingToBusinessLine: '01',
    SecondaryToBusinessLine: '01',
    CandidateCurrentBusinessLine: '01',
    HCCApproval: '06/01/1998 00:00:00',
    TransitNumber: 234,
    NumOfDirectReports: 10,
    CandidateFirstName: 'Anna',
    CandidateLastName: 'Ivanovich',
    City: 'London',
    JobIs: '02',
    ImpactToVPPComplement: 'Increase',
    Approvals: ApproversMock,
    HasJobBeenEvaluated: true,
    AppointmentStatus: 'Job Approved',
    CreateDate: '2017-10-30'
  },
  {
    VPAppointmentFormID: 230,
    JobTitle: 'Branch Manager',
    JobLevel: '01',
    BusinessLine: 1,
    ReportingToBusinessLine: '01',
    SecondaryToBusinessLine: '01',
    CandidateCurrentBusinessLine: '01',
    HCCApproval: '06/01/1998',
    TransitNumber: 234,
    NumOfDirectReports: 10,
    CandidateFirstName: 'John',
    CandidateLastName: 'Test',
    City: 'London',
    JobIs: '02',
    ImpactToVPPComplement: 'Increase',
    Approvals: ApproversMock,
    HasJobBeenEvaluated: true,
    AppointmentStatus: 'Pending Job Approval',
    CreateDate: '2015-12-14'
  },
]

export const BusinessLinesMock = [
  {
    code: 1,
    description: 'Canadian Banking'
  },
  {
    code: 2,
    description: 'Canadian International Banking'
  },
  {
    code: 3,
    description: 'Canadian Audit'
  }
]

export const UsersListMock = [
  {
    adLoginId: 's1717658',
    firstName: 'Liviu',
    lastName: 'Cornea',
    role: 'RM',
    hasAccessToReports: true,
    email: 'liviu.cornea@scotia.com'
  },
  {
    adLoginId: 's1227658',
    firstName: 'Jhon',
    lastName: 'Smith',
    role: 'Leadership',
    hasAccessToReports: true,
    email: 'jhon.smith@scotia.com'
  },
  {
    adLoginId: 's122748',
    firstName: 'Jessica',
    lastName: 'Smith',
    role: 'Leadership',
    hasAccessToReports: true,
    email: 'jessica.smith@scotia.com'
  }
]


/*
create table VPAppointmentForm
(
       VPAppointmentFormID int not null identity(1,1) PRIMARY KEY,
       JobTitle nvarchar(256),
       JobLevel nvarchar(256),
       BusinessLine nvarchar(256), -------------?
       TransitNumber nvarchar(256),
       CityCountry nvarchar(256),
       NumOfDirectReports int,


       ReportingToNewManagerName nvarchar(256),
       ReportingToNewMangerTitle nvarchar(256),
       ReportingToBusinessLine nvarchar(256), -------------?
       ReportingToDivision nvarchar(256),

       SecondaryToNewManagerName nvarchar(256),
       SecondaryToNewMangerTitle nvarchar(256),
       SecondaryToBusinessLine nvarchar(256), -------------?
       SecondaryToDivision nvarchar(256),


       JobIs nvarchar(256),
       NameCurrentIncumbent nvarchar(256),
       HCCApproval datetime,
       ImpactToVPPComplement nvarchar(256),
       Comments nvarchar(max),
       HasJobBeenEvaluated bit,
       ApprovalDate datetime,
       TrueOpportunity bit,
       ReplacementReason nvarchar(max),
       ReorganizationDetail nvarchar(512),
       ConfirmJobPosted bit,
       ReasonForNotPosting nvarchar(512),
       LeadershipPreApproval nvarchar(256),
       SCTPreApproval nvarchar(256),
       PresidentCEOCHRLPreApproval nvarchar(256),

       NumberOfInternalApplicantsMale int,
       NumberOfInternalApplicantsFemale int,
       NumberOfInternalInterviewsMale int,
       NumberOfInternalInterviewsFemale int,
       NumberOfExternalApplicantsMale int,
       NumberOfExternalApplicantsFemale int,
       NumberOfExternalInterviewsMale int,
       NumberOfExternalInterviewsFemale int,
       CriticalJobRequirements nvarchar(512),

       InterviewMethodAndInterviewers nvarchar(max),

       TopCandidate1 nvarchar(512),
       TopCandidate2 nvarchar(512),
       TopCandidate3 nvarchar(512),

       IfNoFemaleCandidatesExplain nvarchar(512),

       CandidateFirstAndLast nvarchar(256),
       CandidateGender nvarchar(256),
       CandidateCurrentTitle nvarchar(256),
       CandidateCurrentBusinessLine nvarchar(256), -------------?
       CandidateCurrentManagerNameTitle nvarchar(256),
       CandidateCurrentJobLevel nvarchar(256),
       CandidateTalentFlag nvarchar(256),
       CandidateFirstTimeVP nvarchar(256),
       CandidateLRPSuccessor nvarchar(256),

       BaseSalaryIncreaseAmount decimal(18,2),
       BaseSalaryIncreasePercent decimal(18,2),
       BaseSalaryNewSalary decimal(18,2),
       BaseSalaryApprovalDate datetime,
       BaseSalarySalaryTermSheetAttached bit,
       AnnouncementDate datetime,
       AnnouncementEffectiveDate datetime
)


 */
