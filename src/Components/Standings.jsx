import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@mantine/core";
import { motion } from "framer-motion";

function Standings() {
  const [currentStandings, setCurrentStandings] = useState();
  useEffect(() => {
    axios
      .get("https://ergast.com/api/f1/current/driverStandings.json")
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
      <div style={{textAlign:"left", width:"max(300px, 15vw)"}}>
        {currentStandings.map((element, index) => {
          return (
            <div>
              <div
                style={{
                  position: "absolute",
                  zIndex: "20",
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
                  zIndex: "20",
                  textAlign:"right",
                  paddingLeft: "0px",
                }}
              >
                <Text color="white" weight={800}>
                  {element.points}
                </Text>
              </div>

              <motion.div
                key={index}
                style={{ position: "relative",backgroundColor: "red",
                height: "5px",
                paddingRight: "10px",
                borderRight: "black solid 0.5px",
                borderTop: "black solid 0.5px",
                borderBottom: "black solid 0.5px" }}
                initial={{ width:"0px" }}
                animate={{ width: ((Number(element.points) / Number(currentStandings[0].points)) * 100) + "%" }}
                transition={{ duration: 1 }}
              >
                
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
