import Countdown from "./Countdown";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, Image, Spoiler } from "@mantine/core";
import { motion } from "framer-motion";

function NextRace() {
  const [raceList, setRaceList] = useState();
  const [parsedRaceList, setParsedRaceList] = useState();

  const lookup = require("country-code-lookup");

  useEffect(() => {
    let convert = require("xml-js");
    console.log(lookup.byCountry("Sweden"));
    axios
      .get("https://ergast.com/api/f1/current")
      .then((res) => {
        return res.data;
      })
      .then((resdata) => {
        let result1 = convert.xml2js(resdata, { compact: true, spaces: 4 });
        setRaceList(result1.MRData.RaceTable.Race);
      });
  }, [lookup]);

  let remainingRaceList = [];

  useEffect(() => {
    const date = new Date("12:00:00Z");
    const milliseconds = date.getTime();
    console.log(milliseconds);

    if (raceList) {
      let currentDate = new Date().toISOString().split("T")[0];
      raceList.forEach((element) => {
        if (element.Date._text > currentDate) {
          element.Countryflag = lookup.byCountry(
            element.Circuit.Location.Country._text
          );
          console.log(element.Countryflag?.iso2);
          if (
            element.Circuit.Location.Country._text.length < 4 &&
            element.Circuit.Location.Country._text !== "UAE"
          ) {
            element.CountryflagURL =
              "https://countryflagsapi.com/png/" +
              element.Circuit.Location.Country._text;
          } else if (element.Circuit.Location.Country._text === "UAE") {
            element.CountryflagURL = "https://countryflagsapi.com/png/ARE";
          } else {
            element.CountryflagURL =
              "https://countryflagsapi.com/png/" + element?.Countryflag?.iso2;
          }
          remainingRaceList.push(element);
        }
      });

      console.log(remainingRaceList);
      setParsedRaceList(remainingRaceList);
    }
  }, [raceList, lookup]);

  if (parsedRaceList) {
    return (

          <div style={{display:"inline-block",textAlign:"center",width:"300px" ,margin:"0 auto"}}>
            <div style={{border:"black 2px solid", margin:"0 auto"}}>
            <Image src={parsedRaceList[0].CountryflagURL} style={{}} radius="lg"></Image>
            </div>
            <Text color="red" weight={800} size="xl">
              {parsedRaceList[0].RaceName._text} <br></br>{" "}
              {parsedRaceList[0].Date._text}
              <br></br>{" "}
            </Text>
            <Text
            color="white"
            weight={900}>
            <Countdown
              countdownTimestampMS={new Date(
                parsedRaceList[0].Date._text +
                  "T" +
                  parsedRaceList[0].Time._text
              ).getTime()}
            />
            </Text>
            <Spoiler
            
              maxHeight={0}
              showLabel="Show more"
              hideLabel="Hide"
              transitionDuration={400}
            >
              <Text weight={500} size="xs" color="white">
                First Practice: <br></br>{" "}
                {parsedRaceList[0].FirstPractice?.Date._text} <br></br>
                <Countdown
                  countdownTimestampMS={new Date(
                    parsedRaceList[0].FirstPractice?.Date._text +
                      "T" +
                      parsedRaceList[0].FirstPractice?.Time._text
                  ).getTime()}
                />
                <br></br>
                Second Practice: <br></br>{" "}
                {parsedRaceList[0].SecondPractice?.Date._text} <br></br>
                <Countdown
                  countdownTimestampMS={new Date(
                    parsedRaceList[0].SecondPractice?.Date._text +
                      "T" +
                      parsedRaceList[0].SecondPractice?.Time._text
                  ).getTime()}
                />
                <br></br>
                {parsedRaceList[0].ThirdPractice
                  ? "Third practice:"
                  : "Sprint Race"}
                <br></br>
                {parsedRaceList[0].ThirdPractice
                  ? parsedRaceList[0].ThirdPractice?.Date._text
                  : parsedRaceList[0].Sprint.Date._text}
                <br></br>
                {parsedRaceList[0].ThirdPractice ? (
                  <Countdown
                    countdownTimestampMS={new Date(
                      parsedRaceList[0].ThirdPractice?.Date._text +
                        "T" +
                        parsedRaceList[0].ThirdPractice?.Time._text
                    ).getTime()}
                  />
                ) : (
                  <Countdown
                    countdownTimestampMS={new Date(
                      parsedRaceList[0].Sprint?.Date._text +
                        "T" +
                        parsedRaceList[0].Sprint?.Time._text
                    ).getTime()}
                  />
                )}
              </Text>
            </Spoiler>
          </div>
    );
  } else {
    return <>DOG</>;
  }
}

export default NextRace;
