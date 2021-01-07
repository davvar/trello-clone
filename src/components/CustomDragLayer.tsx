import React, { FC } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { Column } from '.';
import { CustomDragLayerContainer } from '../styles';

export const CustomDragLayer: FC = () => {
	const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
		item: monitor.getItem(),
		currentOffset: monitor.getSourceClientOffset(),
		isDragging: monitor.isDragging(),
	}))

	if (!isDragging) {
		return null
	}

	return (
		<CustomDragLayerContainer>
			<div style={getItemStyles(currentOffset)}>
				<Column
					id={item.id}
					text={item.text}
					index={item.index}
					isPreview={true}
				/>
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
