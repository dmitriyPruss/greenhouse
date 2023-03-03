import React, { FC } from 'react';
import { grey } from '@mui/material/colors';
import {
	Box,
	Typography,
	FormControl,
	Grid,
	InputLabel,
	TextField,
	List,
	ListItem,
	MenuItem,
	Select,
} from '@mui/material';
import { ToleranceDto } from '@boilerplate/shared';
import {
	listItemToleranceStyle,
	formControlToleranceStyle,
	listToleranceStyle,
	dangerColorStyle,
	warnColorStyle,
	safeColorStyle,
} from './index.styles';

export interface ISettings {
	defaultValues: ToleranceDto[];
}

const Settings: FC<ISettings> = ({ defaultValues }: ISettings) => (
	<Box bgcolor={grey[300]} m={'15px 0 10px'} width="100%" borderRadius={1}>
		<List sx={listToleranceStyle}>
			{defaultValues.length &&
				defaultValues.map((item) => (
					<ListItem key={item.id} sx={listItemToleranceStyle}>
						<Grid container spacing={5}>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Box position="relative">
									<FormControl sx={formControlToleranceStyle}>
										<InputLabel id="danger-rate-label">Danger Rate</InputLabel>
										<Select
											labelId="danger-rate-label"
											id="danger-rate-select"
											label="Danger rate"
											defaultValue={item.dangerRate || 'SAFETY'}
											inputProps={{
												readOnly: true,
											}}
										>
											<MenuItem value={'SAFETY'}>Safety</MenuItem>
											<MenuItem value={'WARNING'}>Warning</MenuItem>
											<MenuItem value={'DANGER'}>Danger</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Box position="relative">
									<FormControl sx={formControlToleranceStyle}>
										<InputLabel id="colors-label">Color</InputLabel>
										<Select
											labelId="colors-label"
											id="colors-select"
											label="Color"
											defaultValue={item.color || '#9ccc65'}
											inputProps={{
												readOnly: true,
											}}
										>
											<MenuItem value={'#f44336'}>
												<Typography component="div" sx={dangerColorStyle}>
													DANGER
												</Typography>
											</MenuItem>
											<MenuItem value={'#ffca28'}>
												<Typography component="div" sx={warnColorStyle}>
													WARN
												</Typography>
											</MenuItem>
											<MenuItem value={'#9ccc65'}>
												<Typography component="div" sx={safeColorStyle}>
													SAFE
												</Typography>
											</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Box position="relative">
									<TextField
										id="startValue"
										label="Start value"
										defaultValue={item.startValue}
										sx={formControlToleranceStyle}
										InputProps={{
											readOnly: true,
										}}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={9} md={10} lg={3}>
								<Box position="relative">
									<FormControl sx={formControlToleranceStyle}>
										<InputLabel id="labels-label">Label</InputLabel>
										<Select
											labelId="labels-label"
											id="labels-select"
											label="Label"
											defaultValue={item.label || 'NORMAL'}
											inputProps={{
												readOnly: true,
											}}
										>
											<MenuItem value={'FAR BELOW NORMAL'}>Far below normal</MenuItem>
											<MenuItem value={'BELOW NORMAL'}>Below normal</MenuItem>
											<MenuItem value={'NORMAL'}>Normal</MenuItem>
											<MenuItem value={'ABOVE THE NORM'}>Above the norm</MenuItem>
											<MenuItem value={'MUCH HIGHER THAN NORMAL'}>Much higher than normal</MenuItem>
										</Select>
									</FormControl>
								</Box>
							</Grid>
						</Grid>
					</ListItem>
				))}
		</List>
	</Box>
);

export default Settings;
