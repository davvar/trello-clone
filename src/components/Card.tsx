import React from 'react';
import { CardContainer } from '../styles';

interface Props {
	text: string
}

export const Card = ({ text }: Props) => {
	return <CardContainer>{text}</CardContainer>
}
