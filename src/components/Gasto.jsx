import React, { Fragment } from 'react';
import { formateoGastos } from '../helper';
import { tipoConsumo } from '../helper';
import { tipoCoste } from '../helper';

const Gasto = ( { datos } ) => {

    const { combustible, consumo, costeKm, costeTotal} = formateoGastos(datos);

    if (combustible === '' || consumo === 0 ||
        costeKm === 0 ||
        costeTotal === 0) return null; 
        
    return (
        <Fragment>
            <div>
                Consumo/100km: { consumo } { tipoConsumo(combustible) }
            </div>
            <div>
            { tipoCoste(combustible) }: { costeKm } €
            </div>
            <div>
                Coste Total: { costeTotal } €
            </div>
        </Fragment>
    )
}

export default Gasto;
