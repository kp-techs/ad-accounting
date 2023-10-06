import Modal from "react-modal";
import styled from "styled-components";
import { FC, useState } from "react";
import { Formik, Field, Form, FastField } from "formik";
import SwitchButton from "../../../components/switchButton";
import { useSupabase } from "../../../hooks/useSupabase";
import { TableIncome } from "../../../types/models";
import useAppData from "../../../hooks/useAppData";
import SelectOptions from "../../../components/selectOptions";

import {
  initialIncome,
  incomeTypeID,
  ValidationIncomeForm,
  initialLoanIncome,
  ValidationLoanVersionForm,
} from "../constants";
import Textarea from "../../../components/textarea";
import moment from "moment";
import { customStyles } from "../../../utils/constants";
import useToggle from "../../../hooks/useToggle";
import WarningModal from "./warningModal";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  income?: TableIncome;
  isLoanVersion?: boolean;
};

const IncomesModal: FC<Props> = ({
  isOpen,
  onClose,
  income,
  isLoanVersion = false,
}) => {
  const { loadIncomes, profile, loadLoans } = useAppData();
  const [on, setOn] = useState(false);
  const { supabase } = useSupabase();
  const [isWarningModalOpen, toggleWarningModal] = useToggle();

  return (
    <CModal size="lg" visible={isOpen} onClose={onClose}>
      <Wrapper>
        <Formik
          validationSchema={
            isLoanVersion ? ValidationLoanVersionForm : ValidationIncomeForm
          }
          initialValues={
            income ?? (isLoanVersion ? initialLoanIncome : initialIncome)
          }
          onSubmit={async (values, { resetForm }) => {
            if (income) {
              values.updatedBy = profile?.name;
              values.updatedDate = moment().format();
              // @ts-ignore
              delete values.incomeTypes;
              // @ts-ignore
              delete values.ministries;
              // @ts-ignore
              delete values.people;

              if (values.type !== incomeTypeID.loan && income.paidAmount) {
                toggleWarningModal();
                return;
              }

              if (values.type === incomeTypeID.loan) {
                if (values.amount && income.paidAmount) values.currentDebt =
                  values.amount - income.paidAmount;
                if (values.currentDebt) values.status = (values.currentDebt <= 0) ? 'Saldado' : 'Pendiente';
              }

              await supabase
                .from("incomes")
                .update({ ...values, id: income.id })
                .eq("id", income.id);
              onClose();
            } else {
              if (isLoanVersion) values.type = incomeTypeID.loan;
              values.createdBy = profile?.name;
              if (values.type === incomeTypeID.loan) values.currentDebt = values.amount
              await supabase.from("incomes").insert([values]);
            }

            if (on) {
              initialIncome.date = values.date;
              initialIncome.type = incomeTypeID.tithe;
            } else {
              initialIncome.date = "";
              initialIncome.type = null;
            }

            resetForm();
            if (isLoanVersion) loadLoans();
            loadIncomes();
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              {income && <WarningModal isOpen={isWarningModalOpen} onClose={toggleWarningModal} income={income} values={values} onConfirm={() => {
                onClose();
                loadIncomes();
              }} />}
              <CModalHeader>
                <CModalTitle>{income ? "ACTUALIZAR" : "AGREGAR"} {isLoanVersion? 'PRESTAMO':'INGRESO'}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {isLoanVersion ? (
                  null
                ) : (
                  <div className="field-line">

                      <div>
                        <label htmlFor="selectIncomeType">Concepto</label>
                      </div>
                      <FastField
                        id="selectIncomeType"
                        name="type"
                        component={(props: any) => (
                          <SelectOptions {...props} table={"incomeTypes"} />
                        )}
                      />


                    {errors.type && touched.type && (
                      <div style={{ color: "red" }}>{errors.type}</div>
                    )}
                  </div>
                )}
                {values.type === incomeTypeID.tithe ? (
                  <section className="field-line">
                    <label htmlFor="tithingName">Diezmante</label>
                    <FastField
                      name="memberID"
                      id="tithingName"
                      component={(props: any) => (
                        <SelectOptions {...props} table={"people"} />
                      )}
                    />
                    {errors.memberID && touched.memberID && (
                      <div style={{ color: "red" }}>{errors.memberID}</div>
                    )}
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
                        className="field"
                        type="text"
                        name="eventName"
                        placeholder="Congreso Estruendo"
                      />
                      {errors.eventName && touched.eventName && (
                        <div style={{ color: "red" }}>{errors.eventName}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="ministry-name">Ministerio</label>
                      <FastField
                        id="ministry-name"
                        type="text"
                        name="ministryID"
                        component={(props: any) => (
                          <SelectOptions {...props} table={"ministries"} />
                        )}
                      />
                      {errors.ministryID && touched.ministryID && (
                        <div style={{ color: "red" }}>
                          {errors.ministryID}
                        </div>
                      )}
                    </div>
                  </section>
                ) : values.type === incomeTypeID.loan || isLoanVersion ? (
                  <section className="field-line fields-container">
                    <div>
                      <label htmlFor="loanName">Nombre</label>
                      <Field
                        id="loanName"
                        className="field"
                        type="text"
                        name="loanName"
                      />
                      {errors.loanName && touched.loanName && (
                        <div style={{ color: "red" }}>{errors.eventName}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="memberID">Acreedor</label>
                      <FastField
                        type="number"
                        name="memberID"
                        component={(props: any) => (
                          <SelectOptions {...props} table={"people"} />
                        )}
                      />
                      {errors.memberID && touched.memberID && (
                        <div style={{ color: "red" }}>{errors.memberID}</div>
                      )}
                    </div>
                  </section>
                ) : null}

                <div className="fields-container field-line">
                  <div>
                    <label>Fecha</label>
                    <Field name="date" type="date" className="field" />
                    {errors.date && touched.date && (
                      <div style={{ color: "red" }}>{errors.date}</div>
                    )}
                  </div>
                  <div>
                    <label>Monto</label>
                    <Field className="field" name="amount" type="number" />
                    {errors.amount && touched.amount && (
                      <div style={{ color: "red" }}>{errors.amount}</div>
                    )}
                  </div>
                </div>

                <div className="field-line field-comment">
                  <label htmlFor="comment">
                    {values.type === incomeTypeID.loan
                      ? "Descripción"
                      : "Comentario"}
                  </label>
                  <FastField
                    className="comment"
                    name="comment"
                    component={Textarea}
                  />
                </div>
              </CModalBody>
              <CModalFooter>
                {!income && values.type === incomeTypeID.tithe ? (
                  <div className="toggle">
                    <SwitchButton on={on} onClick={() => setOn(!on)} />
                    <label>Mantener selección</label>
                  </div>
                ) : null}
                <div className="buttons-container">
                  <CButton color="secondary"
                    size="sm"
                    onClick={() => {
                      setOn(false);
                      onClose();
                      initialIncome.type = null;
                    }}
                  >
                    {income ? "Cancelar" : "Cerrar"}
                  </CButton>
                  <CButton color="warning" type="submit" size="sm" className="ms-2">
                    {income ? "Actualizar" : "Guardar"}
                  </CButton>
                </div>
              </CModalFooter>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </CModal>
  );
};

const Wrapper = styled.div`
    label {
      color: #000000;
    font-family: Poppins;
    font-weight: 400;
    font-size: 18px;
  }
    
    .selectIncomeType {
      display: grid;
    grid-template-columns: 90px 1fr;
    align-items: center;
  }

    .incomeTypeLabel-container {
      display: flex;
    align-items: center;
  }

    input,
    .comment {
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
    .field-comment {
      display: flex;
    flex-direction: column;
    .comment {
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
    .toggle {
    grid-area: left;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    gap: 10px;
  }

  .buttons-container {
    display: flex;
    height: 40px;
    justify-content: end;
  }
  `

export default IncomesModal;
