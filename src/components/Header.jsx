import React from 'react';
import styled from '@emotion/styled';

const ContenedorHeader = styled.header`
    background-color: #159463;
    padding: 1rem;
    font-weight: bold;
    color: #ffffff;
`;

const TextoH1 = styled.h1`
    font-size: 2rem;
    margin: 0;
    font-family: 'Roboto 24', sans-serif;
    text-align: center;
`;

const Header = ({ titulo }) => {
    return (
        <ContenedorHeader>
            <TextoH1>{ titulo }</TextoH1>
        </ContenedorHeader>
    );
}

export default Header;