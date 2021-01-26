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