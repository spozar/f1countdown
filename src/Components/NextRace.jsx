import Countdown from './Countdown';
import '../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Card,
	Text,
	Image,
	SegmentedControl,
	createStyles,
	Loader,
} from '@mantine/core';
import Weather from './Weather';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import moment from 'moment';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.white,
		boxShadow: theme.shadows.md,
		border: `1px solid ${
			theme.colorScheme === 'dark'
				? theme.colors.dark[4]
				: theme.colors.gray[1]
		}`,
	},

	active: {
		backgroundImage: theme.fn.gradient({
			from: 'pink',
			to: 'orange',
		}),
	},

	control: {
		border: '0 !important',
	},

	labelActive: {
		color: `${theme.white} !important`,
	},
}));

function NextRace({ raceList, parsedRaceList }) {
	const { classes } = useStyles();

	const [value, setValue] = useState('GP');

	const event = {
		FP1: 'FirstPractice',
		FP2: 'SecondPractice',
		FP3: 'ThirdPractice',
		QUAL: 'Qualifying',
		SPRINT: 'Sprint',
		GP: '',
	};

	const eventText = {
		FP1: 'First Practice',
		FP2: 'Second Practice',
		FP3: 'Third Practice',
		QUAL: 'Qualifying',
		SPRINT: 'Sprint',
		GP: 'Grand Prix Race',
	};

	if (parsedRaceList) {
		return (
			<>
				<Card
					shadow="md"
					radius="0"
					style={{ backgroundColor: '#171717', overflow: 'visible' }}
				>
					<div
						style={{
							display: 'inline-block',
							textAlign: 'center',
							width: 'max(300px, 20vw)',
						}}
					>
						<div style={{ marginBottom: '2vh' }}>
							<Image
								src={`${parsedRaceList[0]?.CountryflagURL}`}
								withPlaceholder
								placeholder={
									<Text align="center">Loading image</Text>
								}
								imageProps={{ crossOrigin: 'anonymous' }}
							></Image>
						</div>
						<div
							style={{
								borderRadius: '20px',
								paddingTop: '10px',
								marginBottom: '20px',
							}}
						>
							<div
								style={{ display: 'inline-block', textAlign: 'left' }}
							>
								<Text
									variant="gradient"
									gradient={{ from: 'orange', to: 'red', deg: 45 }}
									weight={800}
									size="xl"
									style={{
										marginTop: '-10px',
										marginBottom: '15px',
										textAlign: 'center',
										fontSize: 'max(1.5vw, 1.5em)',
										whiteSpace: 'nowrap',
									}}
								>
									{parsedRaceList[0]?.raceName}
									<Text size="xl">
										{new Date(
											parsedRaceList[0]?.date +
												'T' +
												parsedRaceList[0]?.time
										).toLocaleString()}
									</Text>
								</Text>
							</div>
							<div>
								<Weather
									date={
										parsedRaceList[0]?.date +
										'T' +
										parsedRaceList[0]?.time
									}
									coords={parsedRaceList[0]?.Circuit.Location}
								/>
							</div>
						</div>
						<SegmentedControl
							value={value}
							onChange={setValue}
							fullWidth
							radius="0"
							size="md"
							data={[
								'FP1',
								'FP2',
								parsedRaceList[0]?.ThirdPractice ? 'FP3' : 'QUAL',
								parsedRaceList[0]?.Sprint ? 'SPRINT' : 'QUAL',
								'GP',
							]}
							classNames={classes}
							style={{ marginBottom: '20px' }}
						/>
						{value === 'GP' ? (
							<>
								<Text
									size="xl"
									weight={700}
									color="white"
								>
									{eventText[value]}
								</Text>
								<Text style={{ opacity: '0' }}>
									{new Date(
										parsedRaceList[0]?.date +
											'T' +
											parsedRaceList[0]?.time
									).toLocaleString()}
								</Text>
								<Text
									color="white"
									size="sm"
									weight={900}
								>
									<Countdown
										countdownTimestampMS={new Date(
											parsedRaceList[0]?.date +
												'T' +
												parsedRaceList[0]?.time
										).getTime()}
									/>
								</Text>
							</>
						) : (
							<>
								{' '}
								<Text
									size="xl"
									weight={700}
									color="white"
								>
									{eventText[value]}
								</Text>
								<Text>
									{new Date(
										parsedRaceList[0][event[value]]?.date +
											'T' +
											parsedRaceList[0][event[value]]?.time
									).toLocaleString()}
								</Text>
								<Text
									color="white"
									size="sm"
									weight={800}
								>
									<Countdown
										key={value}
										countdownTimestampMS={new Date(
											parsedRaceList[0][event[value]]?.date +
												'T' +
												parsedRaceList[0][event[value]]?.time
										).getTime()}
									/>
								</Text>
							</>
						)}
					</div>
					<div
						style={{
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<AddToCalendarButton
							name={parsedRaceList[0]?.raceName}
							startDate={parsedRaceList[0]?.date}
							endDate={parsedRaceList[0]?.date}
							startTime={parsedRaceList[0]?.time.slice(0, 5)}
							endTime={moment(
								parsedRaceList[0]?.time.slice(0, 5),
								'HH:mm'
							)
								.add(90, 'minutes')
								.format('HH:mm')}
							options={['Apple', 'Google', 'MicrosoftTeams']}
							listStyle="dropdown"
							lightMode="dark"
							label="Add race to calendar"
							hideBackground={true}
							buttonStyle="text"
							hideBranding={true}
						/>
					</div>
				</Card>
			</>
		);
	} else {
		return <Loader />;
	}
}

export default NextRace;
