import React from 'react';
import { CardContainer } from '../styles';

interface Props {
	text: string
	index: number
}

export const Card = ({ text, index }: Props) => {

	return <CardContainer>{text}</CardContainer>
}
