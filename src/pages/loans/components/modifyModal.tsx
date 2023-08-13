import styled from "styled-components";
import Modal from "react-modal";
import { Loans } from "../../../types/models";
import useAppData from "../../../hooks/useAppData";
import { useSupabase } from "../../../hooks/useSupabase";
import { FastField, Field, Form, Formik } from "formik";
import moment from "moment";
import SelectOptions from "../../../components/selectOptions";
import Textarea from "../../../components/textarea";
import {
  ValidationLoanForm,
  customStyles,
  initialLoanValues,
} from "../constant";

import { incomeTypeID } from "../../incomes/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loan?: Loans;
};
//to do: eliminar este modal y usar los income y outgoing modal originales
function ModifyLoanModal({ isOpen, onClose, loan }: Props) {
  const { loadOuts, profile, loadLoans, loadIncomes } = useAppData();
  const { supabase } = useSupabase();

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para modificar préstamos"
    >
      <Wrapper>
        <Formik
          validationSchema={ValidationLoanForm}
          initialValues={loan || initialLoanValues}
          onSubmit={async (values, { resetForm }) => {
            values.updateBy = profile?.name || "";
            values.updateAt = moment().format();

            let newCurrent = loan?.currentLoanAmount || 0;

            const newInitial = values.initialLoanAmount || 0;

            const previusInitial = loan?.initialLoanAmount || 0;
            if (newInitial > previusInitial)
              newCurrent = newInitial - (loan?.paidAmount || 0);

            let newStatus = "Pendiente";
            if (newCurrent <= 0) newStatus = "Saldado";

            // @ts-ignore
            delete values.people;

            if (loan) {
              await supabase
                .from("loans")
                .update({
                  ...values,
                  id: loan.id,
                  initialLoanAmount: newInitial,
                  updateBy: profile?.name,
                  updateAt: moment().format(),
                  currentLoanAmount: newCurrent,
                  status: newStatus,
                })
                .eq("id", loan.id);

              await supabase
                .from("incomes")
                .update({
                  date: values.date || "",
                  amount: values.initialLoanAmount,
                  updatedBy: profile?.name,
                  updatedDate: moment().format(),
                  type: incomeTypeID.loan,
                  comment: values.description,
                  loanName: values.name,
                  loanID: values.id,
                })
                .eq("loanID", values.id);
            }

            resetForm();
            loadOuts();
            loadIncomes();
            loadLoans();
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <section className="form-content">
                <div className="top-modal">
                  <div className="underline">
                    <label>MODIFICAR PRESTAMO </label>
                  </div>
                  <div className="fields-container field-line">
                    <div>
                      <label htmlFor="name"> Nombre </label>
                      <Field
                        id="name"
                        className="field"
                        type="text"
                        name="name"
                      />
                      {errors.name && touched.name && (
                        <div style={{ color: "red" }}> {errors.name} </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="creditor">Acreedor</label>
                      <FastField
                        type="number"
                        name="creditorID"
                        component={(props: any) => (
                          <SelectOptions {...props} table={"people"} />
                        )}
                      />
                      {errors.creditorID && touched.creditorID && (
                        <div style={{ color: "red" }}>
                          {" "}
                          {errors.creditorID}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="fields-container field-line">
                    <div>
                      <label>Fecha </label>
                      <Field name="date" type="date" className="field" />
                      {errors.date && touched.date && (
                        <div style={{ color: "red" }}> {errors.date} </div>
                      )}
                    </div>
                    <div>
                      <label>Monto </label>
                      <Field
                        className="field"
                        name="initialLoanAmount"
                        type="number"
                      />
                      {errors.initialLoanAmount &&
                        touched.initialLoanAmount && (
                          <div style={{ color: "red" }}>
                            {" "}
                            {errors.initialLoanAmount}{" "}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="field-line field-comment">
                    <label htmlFor="description">Descripción </label>
                    <FastField
                      className="description"
                      name="description"
                      component={Textarea}
                    />
                  </div>
                </div>
                <div className="foo-modal">
                  <div className="buttons-container">
                    <button onClick={onClose}> Cancelar </button>
                    <button type="submit"> Actualizar </button>
                  </div>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 15px;
  width: 700px;
  label {
    color: #ffffff;
    font-family: Poppins;
    font-weight: 400;
    font-size: 18px;
  }
  .form-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .selectOutgoingType {
    display: grid;
    grid-template-columns: 90px 1fr;
    align-items: center;
  }
  .outgoingTypeLabel-container {
    display: flex;
    align-items: center;
  }
  input,
  .description {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-size: 14px;
    width: 100%;
    background-color: hsl(0, 0%, 100%);
    border-radius: 4px;
    border: 1px;
    border-color: hsl(0, 0%, 80%);
    border-style: solid;
    outline: 0;
    padding: 2px 8px;
    box-sizing: border-box;
    color: #2f2f2f;
  }
  .field {
    height: 38px;
  }
  .field-description {
    display: flex;
    flex-direction: column;
    .description {
      padding: 5px 8px;
    }
  }
  .selectType-container {
    box-sizing: border-box;
    display: grid;
    grid-template: 1fr 1fr;
    width: 100%;
    margin: 5px;
    padding: 10px;
    gap: 10px;
  }
  .underline {
    border-bottom: 1px gray solid;
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

export default ModifyLoanModal;
