import React, { useState } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Gasto from './components/Gasto';

import styled from '@emotion/styled';

const ContenedorPrincipal = styled.div`
    max-width: 700px;
    margin: 0 auto;
    margin-top: 2em;
`;

const ContenedorFormulario = styled.div`
    background-color: #FFFFFF;
    padding: 3rem;
`;

function App() {

    const [ gastos, guardarGastos ] = useState({
        datos: {
            marca: '',
            modelo: '',
            kilometros: 0,
            combustible: '',
            consumo : 0,
            costeKm : 0,
            costeTotal : 0
        }
    });

    const { datos } = gastos;

  return (
    <ContenedorPrincipal>
        <Header
            titulo = 'Calculador de combustibles'
        />

        <ContenedorFormulario>
            <Formulario
                guardarGastos = { guardarGastos }
            />

            <Gasto
                datos = { datos }
            />

        </ContenedorFormulario>

    </ContenedorPrincipal>
  );
}

export default App;
