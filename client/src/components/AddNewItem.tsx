import React, { useState } from 'react';
import { NewItemForm } from '.';
import { AddItemButton } from '../styles';

interface IProps {
	onAdd: (text: string) => void
	toggleButtonText: string
	dark?: boolean
}

export const AddNewItem = (props: IProps) => {
	const [showForm, setShowForm] = useState(false)
	const { onAdd, toggleButtonText, dark } = props

	if (showForm) {
		return (
			<NewItemForm
				onAdd={text => {
					onAdd(text)
					setShowForm(false)
				}}
			/>
		)
	}

	return (
		<AddItemButton dark={dark} onClick={() => setShowForm(true)}>
			{toggleButtonText}
		</AddItemButton>
	)
}
