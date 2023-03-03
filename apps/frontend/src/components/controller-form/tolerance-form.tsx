import React, { FC, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
	Box,
	Button,
	IconButton,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	Tooltip,
	TextField,
	Typography,
	List,
	ListItem,
	MenuItem,
	Select,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ControllerDto } from '@boilerplate/shared';
import {
	appendButtonToleranceStyle,
	errorInputControllerStyle,
	listItemToleranceStyle,
	toleranceHeaderStyle,
	formControlToleranceStyle,
	listToleranceStyle,
	dangerColorStyle,
	warnColorStyle,
	safeColorStyle,
	deleteIconToleranceStyle,
	errorToleranceStyle,
} from './common-controller-form.styles';

export interface INestedArray {
	defaultValues?: ControllerDto;
	nestedIndex: number;
	clicked: boolean;
}

const ToleranceForm: FC<INestedArray> = ({ nestedIndex, clicked, defaultValues }: INestedArray) => {
	const { fields, remove, append } = useFieldArray({
		name: `indexes[${nestedIndex}].tolerances`,
	});

	const {
		register,
		formState: { errors },
	} = useFormContext();

	const initValue = defaultValues?.indexes[nestedIndex as number]?.tolerances!.length || 0;

	const [toleranceCounter, setToleranceCounter] = useState(initValue);

	return (
		<Box bgcolor={grey[300]} m={'15px 0 10px'} width="100%" borderRadius={1}>
			<Typography sx={toleranceHeaderStyle}>Tolerance specs</Typography>
			<List sx={listToleranceStyle}>
				{clicked && errors['indexes'] && errors[`indexes`][nestedIndex as number]?.tolerances ? (
					<Box width="100%" display="flex" justifyContent="center" position="absolute" top="-60px" left="0px">
						<FormHelperText error id="component-error-text" sx={errorToleranceStyle}>
							{errors['indexes'] && errors[`indexes`][nestedIndex as number]?.tolerances?.message}
						</FormHelperText>
					</Box>
				) : (
					''
				)}
				{fields.map((item, index) => (
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
											defaultValue={defaultValues?.indexes[nestedIndex]?.tolerances[index]!.dangerRate || 'SAFETY'}
											{...register(`indexes[${nestedIndex}].tolerances[${index}].dangerRate`)}
										>
											<MenuItem value={'SAFETY'}>Safety</MenuItem>
											<MenuItem value={'WARNING'}>Warning</MenuItem>
											<MenuItem value={'DANGER'}>Danger</MenuItem>
										</Select>
									</FormControl>
									<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
										{errors['indexes'] &&
											errors[`indexes`][nestedIndex as number]?.tolerances[index]?.dangerRate?.message}
									</FormHelperText>
								</Box>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={2}>
								<Box position="relative">
									<FormControl sx={formControlToleranceStyle}>
										<InputLabel id="colors-label">Color</InputLabel>
										<Select
											labelId="colors-label"
											id="colors-select"
											label="Color"
											defaultValue={defaultValues?.indexes[nestedIndex]?.tolerances[index]!.color || '#9ccc65'}
											{...register(`indexes[${nestedIndex}].tolerances[${index}].color`)}
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
									<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
										{errors['indexes'] && errors[`indexes`][nestedIndex as number]?.tolerances[index]?.color?.message}
									</FormHelperText>
								</Box>
							</Grid>

							<Grid item xs={12} sm={6} md={4} lg={3}>
								<Box position="relative">
									<TextField
										id="startValue"
										label="Start value"
										sx={formControlToleranceStyle}
										{...register(`indexes[${nestedIndex}].tolerances[${index}].startValue`)}
									/>
									<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
										{errors['indexes'] &&
											errors[`indexes`][nestedIndex as number]?.tolerances[index]?.startValue?.message}
									</FormHelperText>
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
											defaultValue={defaultValues?.indexes[nestedIndex]?.tolerances[index]!.label || 'NORMAL'}
											{...register(`indexes[${nestedIndex}].tolerances[${index}].label`)}
										>
											<MenuItem value={'FAR BELOW NORMAL'}>Far below normal</MenuItem>
											<MenuItem value={'BELOW NORMAL'}>Below normal</MenuItem>
											<MenuItem value={'NORMAL'}>Normal</MenuItem>
											<MenuItem value={'ABOVE THE NORM'}>Above the norm</MenuItem>
											<MenuItem value={'MUCH HIGHER THAN NORMAL'}>Much higher than normal</MenuItem>
										</Select>
									</FormControl>
									<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
										{errors['indexes'] && errors[`indexes`][nestedIndex as number]?.tolerances[index]?.label?.message}
									</FormHelperText>
								</Box>
							</Grid>

							<Grid item xs={12} sm={3} md={2} lg={1}>
								<Tooltip title="Delete tolerance" arrow>
									<Box
										bgcolor="#efe"
										p="5px 0"
										border="5px double #000"
										borderRadius={1}
										ml={0.5}
										display="flex"
										justifyContent="center"
										alignItems="center"
									>
										<IconButton
											aria-label="delete"
											color="error"
											size="small"
											sx={deleteIconToleranceStyle}
											onClick={() => {
												if (toleranceCounter > 0 && toleranceCounter < 5) {
													setToleranceCounter(toleranceCounter - 1);

													remove(index);
												}
											}}
										>
											<DeleteIcon />
										</IconButton>
									</Box>
								</Tooltip>
							</Grid>
						</Grid>
					</ListItem>
				))}
			</List>
			<Box width="100%" display="flex" justifyContent="center">
				{toleranceCounter < 5 && (
					<Button
						variant="contained"
						endIcon={<AddBoxIcon />}
						sx={appendButtonToleranceStyle}
						onClick={() => {
							if (toleranceCounter < 5) {
								setToleranceCounter(toleranceCounter + 1);

								append({
									dangerRate: 'SAFETY',
									color: '#f44336',
									startValue: '0',
									label: 'NORMAL',
								});
							}
						}}
					>
						Append Tolerance
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default ToleranceForm;
