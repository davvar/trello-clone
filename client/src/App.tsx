import React from 'react';
import { AddNewItem, Column, CustomDragLayer } from './components';
import { useAppState } from './hooks';
import { AppContainer } from './styles';

export const App = () => {
	const { state, dispatch } = useAppState()

	return (
		<AppContainer>
			<CustomDragLayer />
			{state.lists.map(({ id, text }, index) => (
				<Column {...{ id, text, index }} key={id} />
			))}

			<AddNewItem
				toggleButtonText='+ Add another list'
				onAdd={text => dispatch({ type: 'ADD_LIST', payload: text })}
			/>
		</AppContainer>
	)
}
