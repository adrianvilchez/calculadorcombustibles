import React, { Fragment } from 'react';
import { formateoGastos } from '../helper';
import { tipoConsumo } from '../helper';
import { tipoCoste } from '../helper';

import styled from '@emotion/styled';

const ContenedorGasto = styled.div`
    text-align: center;
    background-color: #0d5a3d;
    color: #FFFFFF;
    padding: 1em;
    margin-top: 2em;
`;

const UlLista = styled.ul`
    text-align: left; 
`;

const Gasto = ( { datos } ) => {

    const { combustible, consumo, costeKm, costeTotal} = formateoGastos(datos);

    if (combustible === '' || consumo === 0 ||
        costeKm === 0 ||
        costeTotal === 0) return null; 
        
    return (
        <Fragment>
            <ContenedorGasto>
                <UlLista>
                    <li>
                        Consumo/100km: { consumo } { tipoConsumo(combustible) }
                    </li>
                    <li>
                    { tipoCoste(combustible) }: { costeKm } €
                    </li>
                    <li>
                        Coste Total: { costeTotal } €
                    </li>
                </UlLista>
            </ContenedorGasto>

        </Fragment>
    )
}

export default Gasto;
