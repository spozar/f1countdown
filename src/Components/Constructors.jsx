
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Text, Card, SegmentedControl, createStyles } from "@mantine/core";
import { motion } from "framer-motion";


function Constructors({currentConstructorStandings}) {

    const teamColors = {
        'red_bull' : '#0600EF',
        'ferrari' : 'red',
        "alpine" :	"#0090FF",
        "haas" : "#FFFFFF",
        "aston_martin" : "#006F62",
        "alphatauri" : "#2B4562",
        "mclaren" : "#F88700",
        "alfa" : "#900000",
        "williams" : "#005AFF",
        "mercedes" : "#00D2BE"
      }

    
  

  if (currentConstructorStandings) {
    return (<>
  
      <div style={{textAlign:"left", width:"max(300px, 15vw)"}}>
        {currentConstructorStandings.map((element, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  position: "absolute",
                  zIndex: "20",
                  whiteSpace: "nowrap",
                }}
              >
                {element.position <= 9 ? (
                  <Text color="white" weight={800}>
                    #{element.position}&nbsp; {element.Constructor.name}
                  </Text>
                ) : (
                  <span>
                  <Text color="white" weight={800} span>
                  #{element.position}&nbsp;
                     {element.Constructor.name}
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
                style={{ position: "relative",backgroundColor: teamColors[element.Constructor.constructorId],
                height: "5px",
                paddingRight: "10px",
                borderRight: "black solid 0.5px",
                borderTop: "black solid 0.5px",
                borderBottom: "black solid 0.5px" }}
                initial={{ width:"0px" }}
                animate={{ width: ((Number(element.points) / Number(currentConstructorStandings[0].points)) * 100) - 1 + "%" }}
                transition={{ duration: 1 }}
              >
                
              </motion.div>
            </div>
          );
        })}
      </div>
    
    
    </>);
  }
  else{
    return <></>;
  }
}
export default Constructors;
