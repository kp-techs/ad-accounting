import Modal from "react-modal";
import styled from "styled-components";
import React, { FC } from "react";
import { Formik, Field, Form } from "formik";
import SwitchButton from "../../../components/switchButton";
import { useSupabase } from "../../../hooks/useSupabase";
import { Income } from "../../../types/models";
import useAppData from "../../../hooks/useAppData";
import SelectOptions from "../utils/selectOptions";
import { initialIncome, customStyles, incomeTypeID } from "../constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  income?: Income;
};

const IncomesModal: FC<Props> = ({ isOpen, onClose, income }) => {
  const { loadIncomes } = useAppData();
  const [on, setOn] = React.useState(false);
  const { supabase } = useSupabase();

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para registrar ingresos"
    >
      <Wrapper>
        <Formik
          initialValues={income ?? initialIncome}
          onSubmit={async (values, { resetForm }) => {
            if (income) {
              // @ts-ignore
              delete values.incomeTypes;
              // @ts-ignore
              delete values.ministries;
              // @ts-ignore
              delete values.tithing;
              await supabase
                .from("incomes")
                .update({ ...values, id: income.id })
                .eq("id", income.id);
            } else {
              await supabase
                .from("incomes")
                .insert([values as any])
                .single();
            }
            onClose();
            resetForm();
            loadIncomes();
          }}
        >
          {({ values }) => (
            <Form>
              <div className="selectType-container">
                <label htmlFor="selectIncomeType">Concepto</label>

                <Field
                  id="selectIncomeType"
                  as="select"
                  name="type"
                  component={(props: any) => (
                    <SelectOptions {...props} table={"incomeTypes"} />
                  )}
                />
              </div>
              <section></section>
              {values.type === incomeTypeID.tithe ? (
                <section className="field-line">
                  <label htmlFor="diezmante-nombre">Diezmante</label>
                  <Field
                    id="diezmante-name"
                    type="text"
                    name="tithingID"
                    placeholder="Jocelin Sanchez"
                    component={(props: any) => (
                      <SelectOptions {...props} table={"tithing"} />
                    )}
                  />
                </section>
              ) : values.type === incomeTypeID.event ? (
                <section
                  id="typeEventFields-container"
                  className="fields-container field-line"
                >
                  <div>
                    <label htmlFor="event-name">Nombre</label>
                    <Field
                      id="event-name"
                      type="text"
                      name="eventName"
                      placeholder="Congreso Estruendo"
                    />
                  </div>
                  <div>
                    <label htmlFor="event-name">Ministerio</label>
                    <Field
                      id="ministery-name"
                      type="text"
                      name="ministryID"
                      component={(props: any) => (
                        <SelectOptions {...props} table={"ministries"} />
                      )}
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
                {!income && values.type === incomeTypeID.tithe ? (
                  <div className="toggle">
                    <SwitchButton on={on} onClick={() => setOn(!on)} />

                    <label>Mantener selección</label>
                  </div>
                ) : null}
                <div className="buttons-container">
                  <button onClick={onClose}>Cancelar</button>
                  <button type="submit">
                    {income ? "Actualizar" : "Guardar"}
                  </button>
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
