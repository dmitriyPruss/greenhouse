export const jwtConstants = {
	secret: 'secretKey',
	expiresIn: '900s',
};

export const refreshTokenConstants = {
	expiresIn: 1000 * 60 * 60 * 24,
};

export const prohibitedDomains: RegExp[] = [
	/@yandex.ru$/,
	/@yandex.ua$/,
	/@ya.ru$/,
	/@ya.ua$/,
	/@mail.ru$/,
	/@mail.ua$/,
	/@bk.ru$/,
	/@list.ru$/,
	/@inbox.ru$/,
];
