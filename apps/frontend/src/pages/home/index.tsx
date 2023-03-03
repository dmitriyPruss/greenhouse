import { FC } from 'react';
import Header from '../../components/header-unregistered';
import HomeComponent from './home-component';
import Footer from '../../components/footer';
import { HomeMediaScreen } from './home.styles';

const HomePage: FC = () => (
	<HomeMediaScreen>
		<Header />
		<HomeComponent />
		<Footer />
	</HomeMediaScreen>
);

export default HomePage;
