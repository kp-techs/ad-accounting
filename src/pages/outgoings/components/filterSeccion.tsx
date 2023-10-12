import { FC } from "react";
import styled from "styled-components";
import SelectOptions from "../../../components/selectOptions";
import { FastField, Field, Form, Formik } from "formik";
import { outgoingsInitialValues } from "../constants";
import { GrFormClose } from "react-icons/gr";
import { StyledFilterSection } from "../../../components/styledDiv";

type Props = {
  isActive: boolean;
  onClose: () => void;
  filters: OutgoingsFilters;
  setFilters: (filters: OutgoingsFilters) => void;
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
            setFilters(outgoingsInitialValues);
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
                    <label htmlFor="selectType">Tipo de egreso</label>
                  </div>
                  <div className="select">
                    <FastField
                      id="selectType"
                      name="type"
                      component={(props: any) => (
                        <SelectOptions
                          {...props}
                          isMulti={true}
                          table={"outgoingTypes"}
                          isCreatable={false}
                        />
                      )}
                    />
                  </div>
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
                    <label htmlFor="description">Descripción</label>
                  </div>
                  <Field className="field" name="description" type="text" />
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
}

const Wrapper = styled(StyledFilterSection)`

`;

export default FilterSection;