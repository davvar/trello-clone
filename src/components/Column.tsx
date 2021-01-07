import React, { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem, Card } from '.';
import { useAppState, useItemDrag } from '../hooks';
import { ColumnContainer, ColumnTitle } from '../styles';
import { isHidden } from '../utils';

interface IProps {
	text: string
	index: number
	id: string
	isPreview?: boolean
}

export const Column: FC<IProps> = ({ text, index, id, isPreview }) => {
	const { state, dispatch } = useAppState()
	const ref = useRef<HTMLDivElement>(null)

	const [, drop] = useDrop({
		accept: 'COLUMN',
		hover(item: DragItem) {
			if (item.type === 'COLUMN') {
				const dragIndex = item.index
				const hoverIndex = index

				if (dragIndex === hoverIndex) {
					return
				}

				dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } })
				item.index = hoverIndex
			}
		},
	})

	const { drag } = useItemDrag({ type: 'COLUMN', id, index, text })

	drag(drop(ref))

	return (
		<ColumnContainer
			isPreview={isPreview}
			ref={ref}
			isHidden={isHidden(isPreview, state.draggedItem, 'COLUMN', id)}
		>
			<ColumnTitle>{text}</ColumnTitle>
			{state.lists[index].tasks.map((task, i) => (
				<Card text={task.text} key={task.id} index={i} />
			))}
			<AddNewItem
				toggleButtonText='+ Add another task'
				onAdd={text =>
					dispatch({ type: 'ADD_TASK', payload: { text, listId: id } })
				}
				dark
			/>
		</ColumnContainer>
	)
}
