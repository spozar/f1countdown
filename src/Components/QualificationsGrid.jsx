import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Loader, Text } from '@mantine/core';
import { driverColors } from '../Helpers/DriverColors';

const QualificationsGrid = ({ nextRace }) => {
	const [qualifyResult, setQualifyResult] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const currentYear = new Date().getFullYear();
		setLoading(true);
		axios
			.get(
				`https://ergast.com/api/f1/${currentYear}/${nextRace.round}/qualifying.json`
			)
			.then((res) => {
				setQualifyResult(res.data.MRData.RaceTable.Races[0]);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	}, [nextRace.round]);

	return (
		<Card
			shadow="md"
			radius="0"
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

			{loading ? (
				<Loader />
			) : (
				<>
					<Text
						weight={600}
						style={{ wordWrap: 'break-word' }}
					>
						{nextRace.Circuit.circuitName}
					</Text>
					<div style={{ height: '1rem' }}></div>
					<div style={{ display: 'inline-block' }}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{qualifyResult ? (
								qualifyResult.QualifyingResults.map(
									(driver, index) => {
										return (
											<div
												style={{
													alignSelf: 'flex-start',
													paddingLeft:
														index % 2 === 0 ? '6rem' : '0px',
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
														from: driverColors[
															driver.Driver.driverId
														],
														to: driverColors[driver.Driver.driverId],
														deg: 180,
													}}
													weight={900}
												>
													{`${index + 1} ${driver.Driver.code}`}
												</Text>
											</div>
										);
									}
								)
							) : (
								<>The drivers have not yet qualified</>
							)}
						</div>
					</div>
				</>
			)}
		</Card>
	);
};

export default QualificationsGrid;
