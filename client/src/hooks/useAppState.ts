import { createContext, useContext } from 'react';

export
const AppStateContext = createContext<AppStateContextProps>(
	{} as AppStateContextProps
)

export const useAppState = () => {
	return useContext(AppStateContext)
}
