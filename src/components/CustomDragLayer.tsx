import React, { FC } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { Column } from '.';
import { CustomDragLayerContainer } from '../styles';
import { Card } from './Card';

export const CustomDragLayer: FC = () => {
	const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
		item: monitor.getItem() as DragItem,
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}))

	if (!isDragging) {
		return null
	}

	return (
		<CustomDragLayerContainer>
			<div style={getItemStyles(currentOffset)}>
				{item.type === 'COLUMN' ? (
					<Column
						id={item.id}
						text={item.text}
						index={item.index}
						isPreview={true}
					/>
				) : (
					<Card
						isPreview
						columnId={item.columnId}
						index={0}
						id={item.id}
						text={item.text}
					/>
				)}
			</div>
		</CustomDragLayerContainer>
	)
}

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
	if (!currentOffset) {
		return { display: 'none' }
	}

	const { x, y } = currentOffset

	const transform = `translate(${x}px, ${y}px)`

	return {
		transform,
		WebkitTransform: transform,
	}
}
