import React from 'react';
import { AddNewItem } from './components/AddNewItem';
import { Card } from './components/Card';
import { Column } from './components/Column';
import { AppContainer } from './styles';

// const counterReducer = (state: State, action: Action) => {
// 	switch (action.type) {
// 		case 'increment':
// 			return { count: state.count + 1 }
// 		case 'decrement':
// 			return { count: state.count - 1 }
// 		default:
// 			throw new Error()
// 	}
// }

function App() {
	return (
		<AppContainer>
			<Column text='To Do'>
				<Card text='Generate app scaffold' />
			</Column>
			<Column text='In Progress'>
				<Card text='Learn Typescript' />
			</Column>
			<Column text='Done'>
				<Card text='Begin to use static typing' />
			</Column>
			<AddNewItem toggleButtonText='+ Add another list' onAdd={console.log} />
		</AppContainer>
	)
}

export default App
