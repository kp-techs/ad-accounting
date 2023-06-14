import Modal from "react-modal";
import { FC } from "react";
import { customStyles, incomeTypeID } from "../constants";
import styled from "styled-components";
import SelectOptions from "../../../components/selectOptions";
import { FastField, Field, Form, Formik } from "formik";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
};

const FilterSeccion: FC<Props> = ({ isOpen, filters, onClose, setFilters }) => {
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
          initialValues={filters}
          onSubmit={(values) => {
            setFilters(values);
            onClose();
          }}
        >
          {({ values }) => (
            <Form>
              <div className="field-line">
                <div>
                  <label htmlFor="selectIncomeType">Tipo de ingreso</label>
                </div>
                <FastField
                  id="selectIncomeType"
                  name="type"
                  component={(props: any) => (
                    <SelectOptions
                      {...props}
                      table={"incomeTypes"}
                      isCreatable={false}
                    />
                  )}
                />
              </div>
              {values.type?.includes(incomeTypeID.tithe) ? (
                <section className="field-line">
                  <label htmlFor="tithing-name">Diezmante</label>
                  <FastField
                    name="tithingID"
                    id="tithing-name"
                    component={(props: any) => (
                      <SelectOptions
                        {...props}
                        table={"tithing"}
                        isCreatable={false}
                      />
                    )}
                  />
                </section>
              ) : values.type?.includes(incomeTypeID.event) ? (
                <section
                  id="typeEventFields-container"
                  className="fields-container field-line"
                >
                  <div>
                    <label htmlFor="event-name">Nombre</label>
                    <Field
                      id="event-name"
                      className="field"
                      type="text"
                      name="eventName"
                      placeholder="Congreso Estruendo"
                    />
                  </div>
                  <div>
                    <label htmlFor="event-name">Ministerio</label>
                    <FastField
                      id="ministery-name"
                      type="text"
                      name="ministryID"
                      component={(props: any) => (
                        <SelectOptions
                          {...props}
                          table={"ministries"}
                          isCreatable={false}
                        />
                      )}
                    />
                  </div>
                </section>
              ) : null}

              <div className="fields-container field-line">
                <label>Rango de fecha</label>
                <div>
                  <Field name="startDate" type="date" className="field" />
                </div>
                <div>
                  <Field name="endDate" type="date" className="field" />
                </div>
              </div>

              <div className="fields-container field-line">
                <label>Rango de monto</label>
                <div>
                  <Field name="startAmount" type="number" className="field" />
                </div>
                <div>
                  <Field name="endAmount" type="number" className="field" />
                </div>
              </div>

              <div className="field-line field-comment">
                <label htmlFor="comment">Comentario</label>
                <Field className="field" name="comment" type="text" />
              </div>
              <div className="buttons-container">
                <button type="submit">Aplicar</button>
                <button
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cerrar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 10px;

  h3 {
    margin: 0;
    margin-bottom: 5px;
    font-family: Poppins;
    font-weight: 400;
  }
  .selectIncomeType {
    grid-template-columns: 100px 1fr;
  }

  .incomeTypeLabel-container {
    display: flex;
    align-items: center;
  }

  input {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-size: 14px;
    width: 100%;
    background-color: hsl(0, 0%, 100%);
    border-radius: 4px;
    border: 1px;
    border-color: hsl(0, 0%, 80%);
    border-style: solid;
    outline: 0;
  }

  .field {
    padding: 2px 8px;
    box-sizing: border-box;
    height: 38px;
  }

  .selectType-container {
    box-sizing: border-box;
    display: grid;
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
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    grid-area: right;
    gap: 15px;

    button {
      width: 93px;
      height: 30px;
      text-align: center;
      justify-content: center;
      font-size: 16px;
      box-sizing: border-box;
      background-color: #eeeeee;
      border-radius: 5px;
      font-family: Poppins, Arial, Helvetica, sans-serif;
      border: 0;
      cursor: pointer;
      &:active {
        background-color: #a4a4a494;
      }
    }
  }

  .foo-modal {
    display: grid;
    grid-template: "left right" 25px/1fr;
    padding: 5px;
    height: 40px;
  }
`;

export default FilterSeccion;
