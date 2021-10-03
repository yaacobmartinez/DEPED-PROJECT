import { createTheme, ThemeProvider } from '@mui/material';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { LandingPage } from './Component/LandingPage';
import { PageNotFound } from './Component/PageNotFound';
import Teacher from './Component/Teacher';
import TeacherDashboard from './Component/Teacher/Dashboard';
import StudentDashboard from './Component/Student/Dashboard';
import SuperAdminDashboard from './Component/SuperAdmin/Dashboard';
import { AppRoute, StudentRoute, TeacherRoute, SuperAdminRoute } from './library/routes';
import Users from './Component/SuperAdmin/Users';
import User from './Component/SuperAdmin/User';
import Schools from './Component/SuperAdmin/Schools';
import School from './Component/SuperAdmin/School';

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
              <SuperAdminRoute exact path="/control-panel" component={SuperAdminDashboard} />
              <SuperAdminRoute exact path="/control-panel/users" component={Users} />
              <SuperAdminRoute exact path="/control-panel/schools" component={Schools} />
              <SuperAdminRoute exact path="/user/:id" component={User} />
              <SuperAdminRoute exact path="/school/:id" component={School} />

              <Route path="*" component={PageNotFound} />
            </Switch>
          </ThemeProvider>
      </Router>
    </div>
  );
}


export default App;
