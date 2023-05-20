import styled from "styled-components";
import React, { FC } from "react";
import { Formik, Field, Form } from "formik";
import { incomeTypes } from "./incomesTypes";

type Props = {
  closeModal: () => void;
};

const FormIncomesModal: FC<Props> = ({ closeModal }) => {
  return (
    <Wrapper>
      <h1>Agregar Ingreso</h1>
      <Formik
        initialValues={{ incomeType: "", date: "", amount: "", comment: "" }}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <div className="fields-container">
            <div>
              <label htmlFor="selectIncomeType">Concepto</label>
              <Field id="selectIncomeType" as="select" name="incomeType">
                {incomeTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </Field>
            </div>
          </div>
          <div className="fields-container">
            <div>
              <label>Fecha</label>
              <Field name="date" type="date" />
            </div>
            <div>
              <label>Monto</label>
              <Field name="amount" type="number" />
            </div>
          </div>
          <div className="fields-container">
            <div>
              <label>Comentario</label>
              <Field name="comment" type="text" />
            </div>
          </div>
          <div className="buttons-container">
            <button type="submit" onClick={closeModal}>
              Cerrar
            </button>
            <button type="submit">Guardar</button>
          </div>
        </Form>
      </Formik>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 800px;
  height: 800px;
  box-sizing: border-box;

  .fields-container {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .buttons-container {
    display: flex;
    align-self: end;
  }
`;
export default FormIncomesModal;
