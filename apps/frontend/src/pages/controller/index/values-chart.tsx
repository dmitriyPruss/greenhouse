import React, { FC } from 'react';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/material';
import { Chart } from 'react-google-charts';
import { IndexDto } from '@boilerplate/shared';
import { chartLoaderStyle } from './index.styles';

export interface IChart {
	toleranceChartColor: string;
	index: IndexDto;
	socketIndex: IndexDto | undefined;
}

export type chartValuesType = (number | null)[] | number[];

const ValuesChart: FC<IChart> = ({ index, toleranceChartColor, socketIndex }: IChart) => {
	const options = {
		title: `${index?.type.name.toUpperCase()}`,
		curveType: 'function',
		backgroundColor: grey[900],
		pointSize: 12,
		pointShape: 'diamond',
		lineWidth: 3,
		legend: { position: 'bottom', textStyle: { color: grey[100], fontSize: 16 } },
		colors: [toleranceChartColor],
		vAxis: {
			title: `${index?.type.name.slice(0, 1).toUpperCase()}${index?.type.name.slice(1)}`,
			titleTextStyle: { color: grey[50] },
			gridlines: { color: '#aaa' },
			textStyle: { color: '#aaa' },
		},
		hAxis: {
			title: `Number`,
			titleTextStyle: { color: grey[50] },
			gridlines: { color: '#aaa' },
			minorGridlines: { color: '#aaa' },
			textStyle: { color: '#aaa' },
		},
		series: {
			0: {
				color: '#fff',
			},
			1: {
				color: toleranceChartColor,
				pointSize: 12,
				pointShape: 'circle',
				visibleInLegend: false,
			},
		},
	};

	let chartValues: chartValuesType[] = [];

	if (index?.values!.length) {
		chartValues = [...index?.values].reverse().map((val, ind) => {
			if (ind === index?.values!.length - 1) {
				return [ind + 1, null, +val.value];
			}

			if (ind === index?.values!.length - 2) {
				return [ind + 1, +val.value, +val.value];
			}

			return [ind + 1, +val.value, null];
		});
	}

	if (socketIndex?.values?.length) {
		chartValues = [...socketIndex!.values!].reverse().map((val, index) => {
			if (index === socketIndex!.values!.length - 1) {
				return [index + 1, null, +val.value];
			}

			if (index === socketIndex?.values!.length - 2) {
				return [index + 1, +val.value, +val.value];
			}

			return [index + 1, +val.value, null];
		});
	}

	const chartData = [['Number', index.type.name, 'Last value'], ...chartValues];

	return (
		<Box width="100%" height="500px" display="flex" justifyContent="center" alignItems="center">
			<Chart
				chartType="LineChart"
				width="100%"
				height="100%"
				loader={<span style={chartLoaderStyle}></span>}
				data={chartData}
				options={options}
			/>
		</Box>
	);
};
export default ValuesChart;
