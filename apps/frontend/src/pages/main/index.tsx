import React, { FC } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import { listStyle, paragraphStyle } from './main.styles';

const MainPage: FC = () => (
	<Box m="10px auto" width="90%">
		<Typography variant="h3" component="h3">
			Smart greenhouse
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			The smart greenhouse is a revolution in agriculture, creating a self-regulating, microclimate suitable for plant
			growth through the use of sensors, actuators, and monitoring and control systems that optimise growth conditions
			and automate the growing process.
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			The global smart greenhouse market was valued at approximately USD 680.3 million in 2016 and is expected to reach
			approximately USD 1.31 Billion by 2022, growing at a CAGR od 14.12% between 2017 and 2022.
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			The market is expected to witness significant growth due to increasing population, climate change and,
			urbanisation. Smart farming is also expected to develop at a very fast rate. However, high installation prices and
			high initial investment costs may inhibit growth in non-developed countries such as the Middle East & Africa.
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			Based on type, the market can be segmented into hydroponic and non-hydroponic:
		</Typography>
		<List sx={listStyle}>
			{[
				'Hydroponic greenhouses grow plants without soil.',
				'Non-hydroponic smart greenhouses dominate the market and have the highest growth potential over the forecast period.',
			].map((value) => (
				<ListItem key={value}>
					<ListItemIcon>
						<SelectAllIcon />
					</ListItemIcon>
					<ListItemText primary={value} />
				</ListItem>
			))}
		</List>
		<Typography component="p" sx={paragraphStyle}>
			The key technologies used in the smart greenhouse market are HVAC, LED grow lights, communications technology,
			irrigation systems, materials handling, valves and pumps, and control systems. The LED grow light segment
			dominated the market in 2016, used as an artificial light source to stimulate powth.
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			Europe is expected to remain the market leader over the forecast period and accounted for significant share of the
			global market revenue in 2016. Theoption of technology in emerging economies of Japan, , and India is expected to
			drive the smart greenhouse market in Asia Pacific. Asia Pacific is expected to become the most attractive segment
			due to rapid infrastructure development in countries such as oupled with a high population.
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			Key industry participants include; Rough Brothers, Inc., Heliospectra AB, Terrasphere Systems, LLC, Argus Control
			Systems Ltd., LumiGrow Inc., Ceres Greenhouse Solutions, Hort Americas, JFE Engineering Corporation, Nexus
			Corporation, Logiqs B.V., Certhon, and GreenTech Agro LLC.
		</Typography>
		<Typography variant="h4" component="h3" sx={paragraphStyle}>
			Benefits of Smart Greenhouses for Crop Growers
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			Equipped with modern sensor and communications technologies, smart greenhouses automatically capture and deliver
			information 24/7 on the surroundings and crop. Collected data is fed into an IoT platform where analytical
			algorithms turn it into actionable intelligence to uncover bottlenecks and abnormalities. Accordingly, HVAC and
			lighting operations, alongside irrigation and spraying activities can be regulated on-demand. Continuous data
			monitoring facilitates the development of predictive models to assess crop disease and infection risks.
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			By unlocking massive crop insights, a smart greenhouse allows growers to minimize labor work, improve efficiency
			in resource and chemical use while optimizing yield rates.
		</Typography>
		<Typography variant="h5" component="h3" sx={paragraphStyle}>
			Maintain Ideal Micro-Climate Conditions
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			IoT sensors allow farmers to collect various data points at unprecedented granularity. They provide real-time
			information on critical climate factors including, temperature, humidity, light exposure and carbon dioxide across
			the greenhouse. This data prompts relevant adjustments to HVAC and lighting settings to maintain the best
			conditions for plant growth while driving energy efficiency. In parallel, motion/acceleration sensors help
			identify doors that are unintentionally left open to ensure a strictly controlled environment.
		</Typography>
		<Typography variant="h5" component="h3" sx={paragraphStyle}>
			Enhance Irrigation and Fertilization Practices
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			In addition to ambient parameters, smart greenhouses enable farmers to stay on top of their crop conditions. This
			ensures irrigation and fertilization activities are on par with the actual needs of cultivated plants for
			maximized yields. For example, readings on soil volumetric water content indicate whether crops are under water
			stress. Likewise, measurements of soil salinity give useful insights on fertilization requirements. Based on this
			data, sprinkler and spraying systems can be automatically turned on to address real-time crop demands while
			minimizing manual intervention.
		</Typography>
		<Typography variant="h5" component="h3" sx={paragraphStyle}>
			Control Infection and Avoid Disease Outbreak
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			Crop infection is a persistent farming challenge, with every outbreak taking a heavy toll on the crop margins.
			Agrochemical treatments are available at hand, but farmers often don’t know the best time to apply them.
			Applications done too frequently raise ecological, safety and cost concerns, while failing to use treatments could
			lead to detrimental disease outbreaks. With the help of a machine learning platform, data on greenhouse
			environments, external weather and soil characteristics reveal valuable insights into existing risks of pest and
			fungi. Leveraging this information, farmers can apply treatments exactly when needed to ensure a healthy crop at
			the lowest chemical expense.
		</Typography>
		<Typography variant="h5" component="h3" sx={paragraphStyle}>
			Prevent Thefts and Improve Security
		</Typography>
		<Typography component="p" sx={paragraphStyle}>
			Greenhouses with high-value crops are a vulnerable target for thieves. As traditional surveillance networks with
			CCTVs are expensive to implement, many growers don’t have an effective security system in place. In this context,
			IoT sensors in smart greenhouses provide an affordable infrastructure to monitor door status and detect suspicious
			activities. Connected with an automated alarm system, they instantly notify growers when a security issue arises.
		</Typography>
	</Box>
);

export default MainPage;
