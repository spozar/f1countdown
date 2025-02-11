import './App.css';
import React, { useEffect, useState } from 'react';
import NextRace from './Components/NextRace';
import Standings from './Components/Standings';
import { Loader, MantineProvider } from '@mantine/core';
import BuyMeCoffee from './Components/BuyMeCoffee';
import axios from 'axios';
import QualificationsGrid from './Components/QualificationsGrid';

function App() {
	const [raceList, setRaceList] = useState();
	const [parsedRaceList, setParsedRaceList] = useState([]);

	const lookup = require('country-code-lookup');

	useEffect(() => {
		const currentYear = new Date().getFullYear();
		axios
			.get(`https://api.jolpi.ca/ergast/f1/${currentYear}/`)
			.then((res) => {
				return res.data;
			})
			.then((resdata) => {
				localStorage.setItem(
					'NextRace',
					JSON.stringify(resdata.MRData.RaceTable.Races)
				);
				localStorage.setItem('Age', Date.now());
				setRaceList(resdata.MRData.RaceTable.Races);
			});
	}, []);

	useEffect(() => {
		let remainingRaceList = [];
		if (raceList) {
			let epochTime = new Date(
				new Date().getTime() + 2 * 60 * 60 * 1000
			).toISOString();
			raceList.forEach((element) => {
				if (
					element.date + 'T' + (element.time ?? '15:00:00Z') >
					epochTime
				) {
					element.Countryflag = lookup.byCountry(
						element?.Circuit.Location.country
					);
					if (
						element?.Circuit.Location.country.length < 4 &&
						element?.Circuit.Location.country !== 'UAE'
					) {
						element.CountryflagURL =
							'https://countryflagsapi.com/png/' +
							element?.Circuit.Location.country;
					} else if (element?.Circuit.Location.country === 'UAE') {
						element.CountryflagURL =
							'https://countryflagsapi.com/png/ARE';
					} else {
						element.CountryflagURL = `FlagsSVG/${element?.Countryflag?.iso2.toLowerCase()}.svg`;
					}
					remainingRaceList.push({ ...element, time: '15:00:00Z' });
				}
			});
			setParsedRaceList(remainingRaceList);
		}
	}, [raceList, lookup]);

	if (!parsedRaceList.length) {
		return <Loader />;
	}

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
					<NextRace
						raceList={raceList}
						parsedRaceList={parsedRaceList}
					/>
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
					<QualificationsGrid nextRace={parsedRaceList[0]} />
				</div>
				<div style={{ zIndex: '200000' }}>
					<BuyMeCoffee />
				</div>
			</div>
		</MantineProvider>
	);
}

export default App;
