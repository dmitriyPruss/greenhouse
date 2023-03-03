import React, { FC, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
	Box,
	Button,
	Grid,
	IconButton,
	FormControl,
	InputLabel,
	FormHelperText,
	List,
	ListItem,
	MenuItem,
	Select,
	Tooltip,
	TextField,
	Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ToleranceForm from './tolerance-form';
import { ControllerDto } from '@boilerplate/shared';
import {
	indexSpecsHeader,
	indexListStyle,
	indexListItemStyle,
	inputControllerStyle,
	errorInputControllerStyle,
	deleteIconButtonStyle,
	appendIndexButtonStyle,
	formControlToleranceStyle,
} from './common-controller-form.styles';

export interface IIndexForm {
	defaultValues?: ControllerDto;
	clicked: boolean;
}

const IndexForm: FC<IIndexForm> = ({ clicked, defaultValues }: IIndexForm) => {
	const { fields, append, remove } = useFieldArray({
		name: 'indexes',
	});

	const {
		register,
		formState: { errors },
	} = useFormContext();

	const initCounter: number = defaultValues ? defaultValues.indexes?.length : 0;

	const [indexCounter, setIndexCounter] = useState(initCounter);

	return (
		<Box m={'10px 0'} bgcolor={grey[800]} display="flex" flexDirection="column" alignItems="center" borderRadius={1}>
			<Typography variant="h5" sx={indexSpecsHeader}>
				Index specs
			</Typography>
			<List sx={indexListStyle}>
				{fields.map((item, index) => (
					<ListItem key={item.id} sx={indexListItemStyle}>
						<Box width="100%" pt={1} pb={3}>
							<Grid container spacing={5}>
								<Grid item xs={12} sm={12} md={5}>
									<Box position="relative">
										<TextField
											id="name"
											label="Name"
											sx={inputControllerStyle}
											{...register(`indexes.${index}.name`)}
										/>
										<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
											{errors['indexes'] && errors[`indexes`][index]?.name?.message}
										</FormHelperText>
									</Box>
								</Grid>

								<Grid item xs={12} sm={9} md={5}>
									<Box width="100%" position="relative">
										<FormControl sx={formControlToleranceStyle}>
											<InputLabel id="type-label">Type</InputLabel>
											<Select
												labelId="type-label"
												id="type-select"
												label="TypeName"
												defaultValue={'temperature'}
												{...register(`indexes.${index}.type.name`)}
											>
												<MenuItem value={'temperature'}>Temperature, &#8451;</MenuItem>
												<MenuItem value={'humidity'}>Humidity, %</MenuItem>
												<MenuItem value={'oxygen'}>Oxygen content, %</MenuItem>
												<MenuItem value={'carbon'}>Carbon content, %</MenuItem>
												<MenuItem value={'nitrogen'}>Nitrogen content, %</MenuItem>
											</Select>
										</FormControl>
										<FormHelperText error id="component-error-text" sx={errorInputControllerStyle}>
											{errors['indexes'] && errors[`indexes`][index]?.type?.name}
										</FormHelperText>
									</Box>
								</Grid>

								<Grid item xs={12} sm={3} md={2}>
									<Tooltip title="Delete Index" arrow>
										<Box
											bgcolor="#fff"
											borderRadius={1}
											ml={0.5}
											display="flex"
											justifyContent="center"
											alignItems="center"
											border="4px double #000"
										>
											<IconButton
												aria-label="delete"
												color="error"
												size="large"
												sx={deleteIconButtonStyle}
												onClick={() => {
													if (indexCounter > 0) {
														setIndexCounter(indexCounter - 1);
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
						</Box>
						{defaultValues ? (
							<ToleranceForm nestedIndex={index} defaultValues={defaultValues} clicked={clicked} />
						) : (
							<ToleranceForm nestedIndex={index} clicked={clicked} />
						)}
					</ListItem>
				))}
			</List>
			<Box width="100%" display="flex" justifyContent="center">
				{indexCounter < 20 && (
					<Button
						variant="contained"
						endIcon={<AddBoxIcon />}
						sx={appendIndexButtonStyle}
						onClick={() => {
							if (indexCounter < 20) {
								setIndexCounter(indexCounter + 1);

								append({ name: '', type: 'temparature' });
							}
						}}
					>
						Append Index
					</Button>
				)}
			</Box>
		</Box>
	);
};

export default IndexForm;
