import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { ThemeProvider } from "styled-components";
import { appTheme } from "./components/theme/app-theme";
import { GlobalStyles } from "./components/theme/global-styles";
import { RoutesComponent } from "./components/routes/routes";

Amplify.configure(awsconfig);

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <GlobalStyles />
      <RoutesComponent />
    </ThemeProvider>
  );
}

export default App;
