import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Text } from '@mantine/core';
import {
	driverColors,
	driverColorsGradient,
} from '../Helpers/DriverColors';

const QualificationsGrid = () => {
	const [qualifyResult, setQualifyResult] = useState();

	const currentDate = new Date().toLocaleDateString();

	useEffect(() => {
		axios
			.get('https://ergast.com/api/f1/2023/qualifying.json')
			.then((res) => {
				setQualifyResult(res.data.MRData.RaceTable.Races[0]);
				console.log('Result', res.data.MRData.RaceTable.Races[0]);
			})
			.catch((error) => console.error(error));
	}, []);

	if (!qualifyResult) {
		return <>Loading results, please wait</>;
	}

	return (
		<Card
			shadow="md"
			radius="lg"
			style={{
				backgroundColor: '#171717',
				overflow: 'visible',
			}}
		>
			<Text
				size={'20px'}
				weight={700}
			>
				Starting grid
			</Text>
			<Text
				weight={600}
				style={{ wordWrap: 'break-word' }}
			>
				{qualifyResult.Circuit.circuitName}
			</Text>
			<div style={{ height: '1rem' }}></div>
			<div style={{ display: 'inline-block' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{qualifyResult.date >= currentDate ? (
						qualifyResult.QualifyingResults.map((driver, index) => {
							return (
								<div
									style={{
										alignSelf: 'flex-start',
										paddingLeft: index % 2 === 0 ? '6rem' : '0px',
									}}
									key={driver.Driver.driverId}
								>
									<Text
										style={{
											lineHeight: '17px',
										}}
										size={'lg'}
										variant="gradient"
										gradient={{
											from: driverColors[driver.Driver.driverId],
											to: driverColors[driver.Driver.driverId],
											deg: 180,
										}}
										weight={900}
									>
										{`${index + 1} ${driver.Driver.code}`}
									</Text>
								</div>
							);
						})
					) : (
						<>The drivers have not yet qualified</>
					)}
				</div>
			</div>
		</Card>
	);
};

export default QualificationsGrid;
