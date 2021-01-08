import React, { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState, useItemDrag } from '../hooks';
import { CardContainer } from '../styles';

interface IProps {
	text: string
	index: number
	columnId: string
	id: string
	isPreview?: boolean
}

export const Card: FC<IProps> = ({ text, index, columnId, id, isPreview }) => {
	const { dispatch } = useAppState()
	const ref = useRef<HTMLDivElement>(null)
	const [, drop] = useDrop({
		accept: 'CARD',
		hover(item: CardDragItem) {
			if (item.type !== 'CARD') {
				return
			}

			if (item.id === id) {
				return
			}

			const dragIndex = item.index
			const hoverIndex = index
			const sourceColumn = item.columnId
			const targetColumn = columnId

			dispatch({
				type: 'MOVE_TASK',
				payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
			})

			item.index = hoverIndex
			item.columnId = targetColumn
		},
	})

	const { drag } = useItemDrag({ type: 'CARD', text, index, columnId, id })

	drag(drop(ref))

	return <CardContainer ref={ref}>{text}</CardContainer>
}
