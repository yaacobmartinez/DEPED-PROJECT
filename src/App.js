import { createTheme, ThemeProvider } from '@mui/material';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { LandingPage } from './Component/LandingPage';
import { PageNotFound } from './Component/PageNotFound';
import Register from './Component/Register';
import Teacher from './Component/Teacher';
import TeacherDashboard from './Component/Teacher/Dashboard';

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
              <Route exact path="/" component={() => <LandingPage type="login" />} />
              <Route exact path="/register" component={() => <LandingPage type="register" />} />
              <Route exact path="/teacher" component={Teacher} />
              <Route exact path="/faculty" component={TeacherDashboard} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </ThemeProvider>
      </Router>
    </div>
  );
}


export default App;
