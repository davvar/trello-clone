import React, { FC } from 'react';
import { ColumnContainer, ColumnTitle } from '../styles';
import { AddNewItem } from './AddNewItem';

interface IProps {
	text: string
}

export const Column: FC<IProps> = ({ children, text }) => {
	return (
		<ColumnContainer>
			<ColumnTitle>Title</ColumnTitle>
			{children}
			<AddNewItem
				toggleButtonText='+ Add another task'
				onAdd={console.log}
				dark
			/>
		</ColumnContainer>
	)
}
