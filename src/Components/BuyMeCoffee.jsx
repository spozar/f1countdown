import { Popover, Button } from '@mantine/core';

function BuyMeCoffee() {
	return (
		<Popover
			width={350}
			position="bottom"
			withArrow
			shadow="md"
			transition="slide-up"
			transitionDuration="500"
			offset={80}
			zIndex={2000}
		>
			<Popover.Target>
				<div
					style={{
						position: 'fixed',
						right: 'min(60%, 195px)',
						bottom: '30px',
						zIndex: '20000000',
					}}
				>
					<Button
						color="orange"
						style={{
							border: 'black 1px solid',
							boxShadow: '3px 3px black',
							borderRadius: '2000px',
							width: '70px',
							height: '70px',
							position: 'fixed',
							right: '30px',
							bottom: '30px',
						}}
					>
						<img
							alt="Coffee"
							src="https://cdn.buymeacoffee.com/widget/assets/coffee%20cup.svg"
							width={30}
						></img>
					</Button>
				</div>
			</Popover.Target>
			<Popover.Dropdown
				style={{
					padding: '0',
					backgroundColor: 'white',
					marginRight: '200px',
					position: 'fixed',
				}}
			>
				<div style={{ borderRadius: '200px' }}>
					<iframe
						title="BuyMeACoffee"
						src="https://www.buymeacoffee.com/widget/page/spozar?description=Support%20me%20on%20Buy%20me%20a%20coffee!&color=%23E73D13"
						style={{
							height: '520px',
							width: '350px',
							borderRadius: '10px',
						}}
						allow="payment"
						frameBorder="none"
					></iframe>
				</div>
			</Popover.Dropdown>
		</Popover>
	);
}

// <iframe
// id="kofiframe"
// src="https://ko-fi.com/f1countdown/?hidefeed=true&widget=true&embed=true&preview=true"
// style={{
//   border: 'none',
//   width: '100%',
//   padding: '4px',
//   background: '#f9f9f9',
// }}
// height="712"
// title="f1countdown"
// ></iframe>

export default BuyMeCoffee;
