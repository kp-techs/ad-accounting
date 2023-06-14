import { useState } from 'react'
import styled from "styled-components";
import { useFormik } from 'formik';
import { supabase } from "../../hooks/useSupabase";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
  }

  return (
    <div>
      <h1>Registrar usuario</h1>
      <form className="form-widget" onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Correo Electronico"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <button disabled={loading}>
            {loading ? <span>Loading</span> : <span>Enviar enlace de registro</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;