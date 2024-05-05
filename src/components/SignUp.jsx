import { Link } from 'wouter';
import '../styles/signup.css'; // Importa el archivo de estilos CSS

function SignUp() {
    return (
        <div className='container'>
            <form>
                <header className="titulo"> Trueque<span style={{ color: '#BF4C41' }}>Tools</span> </header>
                <p className="subtitle"> Registrarse, mas facil que nunca! </p>
                <div> <input placeholder="Nombre"/> </div>
                <div> <input placeholder="Apellido"/> </div>
                <div> <input placeholder="Contraseña" type="password"/> </div>
                <div> <input placeholder="Correo" type="email"/> </div>
                <div> <label> Fecha de nacimiento </label> </div>
                <div>
                    <label className="fecha">
                        <input placeholder="Dia"/>
                        <input placeholder="Mes"/>
                        <input placeholder="Año"/>
                    </label>
                </div>
                <select>
                    <option value="">Seleccionar sucursal</option>
                    <option value="opcion1">Sucursal 1</option>
                    <option value="opcion2">Sucursal 2</option>
                    <option value="opcion3">Sucursal 3</option>
                </select>
                <div> <Link to="/LogIn" className="registrar">Registrarse</Link> </div>
            </form>
        </div>
    );
}

export default SignUp;