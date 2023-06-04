import styled from "styled-components";
import { useFormik } from 'formik';

const SignUpForm = () => {

    const { handleSubmit, handleChange } = useFormik({
        initialValues: {
            name: '',
            email: '',
            role: '',
            password: '',


        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jhonathan Ortiz"
                    onChange={handleChange} />

                <label htmlFor="correo">Correo</label>
                <input
                    id="correo"
                    type="email"
                    name="email"
                    placeholder="correo@gmail.com"
                    onChange={handleChange} />

                <label htmlFor="rol">Rol</label>
                <select id="role" name="role" onChange={handleChange}>
                    <option value="Administrador">Administrador</option>
                    <option value="Usuario">Usuario</option>
                </select>

                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    onChange={handleChange} />

                <input type="submit" value="Registrar" />
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
  box-sizing: border-box;
  display: grid;
  margin: 20px;
  border-radius: 8px;
  border: 1px solid #e8eaed5c;
  background-color: #ffffffc0;
`;

export default SignUpForm;