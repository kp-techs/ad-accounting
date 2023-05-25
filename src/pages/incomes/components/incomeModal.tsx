import Modal from "react-modal";
import styled from "styled-components";
import React, { FC } from "react";
import { Formik, Field, Form, FormikProps } from "formik";
import { incomeTypes } from "../utils/incomesTypes";
import SwitchButton from "../../../components/switchButton";

const initialValues = {
  incomeType: "",
  date: "",
  amount: "",
  comment: "",
  diezmante: "",
  eventName: "",
  ministeryName: "",
};

type Income = {
  incomeType: string;
  date: string;
  amount: string;
  comment: string;
  diezmante: string;
  eventName: string;
  ministeryName: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const IncomesModal: FC<Props> = ({ isOpen, onClose }) => {
  const [on, setOn] = React.useState(false);

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Experimentacion con React Modal"
    >
      <Wrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values }: FormikProps<Income>) => (
            <Form>
              <div className="selectType-container">
                <label htmlFor="selectIncomeType">Concepto</label>
                <Field id="selectIncomeType" as="select" name="incomeType">
                  {incomeTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </Field>
              </div>
              <section></section>
              {values.incomeType === "Diezmos" ? (
                <section className="field-line">
                  <label htmlFor="diezmante-nombre">Diezmante</label>
                  <Field id="diezmante-name" type="text" name="diezmante" />
                </section>
              ) : values.incomeType === "Evento" ? (
                <section
                  id="typeEventFields-container"
                  className="fields-container field-line"
                >
                  <div>
                    <label htmlFor="event-name">Nombre</label>
                    <Field id="event-name" type="text" name="eventName" />
                  </div>
                  <div>
                    {/* aqui ira un tipo de input que sugerira 
                     de los que tiene, y sino hay lo agrega */}
                    <label htmlFor="event-name">Ministerio</label>
                    <Field
                      id="ministery-name"
                      type="text"
                      name="ministeryName"
                    />
                  </div>
                </section>
              ) : null}

              <div className="fields-container field-line">
                <div>
                  <label>Fecha</label>
                  <Field name="date" type="date" />
                </div>
                <div>
                  <label>Monto</label>
                  <Field name="amount" type="number" />
                </div>
              </div>

              <div className="field-line">
                <label>Comentario</label>
                <Field name="comment" type="text" />
              </div>

              <div className="foo-modal">
                {values.incomeType === "Diezmos" ? (
                  <div className="toggle">
                    <SwitchButton on={on} onClick={() => setOn(!on)} />

                    <label>Mantener selección</label>
                  </div>
                ) : null}
                <div className="buttons-container">
                  <button type="submit" onClick={onClose}>
                    Cerrar
                  </button>
                  <button type="submit">Guardar</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  gap: 10px;

  input {
    width: 100%;
  }

  .selectType-container {
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px gray solid;
    width: 100%;
    margin: 5px;
    padding: 10px;
    gap: 10px;
  }

  .fields-container {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
  }
  .field-line {
    margin: 10px 0;
  }
  .toggle {
    grid-area: left;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    gap: 10px;
  }
  .buttons-container {
    display: flex;
    grid-area: right;
    gap: 15px;
  }
  select {
    width: 100%;
  }
  .buttons-container button {
    /* margin: 10px; */
    width: 70px;
    justify-content: center;
    font-size: 14px;
    box-sizing: border-box;
    background-color: #a4a4a4;
    border-radius: 5px;
    font-family: Arial, Helvetica, sans-serif;
    border: 0;
    cursor: pointer;
  }
  .buttons-container button:active {
    background-color: #a4a4a494;
  }

  .foo-modal {
    display: grid;
    grid-template: "left right" 25px/1fr;
    padding: 5px;
  }
`;

export default IncomesModal;
