import { Container, Grid } from "@mui/material";
import Feature from "./Feature";

const features = [
  {
    title: "Tea",
    desc: "Lorem Ipsum sit amet",
    stats: "60",
    image: "/girl.svg",
    borderColor: "secondary.main",
  },
  {
    title: "Stu",
    desc: "Lorem Ipsum sit amet",
    stats: "100",
    image: "/guy.svg",
    borderColor: "secondary.main",
  },
  {
    title: "Live",
    desc: "Lorem Ipsum sit amet",
    stats: "300",
    image: "/desk.svg",
    borderColor: "primary",
  },
];

const Features = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4}>
            <Feature
              borderColor={feature.borderColor}
              desc={feature.desc}
              stats={feature.stats}
              image={feature.image}
              title={feature.title}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Features;
