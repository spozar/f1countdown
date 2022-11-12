import Countdown from "./Countdown";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Text,
  Image,
  SegmentedControl,
  createStyles,
} from "@mantine/core";
import Weather from "./Weather";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: "pink", to: "orange" }),
  },

  control: {
    border: "0 !important",
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));

function NextRace() {
  const { classes } = useStyles();
  const [raceList, setRaceList] = useState();
  const [parsedRaceList, setParsedRaceList] = useState();
  const [value, setValue] = useState("GP");

  const lookup = require("country-code-lookup");

  const event = {
    FP1: "FirstPractice",
    FP2: "SecondPractice",
    FP3: "ThirdPractice",
    QUAL: "Qualifying",
    SPRINT: "Sprint",
    GP: "",
  };

  const eventText = {
    FP1: "First Practice",
    FP2: "Second Practice",
    FP3: "Third Practice",
    QUAL: "Qualifying",
    SPRINT: "Sprint",
    GP: "Grand Prix Race",
  };

  useEffect(() => {
    const dataAge = localStorage.getItem('Age');
    if((Date.now() - dataAge) > 21600000){
    axios
      .get("https://ergast.com/api/f1/current.json")
      .then((res) => {
        return res.data;
      })
      .then((resdata) => {
        localStorage.setItem('NextRace', JSON.stringify(resdata.MRData.RaceTable.Races));
        localStorage.setItem('Age', Date.now());
        setRaceList(resdata.MRData.RaceTable.Races);
      });
    }

      setRaceList(JSON.parse(localStorage.getItem('NextRace')))
  }

, [lookup]);

  useEffect(() => {
    let remainingRaceList = [];
    if (raceList) {
      let currentDate = new Date().toISOString();
      raceList.forEach((element) => {
        if (element.date + 'T'+element.time > currentDate) {
          element.Countryflag = lookup.byCountry(
            element.Circuit.Location.country
          );
          if (
            element.Circuit.Location.country.length < 4 &&
            element.Circuit.Location.country !== "UAE"
          ) {
            element.CountryflagURL =
              "https://countryflagsapi.com/png/" +
              element.Circuit.Location.country;
          } else if (element.Circuit.Location.country === "UAE") {
            element.CountryflagURL = "https://countryflagsapi.com/png/ARE";
          } else {
            element.CountryflagURL =
              "https://countryflagsapi.com/png/" + element?.Countryflag?.iso2;
          }
          remainingRaceList.push(element);
        }
      });
      setParsedRaceList(remainingRaceList);
    }
  }, [raceList, lookup]);

  if (parsedRaceList) {
    return (
      <Card shadow="md" radius="lg" style={{ backgroundColor: "#171717" }}>
        <div
          style={{
            display: "inline-block",
            textAlign: "center",
            width: "max(300px, 20vw)",
          }}
        >
          <div style={{ marginBottom: "2vh" }}>
            <Image
              src={parsedRaceList[0].CountryflagURL}
              radius="lg"
              withPlaceholder
              placeholder={<Text align="center">Loading image</Text>}
            ></Image>
          </div>
          <div style={{borderRadius:"20px",paddingTop:"10px", marginBottom:"20px"}}>
          
          <div style={{display: "inline-block", textAlign:"left"}}>
          <Text
            variant="gradient"
            gradient={{ from: "orange", to: "red", deg: 45 }}
            weight={800}
            size="xl"
            style={{marginTop:"-10px", marginBottom:"15px", textAlign:"center", fontSize:"max(1.5vw, 1.5em)", whiteSpace:"nowrap"}}
          >
            {parsedRaceList[0].raceName}
            <Text size="xl">{new Date(parsedRaceList[0].date + 'T' + parsedRaceList[0].time).toLocaleString()}</Text>
          </Text>
          </div>
          <div>
          <Weather date={parsedRaceList[0].date + 'T' + parsedRaceList[0].time} coords={parsedRaceList[0].Circuit.Location}/>
          </div>
          </div>
          <SegmentedControl
            value={value}
            onChange={setValue}
            fullWidth
            radius="xl"
            size="md"
            data={[
              "FP1",
              "FP2",
              parsedRaceList[0].ThirdPractice ? "FP3" : "QUAL",
              parsedRaceList[0].Sprint ? "SPRINT" : "QUAL",
              "GP",
            ]}
            classNames={classes}
            style={{ marginBottom: "20px" }}
          />
          {value === "GP" ? (<>
            {" "}
              <Text size="xl" weight={700} color="white">
                {eventText[value]}
              </Text>{" "}
            <Text color="white" size="sm" weight={900}>
              <Countdown
                countdownTimestampMS={new Date(
                  parsedRaceList[0].date + "T" + parsedRaceList[0].time
                ).getTime()}
              />
            </Text>
            </>
          ) : (
            <>
              {" "}
              <Text size="xl" weight={700} color="white">
                {eventText[value]}
              </Text>{" "}
              <Text color="white" size="sm" weight={800}>
                <Countdown key={value}
                  countdownTimestampMS={new Date(
                    parsedRaceList[0][event[value]].date +
                      "T" +
                      parsedRaceList[0][event[value]].time
                  ).getTime()}
                />
              </Text>
            </>
          )}
          {/* <Spoiler
            maxHeight={0}
            showLabel="Show more"
            hideLabel="Hide"
            transitionDuration={400}
          >
            <Text size="sm" color="white">
              <Text size="xl" weight={700} color="orange">
                {" "}
                Qualifying:
              </Text>
              {parsedRaceList[0].Qualifying?.date} <br></br>
              <Text weight={600}>
                <Countdown
                  countdownTimestampMS={new Date(
                    parsedRaceList[0].Qualifying?.date +
                      "T" +
                      parsedRaceList[0].Qualifying?.time
                  ).getTime()}
                />
              </Text>
            </Text>
            <Text weight={500} size="xs" color="white">
              <Text size="md"> First Practice:</Text>
              {parsedRaceList[0].FirstPractice?.date} <br></br>
              <Countdown
                countdownTimestampMS={new Date(
                  parsedRaceList[0].FirstPractice?.date +
                    "T" +
                    parsedRaceList[0].FirstPractice?.time
                ).getTime()}
              />
              <br></br>
              <Text size="md"> Second Practice:</Text>
              {parsedRaceList[0].SecondPractice?.date} <br></br>
              <Countdown
                countdownTimestampMS={new Date(
                  parsedRaceList[0].SecondPractice?.date +
                    "T" +
                    parsedRaceList[0].SecondPractice?.time
                ).getTime()}
              />
              <br></br>
              {parsedRaceList[0].ThirdPractice ? (
                <Text size="md"> Third Practice:</Text>
              ) : (
                <Text size="md"> Sprint Race:</Text>
              )}
              {parsedRaceList[0].ThirdPractice
                ? parsedRaceList[0].ThirdPractice?.date
                : parsedRaceList[0].Sprint.date}
              <br></br>
              {parsedRaceList[0].ThirdPractice ? (
                <Countdown
                  countdownTimestampMS={new Date(
                    parsedRaceList[0].ThirdPractice?.date +
                      "T" +
                      parsedRaceList[0].ThirdPractice?.time
                  ).getTime()}
                />
              ) : (
                <Countdown
                  countdownTimestampMS={new Date(
                    parsedRaceList[0].Sprint?.date +
                      "T" +
                      parsedRaceList[0].Sprint?.time
                  ).getTime()}
                />
              )}
            </Text>
          </Spoiler> */}
        </div>
      </Card>
    );
  } else {
    return <>DOG</>;
  }
}

export default NextRace;
