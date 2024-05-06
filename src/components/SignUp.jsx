import { Link } from 'wouter';
import '../styles/signup.css'; // Importa el archivo de estilos CSS

function SignUp() {
    return (
        <div className='container-signup'>
            <div>
                <header className="titulo"> Trueque<span style={{ color: '#BF4C41' }}>Tools</span> </header>
                <p className="subtitulo"> Registrarse, ¡mas facil que nunca! </p>
                <div className='cajaFormulario'>
                    <form>
                        <div className='formIzq'>
                            <div> * Nombre <div> <input placeholder="Ingresa tu nombre" required/> </div> </div>
                            <div> * Apellido <div> <input placeholder="Ingresa tu apellido"required/> </div> </div>
                            <div> * Correo electronico <div> <input placeholder="Ingresa tu correo" type="email" required/> </div> </div>
                            <div> * Contraseña <div> <input placeholder="Ingresa tu contraseña" type="password" required/> </div> </div>
                        </div>
                        <div className='formDer'>
                            <div> * Fecha de nacimiento
                                <input type="date" placeholder="Dia" required/>
                            </div>
                            <div> * Sucursal
                                <select>
                                    <option value="opcion1">Sucursal 1</option>
                                    <option value="opcion2">Sucursal 2</option>
                                    <option value="opcion3">Sucursal 3</option>
                                </select>
                            </div>
                            <div className="botonRegistrar"> <button>Registrarse</button> </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;