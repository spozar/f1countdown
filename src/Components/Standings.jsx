import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@mantine/core";
import { motion } from "framer-motion";

function Standings() {
  const [currentStandings, setCurrentStandings] = useState();
  useEffect(() => {
    axios
      .get("http://ergast.com/api/f1/current/driverStandings.json")
      .then((res) => {
        console.log(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
        setCurrentStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      });
  }, []);

  useEffect(() => {
    console.log(currentStandings);
  }, [currentStandings]);

  if (currentStandings) {
    return (
      <div style={{overflow:"hidden", textAlign:"left"}}>
        {currentStandings.map((element, index) => {
          return (
            <div>
              <div
                style={{
                  position: "absolute",
                  zIndex: "20",
                  width: "300px",
                  whiteSpace: "nowrap",
                }}
              >
                {element.position <= 9 ? (
                  <Text color="white" weight={800}>
                    #{element.position}&nbsp; {element.Driver.givenName}&nbsp;
                    {element.Driver.familyName}
                  </Text>
                ) : (
                  <span>
                  <Text color="white" weight={800} span>
                  #{element.position}&nbsp;
                     {element.Driver.givenName}&nbsp;
                    {element.Driver.familyName}
                  </Text>
                  </span>
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  zIndex: "20",
                  marginLeft: Number(currentStandings[0].points) - 20 + "px",
                  paddingLeft: "0px",
                }}
              >
                <Text color="white" weight={800}>
                  {element.points}
                </Text>
              </div>

              <motion.div
                key={index}
                style={{ position: "relative" }}
                initial={{ translateX: -currentStandings[0].points + "px" }}
                animate={{ translateX: "0px" }}
                transition={{ duration: 1 }}
              >
                <div style={{ height: "25px", position: "relative" }}></div>
                <div
                  className="standings_bar"
                  style={{
                    textAlign: "right",
                    position: "relative",
                    backgroundColor: "red",
                    width: element.points + "px",
                    height: "5px",
                    paddingRight: "10px",
                    borderRight: "black solid 0.5px",
                    borderTop: "black solid 0.5px",
                    borderBottom: "black solid 0.5px",
                  }}
                ></div>
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div> DOGLASS </div>;
  }
}

export default Standings;
