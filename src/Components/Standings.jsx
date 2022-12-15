import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Text, Card, SegmentedControl, createStyles, Popover } from "@mantine/core";
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
    useState([
      {
          "position": "1",
          "positionText": "1",
          "points": "696",
          "wins": "16",
          "Constructor": {
              "constructorId": "red_bull",
              "url": "http://en.wikipedia.org/wiki/Red_Bull_Racing",
              "name": "Red Bull",
              "nationality": "Austrian"
          }
      },
      {
          "position": "2",
          "positionText": "2",
          "points": "487",
          "wins": "4",
          "Constructor": {
              "constructorId": "ferrari",
              "url": "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
              "name": "Ferrari",
              "nationality": "Italian"
          }
      },
      {
          "position": "3",
          "positionText": "3",
          "points": "447",
          "wins": "0",
          "Constructor": {
              "constructorId": "mercedes",
              "url": "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
              "name": "Mercedes",
              "nationality": "German"
          }
      },
      {
          "position": "4",
          "positionText": "4",
          "points": "153",
          "wins": "0",
          "Constructor": {
              "constructorId": "alpine",
              "url": "http://en.wikipedia.org/wiki/Alpine_F1_Team",
              "name": "Alpine F1 Team",
              "nationality": "French"
          }
      },
      {
          "position": "5",
          "positionText": "5",
          "points": "146",
          "wins": "0",
          "Constructor": {
              "constructorId": "mclaren",
              "url": "http://en.wikipedia.org/wiki/McLaren",
              "name": "McLaren",
              "nationality": "British"
          }
      },
      {
          "position": "6",
          "positionText": "6",
          "points": "53",
          "wins": "0",
          "Constructor": {
              "constructorId": "alfa",
              "url": "http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One",
              "name": "Alfa Romeo",
              "nationality": "Swiss"
          }
      },
      {
          "position": "7",
          "positionText": "7",
          "points": "49",
          "wins": "0",
          "Constructor": {
              "constructorId": "aston_martin",
              "url": "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
              "name": "Aston Martin",
              "nationality": "British"
          }
      },
      {
          "position": "8",
          "positionText": "8",
          "points": "36",
          "wins": "0",
          "Constructor": {
              "constructorId": "haas",
              "url": "http://en.wikipedia.org/wiki/Haas_F1_Team",
              "name": "Haas F1 Team",
              "nationality": "American"
          }
      },
      {
          "position": "9",
          "positionText": "9",
          "points": "35",
          "wins": "0",
          "Constructor": {
              "constructorId": "alphatauri",
              "url": "http://en.wikipedia.org/wiki/Scuderia_AlphaTauri",
              "name": "AlphaTauri",
              "nationality": "Italian"
          }
      },
      {
          "position": "10",
          "positionText": "10",
          "points": "8",
          "wins": "0",
          "Constructor": {
              "constructorId": "williams",
              "url": "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering",
              "name": "Williams",
              "nationality": "British"
          }
      }
  ]);

  useEffect(() => {
    const dataAge = localStorage.getItem('Age_Constructor');
    if((Date.now() - dataAge) > 0){
    axios
      .get("https://ergast.com/api/f1/current/constructorStandings.json")
      .then((res) =>{
        console.log(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        localStorage.setItem('Age_Constructor', Date.now());
        localStorage.setItem('constructorStandings', JSON.stringify(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings))
        setCurrentConstructorStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        )
      }
      );
    }
    setCurrentConstructorStandings(JSON.parse(localStorage.getItem('constructorStandings')));
  }, []);
  useEffect(() => {

    const dataAge = localStorage.getItem('Age_Driver');
    if((Date.now() - dataAge) > 21600000){
    axios
      .get("https://ergast.com/api/f1/current/driverStandings.json")
      .then((res) => {
        localStorage.setItem('Age_Driver', Date.now());
        localStorage.setItem('driverStandings', JSON.stringify(res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings));
        setCurrentStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      });
    }
    if(JSON.parse(localStorage.getItem('driverStandings')) !== null){
    setCurrentStandings(JSON.parse(localStorage.getItem('driverStandings')));
    }
  }, []);

  useEffect(() => {
    //console.log(currentStandings);
  }, [currentStandings]);

  if (currentStandings && currentConstructorStandings) {
    return (

      <Card shadow="md" radius="lg" style={{backgroundColor:"#171717"}}>
        <Text weight={700} size={'2em'}>Standings for {new Date().getFullYear()}</Text>
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
      <div style={{textAlign:"left", width:"max(300px, 20vw)"}}>
        {currentStandings.map((element, index) => {
          return (
            <Popover position="top" withArrow shadow="md" offset={-20} key={index}>
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
