import './App.css';
import NextRace from './Components/NextRace';
import Standings from './Components/Standings';
import { MantineProvider } from '@mantine/core';
import BuyMeCoffee from './Components/BuyMeCoffee';
import QualificationsGrid from './Components/QualificationsGrid';

function App() {
	return (
		<MantineProvider theme={{ colorScheme: 'dark' }}>
			<div
				style={{
					position: 'relative',
					textAlign: 'center',
					margin: '0 auto',
					paddingTop: '5vw',
				}}
			>
				<div
					style={{
						display: 'inline-block',
						verticalAlign: 'top',
						margin: '0 1vw',
						marginBottom: '5vw',
					}}
				>
					<NextRace />
				</div>
				<div
					style={{
						display: 'inline-block',
						verticalAlign: 'top',
						margin: '0 2vw',
						marginBottom: '5vw',
					}}
				>
					<Standings />
				</div>
				<div
					style={{
						display: 'inline-block',
						verticalAlign: 'top',
						margin: '0 1vw',
						marginBottom: '5vw',
					}}
				>
					<QualificationsGrid />
				</div>
				<div style={{ zIndex: '200000' }}>
					<BuyMeCoffee />
				</div>
			</div>
		</MantineProvider>
	);
}

export default App;
