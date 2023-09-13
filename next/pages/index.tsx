import {
  Body1,
  Body1Stronger,
  Button,
  Caption1,
  Card,
  CardHeader,
  makeStyles,
  shorthands,
  Title1,
  tokens,
  typographyStyles,
} from "@fluentui/react-components";
import { Open20Filled, Open20Regular } from "@fluentui/react-icons";
import type { NextPage } from "next";
import Head from "next/head";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingTop: "5rem",
  },
  card: { width: "320px" },
  cardHeader: typographyStyles.body1Stronger,
  cardDescription: typographyStyles.caption1,
});

const Home: NextPage = () => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.container}>
        <Card className={styles.card}>
          <CardHeader
            header={<Body1Stronger>SCR_FND_MTR_HILO_FAILED</Body1Stronger>}
            description={<Caption1>High / Low Check Failed</Caption1>}
            action={
              <Button appearance="subtle" icon={<Open20Filled />}></Button>
            }
          />
          <p></p>
        </Card>
      </div>
    </>
  );
};

export default Home;
