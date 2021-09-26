import { Grid, useTheme } from "@mui/material";
import ContentLoader from "react-content-loader";

const TasksLoadingSkeleton = () => {
  const theme = useTheme();
  return (
    <Grid container spacing={4}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Grid item key={i} xs={12} sm={6} md={4} xl={3}>
          <ContentLoader
            width="100%"
            height={300}
            viewBox="0 0 700 300"
            backgroundColor={theme.palette.text.primary}
            foregroundColor={theme.palette.text.secondary}
          >
            {/* Left Border */}
            <rect x="4" y="8" rx="12" ry="12" width="7" height="288" />
            {/* bottom Border */}
            <rect x="6" y="289" rx="12" ry="12" width="669" height="8" />
            {/* right Border */}
            <rect x="670" y="9" rx="12" ry="12" width="6" height="285" />
            {/* description */}

            <rect x="55" y="162" rx="3" ry="3" width="170" height="12" />
            <rect x="55" y="182" rx="3" ry="3" width="130" height="12" />

            {/* Top Border */}
            <rect x="5" y="8" rx="12" ry="12" width="669" height="7" />
            {/* Task Status */}
            <rect x="55" y="100" rx="6" ry="6" width="72" height="29" />
            {/* Buttons */}
            <circle cx="613" cy="61" r="25" width="32" height="32" />
            <circle cx="550" cy="61" r="25" width="32" height="32" />
            {/* Action Buttons */}
            <rect x="532" y="225" rx="6" ry="6" width="100" height="37" />
            <rect x="400" y="225" rx="6" ry="6" width="100" height="37" />
            {/* Title */}
            <rect x="55" y="41" rx="6" ry="6" width="231" height="39" />
          </ContentLoader>
        </Grid>
      ))}
    </Grid>
  );
};

export default TasksLoadingSkeleton;
