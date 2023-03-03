import React, { FC, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Box, Accordion, AccordionDetails, Tabs, Tab } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { IndexDto, ToleranceDto, ValueDto } from '@boilerplate/shared';
import Settings from './settings';
import ValuesTable from './values-table';
import ValuesChart from './values-chart';
import IndexSummary from './index-summary';
import { accordionDetailsStyle, arrowIconStyle, tabStyle, tabsContainerStyle } from './index.styles';

export interface IIndex {
	index: IndexDto;
	socketIndex: IndexDto | undefined;
	isLoading: boolean;
}

export interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export type chartColorType = 'green' | 'darkorange' | 'red';
export type circularColorType = 'success' | 'warning' | 'error';

const Index: FC<IIndex> = ({ index, socketIndex, isLoading }: IIndex) => {
	const toleranceValues = index.tolerances.map((tolerance) => +tolerance.startValue).sort((a, b) => a - b);

	let initChartColor: chartColorType = 'green';
	let initCircularColor: circularColorType = 'success';

	if (index.lastValue! > toleranceValues[0] && index.lastValue! < toleranceValues[1]) {
		initChartColor = 'darkorange';
		initCircularColor = 'warning';
	}

	if (index.lastValue! > toleranceValues[3] && index.lastValue! < toleranceValues[4]) {
		initChartColor = 'darkorange';
		initCircularColor = 'warning';
	}

	if (index.lastValue! <= toleranceValues[0] || index.lastValue! >= toleranceValues[4]) {
		initChartColor = 'red';
		initCircularColor = 'error';
	}

	const [toleranceChartColor, setToleranceChartColor] = useState<chartColorType>(initChartColor);
	const [toleranceCircularColor, setToleranceCircularColor] = useState<circularColorType>(initCircularColor);

	useEffect(() => {
		if (socketIndex?.lastValue! > toleranceValues[1] && socketIndex?.lastValue! < toleranceValues[3]) {
			setToleranceChartColor('green');
			setToleranceCircularColor('success');
		}

		if (socketIndex?.lastValue! > toleranceValues[0] && socketIndex?.lastValue! < toleranceValues[1]) {
			setToleranceChartColor('darkorange');
			setToleranceCircularColor('warning');
		}

		if (socketIndex?.lastValue! > toleranceValues[3] && socketIndex?.lastValue! < toleranceValues[4]) {
			setToleranceChartColor('darkorange');
			setToleranceCircularColor('warning');
		}

		if (socketIndex?.lastValue! <= toleranceValues[0] || socketIndex?.lastValue! >= toleranceValues[4]) {
			setToleranceChartColor('red');
			setToleranceCircularColor('error');
		}
	}, [socketIndex?.lastValue]);

	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	const AccordionSummary = styled((props: AccordionSummaryProps) => <MuiAccordionSummary {...props} />)(
		({ theme }) => ({
			backgroundColor: grey[50],
			'& .MuiAccordionSummary-content': {
				marginLeft: theme.spacing(1),
			},
			'&:hover': {
				backgroundColor: grey[200],
			},
		})
	);

	let rows: ValueDto[] = index?.values || [];

	if (socketIndex?.values?.length) {
		rows = socketIndex?.values;
	}

	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
			</div>
		);
	}

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	const [value, setValue] = React.useState<number>(0);

	const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const defaultValues: ToleranceDto[] = index.tolerances;

	return (
		<Box width={'95%'}>
			<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary
					expandIcon={<KeyboardDoubleArrowDownIcon sx={arrowIconStyle} />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<IndexSummary
						index={index}
						lastValueIndex={socketIndex?.lastValue!}
						toleranceChartColor={toleranceChartColor}
						toleranceCircularColor={toleranceCircularColor}
					/>
				</AccordionSummary>
				<AccordionDetails sx={accordionDetailsStyle}>
					<Box sx={tabsContainerStyle}>
						<Tabs
							value={value}
							onChange={handleChangeTabs}
							textColor="secondary"
							indicatorColor="secondary"
							aria-label="basic tabs example"
						>
							<Tab label="Stats" {...a11yProps(0)} sx={tabStyle} />
							<Tab label="Settings" {...a11yProps(1)} sx={tabStyle} />
						</Tabs>
					</Box>

					<TabPanel value={value} index={0}>
						<ValuesChart index={index} socketIndex={socketIndex} toleranceChartColor={toleranceChartColor} />
						<ValuesTable rows={rows} isLoading={isLoading} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Settings defaultValues={defaultValues} />
					</TabPanel>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default Index;
