import { FC } from "react";
import styled from "styled-components";
import SelectOptions from "../../../components/selectOptions";
import { FastField, Field, Form, Formik } from "formik";
import { outgoingsInitialValues } from "../constants";
import { GrFormClose } from "react-icons/gr";

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
                    <label htmlFor="selectType">Type of outgoing</label>
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
                    <label>Date Range</label>
                  </div>

                  <div className="fields-container double-field">
                    <div className="field-container">
                      <Field
                        title="Start Date"
                        name="startDate"
                        type="date"
                        className="field"
                      />
                    </div>
                    <div className="field-container">
                      <Field
                        title="End Date"
                        name="endDate"
                        type="date"
                        className="field"
                      />
                    </div>
                  </div>
                </div>

                <div className="slide-container">
                  <div className="field-title">
                    <label>Amount Range</label>
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
                    <label htmlFor="description">Description</label>
                  </div>
                  <Field className="field" name="description" type="text" />
                </div>
              </section>
              <div className="buttons-container">
                <button type="submit">Apply</button>
                <button type="reset">Clean</button>
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.section`
 box-sizing: border-box;
  font-family: Poppins, Arial, Helvetica, sans-serif;
  font-size: 14px;

  .close {
    display: flex;
    justify-content: flex-end;
    button {
      background-color: transparent;
      border: 0px;
      align-self: flex-end;
      cursor: pointer;
    }
  }
  .container {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    gap: 30px;
    box-sizing: border-box;
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
    margin-bottom: 15px;
    padding: 2px 8px;
    box-sizing: border-box;
    height: 38px;
  }

  .select {
    margin-bottom: 15px;
  }
  .field-title {
    display: flex;
    align-items: flex-end;

    label {
      font-family: Poppins, Arial, Helvetica, sans-serif;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .slide-container {
    box-sizing: border-box;
    display: grid;
    width: 100%;
    grid-template-rows: auto 1fr;
  }

  .double-field {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
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
  @media only screen and (max-width:700px){ 
    .container {
      flex-direction: column;
    }
  }
`;

export default FilterSection;