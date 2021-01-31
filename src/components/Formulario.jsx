import React, { useState, useEffect } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

import { calculoCombustible } from '../helper';

import styled from '@emotion/styled';

const Campos = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Etiqueta = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
    --webkit-appearance: none;
`;

const InputText = styled.input`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
    --webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Boton = styled.button`
    background-color: #159463;
    font-size: 14;
    width: 100%;
    padding: 1rem;
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: border-left;
    border: none;
    transition: background-color .3s ease;
    margin-top: 3rem;

    &:hover {
        background-color: #0d5a3d;
        cursor: pointer;
        
    }
`;

const Formulario = ( { guardarGastos, guardarCargando }) => {
   
    const [ datos, guardarDatos ] = useState({
        marca: '',
        modelo: '',
        kilometros: 0,
        combustible: '',
        consumo: 0,
        costeKm: 0,
        costeTotal: 0
    });

    const [ error, guardarError ] = useState(false);
    const [ busqueda, guardarBusqueda ] = useState(false);

    // leer datos del formulario y meterlos en el state
    const [ modelos, guardarModelos ] = useState([]);
    const [ marcaSeleccionada, guardarMarcaSeleccionada ] = useState('');
    const [ infoVehiculo, guardarInfoVehiculo ] = useState({});

    // extraemos los valores del state
    const { marca, modelo, kilometros, combustible, consumo, costeKm, costeTotal } = datos;
    
    const marcas = {
        Ford: [
            { id : 1, modelo: 'Focus', consumo: 5.3 },
            { id : 2, modelo: 'Fusión', consumo: 10.3 },
            { id : 3, modelo: 'Mondeo', consumo: 8.3 },
            { id : 4, modelo: 'Fiesta', consumo: 7.5 }
        ],
        Hyundai: [
            { id : 5, modelo: 'Accent', consumo: 5.3 },
            { id : 6, modelo: 'IONIQ', consumo: 10.3 },
            { id : 7, modelo: 'Kona', consumo: 8.3 },
            { id : 8, modelo: 'Tucson', consumo: 7.5 }
        ],
        Audi: [
            { id : 9, modelo: 'A4', consumo: 5.3 },
            { id : 10, modelo: 'A6', consumo: 10.3 },
            { id : 11, modelo: 'A8', consumo: 8.3 },
            { id : 12, modelo: 'TT', consumo: 7.5 }
        ],
        BMW: [
            { id : 13, modelo: 'M3', consumo: 5.3 },
            { id : 14, modelo: 'M6', consumo: 10.3 },
            { id : 15, modelo: 'X3', consumo: 8.3 },
            { id : 16, modelo: '700', consumo: 7.5 }
        ],
        Mercedes: [
            { id : 17, modelo: 'A180', consumo: 5.3 },
            { id : 18, modelo: 'SLK', consumo: 10.3 },
            { id : 19, modelo: 'GLS', consumo: 8.3 },
            { id : 20, modelo: 'AMG', consumo: 7.5 }
        ],
        Seat: [
            { id : 21, modelo: 'Ibiza', consumo: 5.3 },
            { id : 22, modelo: 'León', consumo: 10.3 },
            { id : 23, modelo: 'Cordoba', consumo: 8.3 },
            { id : 24, modelo: 'Arona', consumo: 7.5 }
        ]
    };
    
    const listaMarcas = Object.keys(marcas).map(key => ({
        marca: key
      }));

    const obtenerInformacion = e => {
        //e.preventDefault();

        if (e.target.name === 'marca' && e.target.value !== '') {

            let modelosAux = [];

            marcas[e.target.value].map((m, key) => (
                modelosAux.push(m.modelo)
            ));

            guardarMarcaSeleccionada(e.target.value);
            guardarModelos(e.target.value !== "" ? modelosAux : "");

        } else if (e.target.name === 'modelo') {

            marcas[marcaSeleccionada].filter(info => {
                if (info.modelo == e.target.value) {
                    guardarInfoVehiculo(info);
                }
            });
        }

        if (e.target.name === 'marca' && e.target.value === '') {
            guardarModelos('');
        }

        guardarDatos({
            ...datos, // hacemos una copia del state
            [ e.target.name ] : e.target.value
        })

        guardarBusqueda(false);
    }

    useEffect(() => {

        const precioKm = calculoCombustible(combustible, infoVehiculo.consumo)

        if (combustible === '' || consumo === 0 || costeTotal === 0) return null;

        guardarCargando(true);

        // 3 segundos para que desaparezca la carga
        setTimeout(() => {
            guardarCargando(false);

            guardarGastos({
                datos,
                consumo : infoVehiculo.consumo,
                costeKm : precioKm.toFixed(3),
                costeTotal : (precioKm * kilometros).toFixed(3)
            })
    
            guardarDatos({
                ...datos,
                consumo : 0,
                costeKm : 0,
                costeTotal : 0
            })
        }, 3000);

        
      }, [ datos ]);
      
    const handleSubmit = e => {
        e.preventDefault();

        if (marca.trim() === ''
            || modelo.trim() === ''
            || kilometros === 0
            || combustible.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        // Cálculos coste combustibles
        const precioKm = calculoCombustible(combustible, infoVehiculo.consumo)

        guardarDatos({
            ...datos,
            consumo : infoVehiculo.consumo,
            costeKm : precioKm.toFixed(3),
            costeTotal : (precioKm * kilometros).toFixed(3)
        });

        guardarBusqueda(true);
    }



    return (
        <form onSubmit = { handleSubmit }>

            {
                error
                ?
                <Error mensaje = 'No pueden haber campos vacíos'/>
                :
                null
            }

            <Campos>
                <Etiqueta>Marca</Etiqueta>
                <Select
                    name = 'marca'
                    value = { marca }
                    onChange = { obtenerInformacion }
                >
                    <option value="">-- Seleccione --</option>
                    <option value="Ford">Ford</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes">Mercedes</option>
                    <option value="Seat">Seat</option>
                </Select>
            </Campos>

            <Campos>
                <Etiqueta>Modelo</Etiqueta>
                <Select
                    name = 'modelo'
                    value = { modelo }
                    onChange = { obtenerInformacion }
                >
                    <option value="">-- Seleccione una marca --</option>
                    
                    { modelos !== '' ? modelos.map((m, key) => (
                        <option key = { key } value  ={ m }>
                            { m }
                        </option>
                    )) : null}
                </Select>
            </Campos>

            <Campos>
                <Etiqueta>Kilómetros</Etiqueta>
                <InputText
                    type = 'number'
                    name = 'kilometros'
                    value = { parseFloat(kilometros) }
                    onChange = { obtenerInformacion }
                    placeholder = 'Introduce los kilómetros'
                />
            </Campos>

            <Campos>
                <Etiqueta>Combustible</Etiqueta>
                <InputRadio
                    type = 'radio'
                    name = 'combustible'
                    value = 'gasolina'// 1,099 €/kmh | 7,5l a los 100 km
                                      // 1,099 * 7,5 / 100 = 0.082425 €/km
                    checked = { combustible === 'gasolina' }
                    onChange = { obtenerInformacion }
                /> Gasolina

                <InputRadio
                    type = 'radio'
                    name = 'combustible'
                    value = 'gasoleo' // 0,950 €/kmh | 7,5l a los 100 km
                                      // 0,950 * 7,5 / 100 = 0.07125 €/km
                    checked = { combustible === 'gasoleo' }
                    onChange = { obtenerInformacion }
                /> Gasóleo (Diesel)

                <InputRadio
                    type = 'radio'
                    name = 'combustible'
                    value = 'electrico' // 0,119 €/kwh | 14kwh a los 100km: 
                                        // 0,119 * 14 / 100 = 0.01666 €/km
                    checked = { combustible === 'electrico' }
                    onChange = { obtenerInformacion }
                /> Eléctrico
            </Campos>

            <Boton
                type = 'submit'
                value = ''>
                Buscar
            </Boton>
        </form>
    )
}

Formulario.propTypes = {
    guardarGastos: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
}

export default Formulario;