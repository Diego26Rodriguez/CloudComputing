import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './../Estilos/InicioSesion.css'
import './../Estilos/EstiloRegistroTercero.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList, faCircleRight } from '@fortawesome/free-regular-svg-icons'
import { InicioUsuarios } from './../apis/ApiUsuarios'
import PantallaCarga from './general/PantallaCarga';

const endpoint = 'http://localhost:3333/usuarios'

function SingUp() {

    const [cedula, setCedula] = useState('')
    const [clave, setClave] = useState('')
    const [loading, setLoading] = useState(false)
    const [Falta, setFalta] = useState(false)
    const [FalloSesion, setFalloSesion] = useState(false)

    const navigate = useNavigate()

    const Datos = () => {
        if (cedula != '' && clave != '') {
            setLoading(true)
            InicioUsuarios(cedula, clave).then(datos => {
                console.log(datos.users.length);
                if (!datos.users.length) {
                    setLoading(false)
                    setFalloSesion(true)
                } else {
                    setLoading(false)
                    datos.users.forEach((item) => {
                        navigate('/menu', {
                            state: {
                                DatosUsuario: {
                                    nombre: item.nombre,
                                    apellido: item.apellido,
                                    rol: item.rol,
                                    id: item._id
                                }
                            }
                        })
                    })
                }
            })
        } else {
            setFalta(true)
        }
    }

    const recibiendoCedula = (event) => {
        setCedula(event.target.value)
    }

    const recibiendoClave = (event) => {
        setClave(event.target.value)
    }

    const MandarDatos = (event) => {
        event.preventDefault();
        Datos()
    }


    if (loading) {
        return (
            <div className='container-principal'>
                <PantallaCarga />
            </div>
        )
    } else {
        return (
            <div>
                <form onSubmit={MandarDatos}>
                    <div className='container-Inicio'>
                        <h1>INVCONTROL</h1>
                        <div className='container-Inputs'>
                            <FontAwesomeIcon className='icon' icon={faRectangleList} />
                            <div className='container-Input'>
                                <input type="text"
                                    className='Input-text'
                                    name="cedula"
                                    placeholder='Cedula'
                                    id='cedula'
                                    value={cedula}
                                    onChange={recibiendoCedula} />
                                <label className='label-tercero' for="">Cedula</label>
                            </div>
                            <div className='container-Input Input-center'>
                                <input type="password"
                                    className='Input-text'
                                    name="clave"
                                    placeholder='Clave'
                                    id='clave'
                                    value={clave}
                                    onChange={recibiendoClave} />
                                <label className='label-tercero' for="">Clave</label>
                            </div>
                        </div>
                        <button className='Button-Entrar' type="submit">
                            <FontAwesomeIcon className='icon-Next' icon={faCircleRight} />
                        </button>
                    </div>
                </form>
                {Falta &&
                    <div className='container-Fondo'>
                        <div className='Container-Alert'>
                            <div className='Container-Alert-interno'>
                                <p className='Text-Alert'>
                                    <p>falta clave o usuarios</p>
                                    <button className='button-Alert' type="submit" onClick={() => {
                                        setFalta(false)
                                    }}>Cerrar</button>
                                </p>
                            </div>
                        </div>
                    </div>
                }
                {FalloSesion &&
                    <div className='container-Fondo'>
                        <div className='Container-Alert'>
                            <div className='Container-Alert-interno'>
                                <p className='Text-Alert'>
                                    <p>sesion fallida, cedula o clave incorrecto</p>
                                    <button className='button-Alert' type="submit" onClick={() => {
                                        setFalloSesion(false)
                                    }}>Cerrar</button>
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default SingUp