import React, { Fragment } from 'react';

const Gasto = ( {consumo, costeKm, costeTotal, combustible} ) => {
    return (
        <Fragment>
            <div>
                Consumo/100km: { consumo.toString().replace('.', ',') } {combustible === 'electrico' ? 'kWh' : 'l/100km'}
            </div>
            <div>
            {combustible === 'electrico' ? '€/kW' : '€/km'}: { costeKm.toString().replace('.', ',') } €
            </div>
            <div>
                Coste Total: { costeTotal.toString().replace('.', ',') } €
            </div>
        </Fragment>
    )
}

export default Gasto;
