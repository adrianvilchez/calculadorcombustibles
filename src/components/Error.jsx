import React from 'react';

import styled from '@emotion/styled';

const MensajeH2 = styled.h2`
    width: 100%;
    padding: 1rem;
    color: red;
    text-align: center;
`;

const Error = ( { mensaje } ) => {
    return (
        <MensajeH2>{ mensaje }</MensajeH2>
    )
}

export default Error;
