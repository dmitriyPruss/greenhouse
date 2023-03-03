import { SessionStore } from './session.store';
import { usersService, authService } from '../data-services';

export const sessionStore = new SessionStore(usersService, authService);

export const GlobalStore: GlobalStoreInterface = {
	session: sessionStore,
};

export interface GlobalStoreInterface {
	session: SessionStore;
}
