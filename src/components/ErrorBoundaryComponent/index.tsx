import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import NotFound from "../../pages/NotFound";

interface IProps {
  resetErrorBoundary: (...args: unknown[]) => void;
  error: any;
}

const ErrorBoundaryComponent = ({ resetErrorBoundary, error }: IProps) => {
  if (error.response) {
    if (error.response.status === 404) {
      return <NotFound />;
    } else if (error.response.status === 401) {
    }
  }

  return (
    <Container>
      <img className="img" alt="something-went-wrong" src="/images/500.svg" />
      <Typography variant="h4">
        Something went wrong , please try again
      </Typography>
      <Button color="secondary" onClick={resetErrorBoundary}>
        Try again
      </Button>

      <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      <pre style={{ whiteSpace: "normal" }}>{error.stack}</pre>
    </Container>
  );
};

export default ErrorBoundaryComponent;
const Container = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .img {
    margin-bottom: 1.5rem;
  }
  pre {
    font-family: "Courier New", Courier, monospace;
    font-size: 0.9rem;
  }
`;
