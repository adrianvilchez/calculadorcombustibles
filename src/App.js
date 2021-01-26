import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';

import styled from '@emotion/styled';

const ContenedorPrincipal = styled.div`
    max-width: 700px;
    margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
    background-color: #FFFFFF;
    padding: 3rem;
`;

function App() {
  return (
    <ContenedorPrincipal>
        <Header
            titulo = 'Calculador de combustibles'
        />

        <ContenedorFormulario>
            <Formulario
                
            />
        </ContenedorFormulario>

    </ContenedorPrincipal>
  );
}

export default App;
