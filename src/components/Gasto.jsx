import React, { Fragment } from 'react';
import { formateoGastos } from '../helper';
import { tipoConsumo } from '../helper';
import { tipoCoste } from '../helper';

import styled from '@emotion/styled';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const ContenedorGasto = styled.div`
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
                <TransitionGroup
                    component = 'p'
                    className = 'resultado'
                >
                    <CSSTransition
                        classNames ='resultado'
                        key = { costeKm }
                        timeout = {{
                            enter: 500,
                            exit: 500
                        }}
                    >
                        <UlLista>
                            <li>
                                <p>Consumo/100km: { consumo } { tipoConsumo(combustible) }</p>
                            </li>
                            <li>
                            <p>{ tipoCoste(combustible) }: { costeKm } €</p>
                            </li>
                            <li>
                                <p>Coste Total: { costeTotal } €</p>
                            </li>
                        </UlLista>
                    </CSSTransition>
                </TransitionGroup>
            </ContenedorGasto>
        </Fragment>
    )
}

export default Gasto;
