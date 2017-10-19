import {environment} from '../../../environments/environment';

/*
export let AppSettings = {
  'apiSettings': {'apiURL_BASE': 'http://10.57.184.41/skillsync'},
  'appDataSources': [{'id': 100, 'description': 'CM1 DC1'}, {'id': 200, 'description': 'CM1 DC2'}]
};
*/
// 'apiSettings': {'apiURL_BASE': ''},
// 'apiSettings': {'apiURL_BASE': 'http://10.60.147.245:81/api'} - QA
// 'apiSettings': {'apiURL_BASE': 'http://10.60.147.245:82/api'} development
export let SkillsLevels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', 'R1', 'R2'];

export let AppSettings = {
  'apiSettings': {'apiURL_BASE': `${environment['apiURL_BASE']}`,
                  'apiChangeLogReports': '/getreportlog',
                  'apiUpdateUser': '/updateUser',
                  'apiCreateUser': '/createUser',
                  'apiDeleteUser': '/deleteUser',
                  'apiGetAllUsers': '/getAllUsers',
                  'apiGetAgent':  '/getAgent',
                  'apiGetAllAgents': '/getAllAgents',
                  'apiUpdateAgent': '/updateAgent'},
  'skillsLevels': SkillsLevels,
  'noSkillsAvailable': 'All available skills are assigned to agent. You can modify their levels or remove them!',
  'reportExcelFileNAme': 'SkillsSynchAgentsReport.xlsx'
};

export let AppNotificationsMSG = {
  'deletionQuestionMsg': 'Do you  really want to delete the record ?',
  'deletionTitle': 'Delete',
  'deletionConfirmationMsg': 'Record successfully deleted !',
  'deactivationConfirmationMsg': 'Deactivation was successful !',
  'saveConfirmedMsg': 'Record successfully saved !',
  'updateConfirmedMsg': 'Record successfully updated !',
  'insertMSG': 'Record successfully created',
  'notificationTitle': 'Notification',
  'largerSearchPeriod': 'Your search period can\'t be greater than 60 days.',
  'errorTitle': 'Error',
  'warningTitle': 'Warning',
  'saveConfirmedMassUpdate': 'Mass updated completed !',
  'maxUpdatesMaxList': 'You can\'t add more than 50 agents to mass update list!',
  'maxUpdatesMaxUsersList': 'You can\'t add more than 20 users to mass update list!',
  'loadingActiveDirectoryInfo': 'Loading Active Directory user\'s profile...',
  'errorLoadingActiveDirectoryInfo': `An error occurred while loading your Active Directory profile.
      Please try again in few seconds by using CTRL + F5! If the problem persists contact the administrator.`
}
