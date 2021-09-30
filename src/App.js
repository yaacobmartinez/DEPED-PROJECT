import { createTheme, ThemeProvider } from '@mui/material';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { LandingPage } from './Component/LandingPage';
import { PageNotFound } from './Component/PageNotFound';
import Teacher from './Component/Teacher';
import TeacherDashboard from './Component/Teacher/Dashboard';
import StudentDashboard from './Component/Student/Dashboard';
import { AppRoute, StudentRoute, TeacherRoute } from './library/routes';

const theme = createTheme({
  typography: {
    fontFamily: [
			"Poppins",
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
  }
})

function App() {
  return (
    <div>
      <Router>
        <ThemeProvider theme={theme}>
            <Switch>
              <AppRoute exact path="/" component={() => <LandingPage type="login" />} />
              <AppRoute exact path="/register" component={() => <LandingPage type="register" />} />
              <TeacherRoute exact path="/teacher" component={Teacher} />
              <TeacherRoute exact path="/faculty" component={TeacherDashboard} />
              <StudentRoute exact path="/student" component={StudentDashboard} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </ThemeProvider>
      </Router>
    </div>
  );
}


export default App;
