import {
  Body1,
  Body1Stronger,
  Button,
  Caption1,
  Card,
  CardHeader,
  Combobox,
  makeStyles,
  MenuButton,
  Option,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
  shorthands,
  SplitButton,
  Title1,
  tokens,
  typographyStyles,
} from "@fluentui/react-components";
import {
  Add16Filled,
  Add16Regular,
  AddCircle12Regular,
  AddCircle16Filled,
  AddCircleRegular,
  AddRegular,
  DismissCircle16Filled,
  DismissCircleFilled,
  DismissFilled,
  Open20Filled,
  Open20Regular,
} from "@fluentui/react-icons";
import { InteractionTag, Tag, TagGroup } from "@fluentui/react-tags-preview";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    paddingTop: "5rem",
  },
  card: { width: "320px" },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    ...shorthands.gap("0.25rem"),
  },
  badge: {
    display: "inline-flex",
    columnGap: "0.25rem",
    alignItems: "center",
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius("9999px"),
    ...shorthands.padding("0.125rem", "0.5rem"),
    ...typographyStyles.caption1Strong,
  },
});

const allTags = ["Meter", "Info", "Address", "Mismatch", "New", "Deprecated"];

const Badge: React.FC<{
  tag: string;
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ tag, setTags }) => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <SplitButton
      size="small"
      menuIcon={<DismissFilled />}
      // shape="circular"
      menuButton={{
        onClick: () => setTags((prev) => prev.filter((i) => i !== tag)),
      }}
    >
      {tag}
    </SplitButton>
  );
};

const Home: NextPage = () => {
  const styles = useStyles();

  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const handleOpenChange: PopoverProps["onOpenChange"] = (e, data) =>
    setPopoverOpen(data.open || false);

  const [searchValue, setSearchValue] = React.useState("");

  const [tags, setTags] = React.useState<string[]>([
    "Meter",
    "Info",
    "Address",
    "Mismatch",
  ]);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardHeader
          header={<Body1Stronger>SCR_FND_MTR_HILO_FAILED</Body1Stronger>}
          description={<Caption1>High / Low Check Failed</Caption1>}
          action={<Button appearance="subtle" icon={<Open20Filled />}></Button>}
        />
        <TagGroup className={styles.tagContainer}>
          {tags.map((tag) => (
            <Tag key={tag} size="extra-small" dismissible>
              {tag}
            </Tag>
          ))}
          <Popover
            open={popoverOpen}
            onOpenChange={handleOpenChange}
            positioning="below"
          >
            <PopoverTrigger>
              <InteractionTag icon={<AddCircleRegular />}>
                Add Tag
              </InteractionTag>
            </PopoverTrigger>
            <PopoverSurface>
              <Combobox placeholder="Add a tag..." size="small">
                {allTags
                  .filter((i) => !tags.includes(i))
                  .map((allTag) => (
                    <Option
                      key={allTag}
                      value={allTag}
                      onSelect={() => {
                        setTags((prev) => [...prev, allTag]);
                        setPopoverOpen(false);
                        setSearchValue("");
                      }}
                    >
                      {allTag}
                    </Option>
                  ))}
              </Combobox>
            </PopoverSurface>
          </Popover>
        </TagGroup>
      </Card>
    </div>
  );
};

export default Home;
