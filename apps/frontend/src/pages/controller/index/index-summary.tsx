import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { IndexDto } from '@boilerplate/shared';
import {
	backProgresstyle,
	indexNameStyle,
	summaryContentStyle,
	progressInnerContainerStyle,
	progressOuterContainerStyle,
	typeContentStyle,
} from './index.styles';

export type circularColor = 'success' | 'warning' | 'error';

export interface IIndexSummary {
	index: IndexDto;
	lastValueIndex: number;
	toleranceChartColor: string;
	toleranceCircularColor: circularColor;
}

const IndexSummary: FC<IIndexSummary> = ({
	index,
	toleranceChartColor,
	lastValueIndex,
	toleranceCircularColor,
}: IIndexSummary) => {
	function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
		const tolerances = index.tolerances.map((i) => +i.startValue).sort((a, b) => a - b);

		const step = (tolerances[tolerances.length - 1] - tolerances[0]) / 100;

		let progressValue = Math.round((index?.lastValue! - tolerances[0]) / step) || undefined;

		if (lastValueIndex) {
			progressValue = Math.round((lastValueIndex - tolerances[0]) / step);
		}

		if (progressValue && progressValue! >= 100) {
			progressValue = 100;
		}

		if (progressValue && progressValue <= 0) {
			progressValue = 0;
		}

		return (
			<Box sx={progressOuterContainerStyle}>
				<Box sx={progressInnerContainerStyle}>
					<CircularProgress
						variant="determinate"
						color="inherit"
						size="11rem"
						{...props}
						value={100}
						sx={backProgresstyle}
					/>
					<CircularProgress
						variant="determinate"
						color={toleranceCircularColor}
						size="11rem"
						{...props}
						value={progressValue}
					/>
				</Box>

				<Box sx={summaryContentStyle}>
					<Typography variant="caption" component="div" sx={{ color: toleranceChartColor, fontSize: '1.7em' }}>
						{`${props.value}`}
						{index.type.unitOfMeasurement || ''}
					</Typography>
					<Typography variant="caption" component="div" color="text.secondary" sx={typeContentStyle}>
						{index.type.name || ''}
					</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<Box width="90%" display="flex" justifyContent={'space-between'}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={6}>
					<Box height="100%" display="flex" alignItems="center" justifyContent={'center'}>
						<Typography variant="h5" component="h3" sx={indexNameStyle}>
							{index.name}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Box width={'100%'} display="flex" justifyContent={'center'}>
						<CircularProgressWithLabel value={lastValueIndex || index.lastValue || 0} />
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default IndexSummary;
