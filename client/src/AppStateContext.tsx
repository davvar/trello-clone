import { nanoid } from 'nanoid';
import { FC, useEffect, useReducer } from 'react';
import { save } from './api';
import { withData } from './hocs/withData';
import { AppStateContext } from './hooks';
import {
	findItemIndexById,
	insertItemAtIndex,
	moveItem,
	overrideItemAtIndex,
	removeItemAtIndex
} from './utils/arrayUtils';

const appStateReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case 'ADD_LIST': {
			return {
				...state,
				lists: [
					...state.lists,
					{ id: nanoid(), tasks: [], text: action.payload },
				],
			}
		}

		case 'ADD_TASK': {
			const targetListIndex = findItemIndexById(
				state.lists,
				action.payload.listId
			)

			const targetList = state.lists[targetListIndex]

			const updatedTargetList = {
				...targetList,
				tasks: [
					...targetList.tasks,
					{ id: nanoid(), text: action.payload.text },
				],
			}

			return {
				...state,
				lists: overrideItemAtIndex(
					state.lists,
					updatedTargetList,
					targetListIndex
				),
			}
		}

		case 'MOVE_LIST': {
			const { dragIndex, hoverIndex } = action.payload
			return { ...state, lists: moveItem(state.lists, dragIndex, hoverIndex) }
		}

		case 'MOVE_TASK': {
			const {
				dragIndex,
				hoverIndex,
				sourceColumn,
				targetColumn,
			} = action.payload

			const sourceListIndex = findItemIndexById(state.lists, sourceColumn)
			const targetListIndex = findItemIndexById(state.lists, targetColumn)

			const sourceList = state.lists[sourceListIndex]
			const task = sourceList.tasks[dragIndex]

			const updatedSourceList = {
				...sourceList,
				tasks: removeItemAtIndex(sourceList.tasks, dragIndex),
			}

			const stateWithUpdatedSourceList = {
				...state,
				lists: overrideItemAtIndex(
					state.lists,
					updatedSourceList,
					sourceListIndex
				),
			}

			const targetList = stateWithUpdatedSourceList.lists[targetListIndex]

			const updatedTargetList = {
				...targetList,
				tasks: insertItemAtIndex(targetList.tasks, task, hoverIndex),
			}

			return {
				...stateWithUpdatedSourceList,
				lists: overrideItemAtIndex(
					stateWithUpdatedSourceList.lists,
					updatedTargetList,
					targetListIndex
				),
			}
		}

		case 'SET_DRAGGED_ITEM': {
			return { ...state, draggedItem: action.payload }
		}

		default: {
			return state
		}
	}
}

export const AppStateProvider: FC = withData(({ children, initialState }) => {
	const [state, dispatch] = useReducer(appStateReducer, initialState)

	useEffect(() => {
		save(state)
	}, [state])

	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	)
})
