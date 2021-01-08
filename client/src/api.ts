export const save = (payload: AppState) => {
	return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
		body: JSON.stringify(payload),
	})
		.then(res => res.json())
		.catch(console.log)
}

export const load = () => {
	return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`)
		.then(res => res.json() as Promise<AppState>)
		.catch(console.log)
}
