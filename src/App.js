import "./App.css";
import NextRace from "./Components/NextRace";
import Standings from "./Components/Standings";

function App() {
  return (
    <>
      <div style={{ textAlign: "center", margin: "0 auto"}}>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            margin: "1vw",
            border:"blue 2px solid"
          }}
        >
          <NextRace />
        </div>
        <div style={{display: "inline-block" }}>
          <Standings />
        </div>
      </div>
    </>
  );
}

export default App;

// {parsedRaceList.map((x, index) => {
//   return (
//     <motion.div

//       whileHover={{ scale: 1.1 }}
//       transition={{ type: "spring", stiffness: 400, damping: 10 }}
//       key={index}
//       style={{ verticalAlign:"top", display: "inline-block", margin: "35px" }}
//     >
//       <Card
//         withBorder
//         shadow="rgba(0, 0, 0, 0.4) 5px 5px, rgba(0, 0, 0, 0.3) 10px 10px, rgba(0, 0, 0, 0.2) 15px 15px, rgba(0, 0, 0, 0.1) 20px 20px, rgba(0, 0, 0, 0.05) 25px 25px"
//         p="lg"
//         radius="xl"
//       >
//         <Card.Section style={{ borderBottom: "black solid 0.5px" }}>
//           {index === 0 ? (
//             <Image
//               src={x.CountryflagURL}
//               height="150px"
//               width="670px"
//             ></Image>
//           ) : (
//             <Image
//               src={x.CountryflagURL}
//               height="150px"
//               width="300px"
//             ></Image>
//           )}
//         </Card.Section>
//         <Card.Section
//           style={{
//             wordWrap: "break-word",
//             textAlign: "center",
//             marginBottom: "5px",
//             marginTop: "10px",
//           }}
//         >
//           <Text weight={700} size="xl">
//             <Text color="red" size="xl">
//               {index === 0 ? "NEXT RACE" : null}
//             </Text>
//             {x.RaceName._text} <br></br> {x.Date._text}
//             <br></br>{" "}
//             <Countdown
//               countdownTimestampMS={new Date(
//                 x.Date._text + " " + x.Time._text
//               ).getTime()}
//             />
//           </Text>
//           <Spoiler maxHeight={0} showLabel="Show more" hideLabel="Hide" transitionDuration={2}>
//           <Text weight={500} size="md">
//             First Practice: <br></br> {x.FirstPractice?.Date._text}{" "}
//             <br></br>
//             <Countdown
//               countdownTimestampMS={new Date(
//                 x.FirstPractice?.Date._text +
//                   " " +
//                   x.FirstPractice?.Time._text
//               ).getTime()}
//             />
//             <br></br>
//             Second Practice: <br></br> {x.SecondPractice?.Date._text}{" "}
//             <br></br>
//             <Countdown
//               countdownTimestampMS={new Date(
//                 x.SecondPractice?.Date._text +
//                   " " +
//                   x.SecondPractice?.Time._text
//               ).getTime()}
//             />
//             <br></br>
//             {x.ThirdPractice ? "Third practice:" : "Sprint Race"}
//             <br></br>
//             {x.ThirdPractice
//               ? x.ThirdPractice?.Date._text
//               : x.Sprint.Date._text}
//             <br></br>
//             {x.ThirdPractice ? (
//               <Countdown
//                 countdownTimestampMS={new Date(
//                   x.ThirdPractice?.Date._text +
//                     " " +
//                     x.ThirdPractice?.Time._text
//                 ).getTime()}
//               />
//             ) : (
//               <Countdown
//                 countdownTimestampMS={new Date(
//                   x.Sprint?.Date._text + " " + x.Sprint?.Time._text
//                 ).getTime()}
//               />
//             )}
//           </Text>
//           </Spoiler>
//         </Card.Section>
//       </Card>
//     </motion.div>
//   );
// })}
