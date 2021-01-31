export function calculoCombustible(combustible, consumo) {

    let calculo = null;

    const precioGasolina = 1.099;
    const precioGasoil = 0.950;
    const precioElectrico = 0.119;
    
    switch (combustible) {
        case "gasoleo":
        case "diesel":
            calculo = precioGasoil * consumo / 100;
            break;
        case "gasolina":
            calculo = precioGasolina * consumo / 100;
            break;
        case "electrico":
            calculo = precioElectrico * consumo / 100;
            break;
        default:
            break;
    }

    return parseFloat(calculo);
}

export function formateoGastos(datos) {

    console.log(datos);

    const datosFormateados = {
        combustible: datos.combustible,
        consumo: datos.consumo.toString().replace('.', ','),
        costeKm: datos.costeKm.toString().replace('.', ','),
        costeTotal: datos.costeTotal.toString().replace('.', ',')
    };

    return datosFormateados;
}

export function tipoConsumo(combustible) {
    return combustible === 'electrico' ? 'kWh' : 'l/100km';
}

export function tipoCoste(combustible) {
    return combustible === 'electrico' ? '€/kW' : '€/Km';
}