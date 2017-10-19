import {SkillsLevels} from '../configuration/appSettings';

export const AssignedToUsersSkillsListMock = [{
  'code': '1',
  'description': 'MUTAL FUNDS ENG-TOR',
  'levels': SkillsLevels,
  'isSelected': true
},
  {
    'code': '8',
    'description': 'COM CARDS ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': true
  }
  , {
    'code': '9',
    'description': 'COM CARDS FRE-TOR',
    'levels': SkillsLevels,
    'isSelected': true
  },
  {
    'code': '792',
    'description': 'VISA DISPUTES ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': true
  }, {
    'code': '56',
    'description': 'SALES GIC RENEWAL FEE',
    'levels': SkillsLevels,
    'isSelected': true
  },
  {
    'code': '910',
    'description': 'MANAGER LINE FRE TOR',
    'levels': SkillsLevels,
    'isSelected': true
  },
  {
    'code': '916',
    'description': 'PRM OUTBOUND NEG TOR',
    'levels': SkillsLevels,
    'isSelected': true
  }];

export const UserListMock = [{
  'skillSynkLoginId': '990',
  'adLoginId': 'EBSS\\LCornea',
  'firstName': 'Liviu',
  'lastName': 'Cornea',
  'isAdministrator': true,
  'hasAccessToReports': true,
  'dataSource': '1',
  'skills': AssignedToUsersSkillsListMock
},
  {
    'skillSynkLoginId': '990',
    'adLoginId': 'BATCH',
    'dataSource': '1',
    'skills': AssignedToUsersSkillsListMock
  }
  ,

  {
    'skillSynkLoginId': '100',
    'adLoginId': 'EBSS\\s4546512',
    'firstName': 'Dmitri',
    'lastName': 'Kondramachine',
    'isAdministrator': true,
    'hasAccessToReports': false,
    'dataSource': '1',
    'skills': AssignedToUsersSkillsListMock
  },
  {
    'skillSynkLoginId': '102',
    'adLoginId': 'EBSS\\s4546513',
    'firstName': 'Jessica',
    'lastName': 'Smith',
    'isAdministrator': true,
    'hasAccessToReports': false,
    'dataSource': '1',
    'skills': AssignedToUsersSkillsListMock
  },
  {
    'skillSynkLoginId': '103',
    'adLoginId': 'EBSS\\s4546514',
    'firstName': 'Andrew',
    'lastName': 'Noah',
    'isAdministrator': true,
    'hasAccessToReports': true,
    'dataSource': '1',
    'skills': []
  },
  {
    'skillSynkLoginId': '105',
    'adLoginId': 'EBSS\\s4546515',
    'firstName': 'Samantha',
    'lastName': 'Fox',
    'isAdministrator': false,
    'hasAccessToReports': true,
    'dataSource': '1',
    'skills': []
  }];


export const AssignedToAgentsBeforeSkillsListMock = [{
  'code': '1',
  'description': 'MUTAL FUNDS ENG-TOR',
  'levels': SkillsLevels,
  'level': '1',
  'isSelected': true
},
  {
    'code': '8',
    'description': 'COM CARDS ENG-TOR',
    'levels': SkillsLevels,
    'level': '1',
    'isSelected': true
  },
  {
    'code': '9',
    'description': 'COM CARDS FRE-TOR',
    'levels': SkillsLevels,
    'level': 'R1',
    'isSelected': true
  },
  {
    'code': '4',
    'description': 'COM CARDS FRE-TOR',
    'levels': SkillsLevels,
    'level': 'R1',
    'isSelected': true
  },
  {
    'code': '792',
    'description': 'VISA DISPUTES ENG-TOR',
    'levels': SkillsLevels,
    'level': '12',
    'isSelected': true
  },
  {
    'code': '555',
    'description': 'None removable skill: for testing( agent specific)',
    'levels': SkillsLevels,
    'level': '2',
    'isSelected': true
  },
  {
    'code': '444',
    'description': 'Test Skill, this was removed!!!!',
    'levels': SkillsLevels,
    'level': '2',
    'isSelected': true
  }];

export const AssignedToAgentsSkillsListMock = [{
  'code': '1',
  'description': 'MUTAL FUNDS ENG-TOR',
  'levels': SkillsLevels,
  'fromLevel': '2',
  'toLevel': 'R2',
  'isSelected': true
},
  {
    'code': '8',
    'description': 'COM CARDS ENG-TOR',
    'levels': SkillsLevels,
    'toLevel': '5',
    'isSelected': true
  },
  {
    'code': '4',
    'description': 'COM CARDS FRE-TOR',
    'levels': SkillsLevels,
    'fromLevel': '2',
    'isSelected': true
  }
  , {
    'code': '9',
    'description': 'COM CARDS FRE-TOR',
    'levels': SkillsLevels,
    'fromLevel': '2',
    'toLevel': 'R2',
    'isSelected': true
  },
  {
    'code': '792',
    'description': 'VISA DISPUTES ENG-TOR',
    'levels': SkillsLevels,
    'fromLevel': '2',
    'toLevel': 'R2',
    'isSelected': true
  }, {
    'code': '56',
    'description': 'SALES GIC RENEWAL FEE',
    'levels': SkillsLevels,
    'formLevel': '8',
    'toLevel': 'R2',
    'isSelected': true
  },
  {
    'code': '910',
    'description': 'MANAGER LINE FRE TOR',
    'levels': SkillsLevels,
    'fromLevel': '2',
    'toLevel': 'R2',
    'isSelected': true
  },
  {
    'code': '916',
    'description': 'PRM OUTBOUND NEG TOR',
    'fromLevel': '1',
    'toLevel': '10',
    'levels': SkillsLevels,
    'isSelected': true
  }];

export const SeparateSkills = [{
  'code': '888',
  'description': 'Skill One for speacial agents',
  'fromLevel': '1',
  'toLevel': '10',
  'levels': SkillsLevels,
  'isSelected': true
}]

export const AgentsChangeLogListMock = [{
  'cmsLoginId': '134',
  'firstName': 'Paul',
  'lastName': 'Connor',
  'isSelected': false,
  'skills': AssignedToAgentsSkillsListMock,
  'changedBy': UserListMock[0],
  'changedDate': '2017-07-10T14:48:00'
},
  {
    'cmsLoginId': '234',
    'firstName': 'Jon',
    'lastName': 'Travolta',
    'isSelected': false,
    'skills': AssignedToAgentsSkillsListMock,
    'changedBy': UserListMock[1],
    'changedDate': '2017-07-11T00:48:00'
  },
  {
    'cmsLoginId': '334',
    'firstName': 'The third',
    'lastName': 'Agent',
    'isSelected': false,
    'skills': AssignedToAgentsSkillsListMock,
    'changedBy': UserListMock[0],
    'changedDate': '2017-07-01T23:48:00'
  },
  {
    'cmsLoginId': '30034',
    'firstName': 'Jhon',
    'lastName': 'Smith',
    'isSelected': false,
    'skills': AssignedToAgentsSkillsListMock,
    'changedBy': UserListMock[0],
    'changedDate': '2017-07-14T18:48:00'
  },
  {
    'cmsLoginId': '4444',
    'firstName': 'Agent',
    'lastName': 'With different Skills',
    'isSelected': false,
    'skills': SeparateSkills,
    'changedBy': UserListMock[0],
    'changedDate': '2017-07-14T18:48:00'
  }

];

export const AgentsListMock = [{
  'id': '134',
  'firstName': 'Paul',
  'lastName': 'Connor',
  'isSelected': false,
  'skills': AssignedToAgentsSkillsListMock
},
  {
    'id': '234',
    'firstName': 'Jon',
    'lastName': 'Travolta',
    'isSelected': false,
    'skills': AssignedToAgentsSkillsListMock
  },
  {
    'id': '334',
    'firstName': 'The third',
    'lastName': 'Agent',
    'isSelected': false,
    'skills': AssignedToAgentsSkillsListMock
  }
];
export const AllSkillsListMock = [{
  'code': '1',
  'description': 'MUTAL FUNDS ENG-TOR',
  'levels': SkillsLevels,
  'isSelected': false
},
  {
    'code': '8',
    'description': 'COM CARDS ENG-TOR',
    'isSelected': false
  }
  , {
    'code': '9',
    'description': 'COM CARDS FRE-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '792',
    'description': 'VISA DISPUTES ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '835',
    'description': 'SMS BUSINESS SALES ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  }
  , {
    'code': '837',
    'description': 'SSI FRE-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '872',
    'description': 'ITR ESCALATION ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },

  {
    'code': '235',
    'description': 'AMEX GOLD INSURANCE ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '33',
    'description': 'CSC ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '31',
    'description': 'ADI ENG-TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '34',
    'description': 'INVEST SALES ENG TOR',
    'levels': SkillsLevels,
    'isSelected': false
  }, {
    'code': '44',
    'description': 'BRU ENG TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '45',
    'description': 'GENERAL SALES TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '54',
    'description': 'SALES RETENTION TOR',
    'levels': SkillsLevels,
    'isSelected': false
  }, {
    'code': '56',
    'description': 'SALES GIC RENEWAL FEE',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '910',
    'description': 'MANAGER LINE FRE TOR',
    'levels': SkillsLevels,
    'isSelected': false
  },
  {
    'code': '916',
    'description': 'PRM OUTBOUND NEG TOR',
    'levels': SkillsLevels,
    'isSelected': false
  }
];

export const usersMock = [{
  'adLoginId': 'ebss/lcornea',
  'skillSynkLoginId': '100',
  'firstName': 'Liviu',
  'lastName': 'Cornea',
  'dataSource': '1',
  'isAdministrator': true,
  'hasAccessToReports': true,
},
  {
    'adLoginId': 'BATCH',
  }, {
    'adLoginId': 'EBSS\\s4546512',
    'skillSynkLoginId': '101',
    'firstName': 'Admin',
    'lastName': 'User',
    'dataSource': '1',
    'isAdministrator': true,
    'hasAccessToReports': true,
  },
  {
    'adLoginId': '102',
    'skillSynkLoginId': '102',
    'firstName': 'Reports',
    'lastName': 'Admin lNAme',
    'dataSource': '1',
    'isAdministrator': false,
    'hasAccessToReports': true,
  }

]
export const ADUserInfoMock = {'loginId': 'EBSS\\s4546512', 'errMessage': null}
export const ReportLog = {
  'dateFrom': '2017-07-30 10:03:39.123',
  'dateTo': '2017-08-31 10:03:39.123',
  'reportLog': [
    {
      'agent': {
        'cmsLoginId': '60001',
        'firstName': 'Nancy',
        'lastName': 'Noonan'
      },
      'changedBy': {
        'adLoginId': 'ebss\\lcornea',
        'firstName': 'Liviu',
        'lastName': 'Cornea'
      },
      'changedDate': '2017-08-30 10:03:39.123',
      'skills': [{
        'code': '025-0001',
        'description': 'D2D Eng Skill',
        'fromLevel': '',
        'toLevel': '9',
        'dateFrom': '2017-08-30 10:03:39.123',
        'dateTo': '2017-08-31 00:00:00.000',
      }, {
        'code': '026-0001',
        'description': 'D45 Eng Skill',
        'fromLevel': '3',
        'toLevel': '9',
        'dateFrom': '2017-08-30 10:03:39.123',
        'dateTo': '2017-08-31 00:00:00.000',
      }, {
        'code': '0775-0001',
        'description': 'Test Skill',
        'fromLevel': '',
        'toLevel': '9',
        'dateFrom': '2017-08-30 10:03:39.123',
        'dateTo': '2017-08-31 00:00:00.000',
      }],
    },
    {
      'agent': {
        'cmsLoginId': '60001',
        'firstName': 'Nancy',
        'lastName': 'Noonan'
      },
      'changedDate': '2017-08-31 11:03:39.123',
      'changedBy': {
        'adLoginId': 'ebss\\lcornea',
        'firstName': 'Liviu',
        'lastName': 'Cornea'
      },
      'skills': [{
        'dateFrom': '2017-08-30 10:03:39.123',
        'dateTo': '2017-08-31 00:00:00.000',
        'code': '025-0002',
        'description': 'D2D French Skill testing',
        'fromLevel': '',
        'toLevel': '9'
      }]
    },
    {
      'agent': {
        'cmsLoginId': '60002',
        'firstName': 'John',
        'lastName': 'White'
      },
      'changedBy': {
        'adLoginId': 'ebss\\lcornea',
        'firstName': 'Liviu',
        'lastName': 'Cornea'
      },
      'changedDate': '2017-08-30 10:03:39.123',
      'skills': [{
        'dateFrom': '2017-08-20 10:03:39.123',
        'dateTo': '2017-08-21 00:00:00.000',
        'code': '025-0002',
        'description': 'RC Eng',
        'fromLevel': '9',
        'toLevel': '10'
      },{
        'dateFrom': '2017-08-20 10:03:39.123',
        'dateTo': '2017-08-21 00:00:00.000',
        'code': '025-0030',
        'description': 'IVR BRU Test',
        'fromLevel': '9',
        'toLevel': ''
      }
      ]
    },
  ],
  'statusCode': 'SKS000',
  'message': null
}

