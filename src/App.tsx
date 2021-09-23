import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { theme } from "./styles/globalTheme";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryComponent from "./components/ErrorBoundaryComponent";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import NewTask from "./pages/NewTask";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";
import Task from "./pages/Task";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorBoundaryComponent
              resetErrorBoundary={resetErrorBoundary}
              error={error}
            />
          )}
          onReset={reset}
        >
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ThemeProvider theme={theme}>
                <Router>
                  <Switch>
                    <Layout>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route exact path="/register">
                        <Register />
                      </Route>
                      <Route exact path="/login">
                        <Login />
                      </Route>
                      <Route exact path="/new-task">
                        <NewTask />
                      </Route>
                      <Route exact path="/tasks">
                        <Tasks />
                      </Route>
                      <Route exact path="/task/:id">
                        <Task />
                      </Route>
                    </Layout>
                  </Switch>
                </Router>
              </ThemeProvider>
            </LocalizationProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
