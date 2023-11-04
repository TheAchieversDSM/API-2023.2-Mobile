export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      SignUp: undefined;
      Home: undefined;
      CreateTask: undefined;
      UpdateHistoric: undefined;
      ToDo: undefined;
      Tabs: {
        screen: 'Home' | 'ToDo' | 'CreateTask' | 'Dashboard';
      };
    }
  }
}
