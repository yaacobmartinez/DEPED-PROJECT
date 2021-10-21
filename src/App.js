import { createTheme, ThemeProvider } from '@mui/material';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { LandingPage } from './Component/LandingPage';
import { PageNotFound } from './Component/PageNotFound';
import Teacher from './Component/Teacher';
import TeacherDashboard from './Component/Teacher/Dashboard';
import StudentDashboard from './Component/Student/Dashboard';
import StudentProfile from './Component/Student/Profile';
import SuperAdminDashboard from './Component/SuperAdmin/Dashboard';
import AdminDashboard from './Component/Admin/Dashboard';
import AdminSchool from './Component/Admin/School';
import AdminStudents from './Component/Admin/Students';
import AdminStudent from './Component/Admin/Student';
import AdminFaculty from './Component/Admin/Faculty';
import Schedules from './Component/Admin/Schedules';
import ClassPerGrade from './Component/Admin/ClassPerGrade';
import { AppRoute, StudentRoute, TeacherRoute, SuperAdminRoute, AdminRoute } from './library/routes';
import Users from './Component/SuperAdmin/Users';
import User from './Component/SuperAdmin/User';
import Schools from './Component/SuperAdmin/Schools';
import School from './Component/SuperAdmin/School';
import ChangePassword from './Component/ChangePassword';
import ClassPerSection from './Component/Admin/ClassPerSection';
import ClassListOfStudents from './Component/Admin/ClassListOfStudents';
import Announcements from './Component/Admin/Announcements';

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
              <StudentRoute exact path="/student/profile" component={StudentProfile} />
              
              <AdminRoute exact path="/admin" component={AdminDashboard} />
              <AdminRoute exact path="/admin/school" component={AdminSchool} />
              <AdminRoute exact path="/admin/students" component={AdminStudents} />
              <AdminRoute exact path="/admin/faculty" component={AdminFaculty} />
              <AdminRoute exact path="/admin/classes" component={Schedules} />
              <AdminRoute exact path="/admin/grade" component={ClassPerGrade} />
              <AdminRoute exact path="/admin/section" component={ClassPerSection} />
              <AdminRoute exact path="/student/:id" component={AdminStudent} />
              <AdminRoute exact path="/class/:id" component={ClassListOfStudents} />
              <AdminRoute exact path="/admin/announcements" component={Announcements} />
              
              <SuperAdminRoute exact path="/control-panel" component={SuperAdminDashboard} />
              <SuperAdminRoute exact path="/control-panel/users" component={Users} />
              <SuperAdminRoute exact path="/control-panel/schools" component={Schools} />
              <SuperAdminRoute exact path="/user/:id" component={User} />
              <SuperAdminRoute exact path="/school/:id" component={School} />

              <Route exact path="/change-password" component={ChangePassword} />
              
              <Route path="*" component={PageNotFound} />
            </Switch>
          </ThemeProvider>
      </Router>
    </div>
  );
}


export default App;
