import { FC } from "react";
import styled from "styled-components";
import SelectOptions from "../../../components/selectOptions";
import { FastField, Field, Form, Formik } from "formik";
import { filterInitialValues, incomeTypeID } from "../constants";
import { GrFormClose } from "react-icons/gr";
import { StyledFilterSection } from "../../../components/styledComponents";


type Props = {
  isActive: boolean;
  onClose: () => void;
  filters: IncomesFilters;
  setFilters: (filters: IncomesFilters) => void;
};

const FilterSection: FC<Props> = ({
  isActive,
  filters,
  onClose,
  setFilters,
}) => {
  return (
    <Wrapper>
      {isActive ? (
        <Formik
          initialValues={filters}
          onReset={() => {
            setFilters(filterInitialValues);
          }}
          onSubmit={setFilters}

        >
          {({ values }) => (
            <Form>
              <div className="close">
                <button onClick={onClose}>
                  <GrFormClose size={20} />
                </button>
              </div>
              <section className="container">
                <div className="slide-container">
                  <div className="field-title">
                    <label htmlFor="selectIncomeType">Tipo de ingreso</label>
                  </div>
                  <div className="select">
                    <FastField
                      id="selectIncomeType"
                      name="type"
                      component={(props: any) => (
                        <SelectOptions
                          {...props}
                          table={"incomeTypes"}
                          isCreatable={false}
                          isMulti={true}
                        />
                      )}
                    />
                  </div>
                  {values.type?.includes(incomeTypeID.tithe) ? (
                    <section>
                      <label htmlFor="tithing-name">Diezmante</label>
                      <div className="select">
                        <FastField
                          name="memberID"
                          id="tithing-name"
                          component={(props: any) => (
                            <SelectOptions
                              {...props}
                              table={"people"}
                              isMulti={true}
                              isCreatable={false}
                            />
                          )}
                        />
                      </div>
                    </section>
                  ) : null}
                  {values.type?.includes(incomeTypeID.event) ? (
                    <section
                      id="typeEventFields-container"
                      className="field-container double-field"
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
                        <div className="select">
                          <FastField
                            id="ministery-name"
                            type="text"
                            name="ministryID"
                            component={(props: any) => (
                              <SelectOptions
                                isMulti={true}
                                {...props}
                                table={"ministries"}
                                isCreatable={false}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </section>
                  ) : null}
                </div>

                <div className="slide-container">
                  <div className="field-title">
                    <label>Rango de fecha</label>
                  </div>

                  <div className="fields-container double-field">
                    <div className="field-container">
                      <Field
                        title="Fecha inicial"
                        name="startDate"
                        type="date"
                        className="field"
                      />
                    </div>
                    <div className="field-container">
                      <Field
                        title="Fecha final"
                        name="endDate"
                        type="date"
                        className="field"
                      />
                    </div>
                  </div>
                </div>

                <div className="slide-container">
                  <div className="field-title">
                    <label>Rango de monto</label>
                  </div>
                  <div className="fields-container double-field">
                    <div className="field-container">
                      <Field
                        title="Monto inicial"
                        name="startAmount"
                        type="number"
                        className="field"
                      />
                    </div>
                    <div className="field-container">
                      <Field
                        title="Monto final"
                        name="endAmount"
                        type="number"
                        className="field"
                        value={values.endAmount || ""}
                      />
                    </div>
                  </div>
                </div>

                <div className="slide-container">
                  <div className="field-title">
                    <label htmlFor="comment">Comentario</label>
                  </div>
                  <Field className="field" name="comment" type="text" />
                </div>
              </section>
              <div className="buttons-container">
                <button type="submit">Aplicar</button>
                <button type="reset">Limpiar</button>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled(StyledFilterSection)``

export default FilterSection;
