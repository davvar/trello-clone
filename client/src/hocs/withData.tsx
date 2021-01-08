import React, {
  ElementType,
  PropsWithChildren,
  useEffect,
  useState
} from 'react';
import { load } from '../api';

export const withData = (
	WrappedComponent: ElementType<PropsWithChildren<{ initialState: AppState }>>
) => {
	return ({ children }: PropsWithChildren<{}>) => {
		const [isLoading, setIsLoading] = useState(true)
		const [error, setError] = useState<Error | undefined>()
		const [initialState, setInitialState] = useState<AppState>({
			lists: [],
			draggedItem: undefined,
		})

		useEffect(() => {
			fetchInitialState()
			async function fetchInitialState() {
				try {
					const data = await load()
					setInitialState(data as AppState)
				} catch (e) {
					setError(e)
				}

				setIsLoading(false)
			}
		}, [])

		if (isLoading) {
			return <div>Loading</div>
		}

		if (error) {
			return <div>{error.message}</div>
		}

		return (
			<WrappedComponent initialState={initialState}>
				{children}
			</WrappedComponent>
		)
	}
}
