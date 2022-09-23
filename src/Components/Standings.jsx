import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Text, Card, SegmentedControl, createStyles, Tooltip, Popover } from "@mantine/core";
import { motion } from "framer-motion";
import Constructors from "./Constructors";


const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1]
    }`,
  },

  active: {
    backgroundImage: theme.fn.gradient({ from: 'pink', to: 'orange' }),
  },

  control: {
    border: '0 !important',
  },

  labelActive: {
    color: `${theme.white} !important`,
  },
}));


function Standings() {
  const { classes } = useStyles();

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
  const [value, setValue] = useState('Drivers');
  const [currentStandings, setCurrentStandings] = useState();
  const [currentConstructorStandings, setCurrentConstructorStandings] =
    useState();

  useEffect(() => {
    axios
      .get("https://ergast.com/api/f1/current/constructorStandings.json")
      .then((res) =>{
        //console.log(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setCurrentConstructorStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        )
      }
      );
  }, []);
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
    //console.log(currentStandings);
  }, [currentStandings]);

  if (currentStandings && currentConstructorStandings) {
    return (

      <Card shadow="md" radius="lg" style={{backgroundColor:"#171717"}}>
              <SegmentedControl
              value={value}
              onChange={setValue}
               fullWidth
      radius="xl"
      size="md"
      data={['Drivers', 'Constructors']}
      classNames={classes}
      style={{marginBottom: "20px"}}
    />
    {value === 'Drivers' ? 
      <div style={{textAlign:"left", width:"max(300px, 15vw)"}}>
        {currentStandings.map((element, index) => {
          return (
            <Popover position="top" withArrow shadow="md" offset={-20}>
          <Popover.Target>
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
                style={{ position: "relative",backgroundColor: teamColors[element.Constructors[0].constructorId],
                height: "5px",
                paddingRight: "10px",
                borderRight: "black solid 0.5px",
                borderTop: "black solid 0.5px",
                borderBottom: "black solid 0.5px" }}
                initial={{ width:"0px" }}
                animate={{ width: ((Number(element.points) / Number(currentStandings[0].points)) * 100) - 1 + "%" }}
                transition={{ duration: 1 }}
              >
                
              </motion.div>
            </div>
            </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">{element.Constructors[0].name}</Text>
      </Popover.Dropdown>
    </Popover>
          );
        })}
      </div> : <Constructors currentConstructorStandings={currentConstructorStandings}/>}
      </Card>
    );
  } else {
    return <div> DOGLASS </div>;
  }
}

export default Standings;
