export const InterFormsServiceStub = {
  availableDataSources: [{code: 208, description: 'CMS '}],
  startSpinner: () => {
  },
  stopSpinner: () => {
  }
};
export const AdministratorServiceStub = {
  loadUser: () => {
  }
};
export const AuthenticationServiceStub = {
  currentUser: {skills: [], dataSurce: {code: 208, description: 'CMS '}},
  isLoggedIn: true,
  authenticated: () => {
    return true;
  }
};
export const AlertServiceStub = {
  addAlert: () => {
  }
};
