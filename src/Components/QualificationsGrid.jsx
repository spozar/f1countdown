import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Text } from '@mantine/core';
import { driverColors } from '../Helpers/DriverColors';

const QualificationsGrid = () => {
	const [qualifyResult, setQualifyResult] = useState();

	useEffect(() => {
		axios
			.get('https://ergast.com/api/f1/2023/qualifying.json')
			.then((res) => {
				setQualifyResult(
					res.data.MRData.RaceTable.Races[0].QualifyingResults
				);
				console.log(
					'Result',
					res.data.MRData.RaceTable.Races[0].QualifyingResults
				);
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
			<div style={{ height: '1rem' }}></div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{qualifyResult.map((driver, index) => {
					return (
						<div
							style={{
								alignSelf: 'flex-start',
								paddingLeft: index % 2 === 0 ? '6rem' : '0px',
							}}
							key={driver.Driver.driverId}
						>
							<Text
								style={{ lineHeight: '15px' }}
								variant="gradient"
								gradient={{
									from: 'white',
									to: driverColors[driver.Driver.driverId],
									deg: 37212,
								}}
								weight={900}
							>
								{`${index + 1} ${driver.Driver.code}`}
							</Text>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

export default QualificationsGrid;
