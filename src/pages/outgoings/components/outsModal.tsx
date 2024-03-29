import styled from "styled-components";
import { TableIncome, TableOutgoing } from "../../../types/models";
import { FC, useMemo } from "react";
import useAppData from "../../../hooks/useAppData";
import { useSupabase } from "../../../hooks/useSupabase";
import {
  ValidationOutgoingForm,
  initialLoanVersion,
  initialOutgoing,
  outgoingTypeID,
  outgoingsInitialValues,
} from "../constants";
import { FastField, Field, Form, Formik } from "formik";
import moment from "moment";
import SelectOptions from "../../../components/selectOptions";
import { ValidationLoanPaymentForm } from "../../loans/constant";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outgoing?: TableOutgoing;
  income?: TableIncome;
  isLoanVersion?: boolean;
};

const OutsModal: FC<Props> = ({
  isOpen,
  onClose,
  outgoing,
  income,
  isLoanVersion = false,
}) => {
  const { supabase } = useSupabase();
  const { loadOuts, profile, loadLoans } = useAppData();
  const filters = useMemo(() => ({ ...outgoingsInitialValues, loanID: income?.id }), [income])
  
  return (
    <CModal size='lg' visible={isOpen} onClose={onClose}>
      <Wrapper>
        <Formik
          initialValues={
            outgoing ?? (isLoanVersion ? initialLoanVersion : initialOutgoing)
          }
          validationSchema={
            isLoanVersion ? ValidationLoanPaymentForm : ValidationOutgoingForm
          }
          onSubmit={async (values, { resetForm }) => {
            if (outgoing) {
              values.modifiedBy = profile?.name;

              values.modifiedAt = moment().format();

              // @ts-ignore
              delete values.people;

              // @ts-ignore
              delete values.outgoingTypes;

              if (values.type === outgoingTypeID.loan) {
                const x = (outgoing.amount || 0) - (values.amount || 0);
                const paidAmount = (outgoing.incomes.paidAmount || 0) - x;
                const current = (outgoing.incomes.amount || 0) - paidAmount;
                const status = current <= 0 ? "Saldado" : "Pendiente";

                await supabase
                  .from("incomes")
                  .update({
                    paidAmount: paidAmount,
                    currentDebt: current,
                    status: status,
                  })
                  .eq("id", outgoing.loanID || 0);
              }

              // @ts-ignore
              delete values.incomes

              await supabase
                .from("outgoings")
                .update({ ...values, id: outgoing.id })
                .eq("id", outgoing.id);
              onClose();
            } else {
              if (isLoanVersion) values.type = outgoingTypeID.loan;
              if (values.loanID) {
                const { data: income } = await supabase.from('incomes').select().eq('id', values.loanID).single();
                values.beneficiaryID = income?.memberID;
                const status =
                  (income?.currentDebt || 0) - (values.amount || 0) <= 0
                    ? "Saldado"
                    : "Pendiente";

                await supabase
                  .from("incomes")
                  .update({
                    paidAmount: (income?.paidAmount || 0) + (values.amount || 0),
                    currentDebt:
                      (income?.currentDebt || 0) - (values.amount || 0),
                    status: status,
                  })
                  .eq("id", values.loanID);
                loadLoans();
              }

              values.createdBy = profile?.name;
              await supabase.from("outgoings").insert([values as any]);
            }
            resetForm();
            if (isLoanVersion && income) {
              loadOuts(1, 5, filters);
              loadLoans();
            } else {
              loadOuts();
            }
          }}
        >
          {({ values, errors, touched }) => (
            <Form>
              <CModalHeader>
                <CModalTitle className="sm">{outgoing ? "ACTUALIZAR" : "AGREGAR"} {isLoanVersion ? `${(outgoing?.incomes.loanName || '').toUpperCase()}` : 'EGRESO'}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                {isLoanVersion ? null :
                  <div className=" field-line">
                    <div>
                      <label htmlFor="selectOutgoingType">Tipo</label>
                    </div>
                    <FastField
                      id="selectOutgoingType"
                      name="type"
                      component={(props: any) => (
                        <SelectOptions {...props} table={"outgoingTypes"} />
                      )}
                    />
                    {errors.type && touched.type && (
                      <div style={{ color: "red" }}>{errors.type}</div>
                    )}
                  </div>
                }
                {values.type === outgoingTypeID.loan ? (
                  outgoing ? null : (
                    <div className=" field-line">
                      <div>
                        <label>Nombre</label>
                        <FastField
                          name="loanID"
                          component={(props: any) => (
                            <SelectOptions
                              {...props}
                              table={"incomes"}
                              isCreatable={false}
                              isLoanOut={true}
                            />
                          )}
                        />
                      </div>
                    </div>
                  )
                ) : (
                  <section className="field-line">
                    <label htmlFor="beneficiary">Beneficiario</label>
                    <FastField
                      name="beneficiaryID"
                      id="beneficiary"
                      component={(props: any) => (
                        <SelectOptions {...props} table={"people"} />
                      )}
                    />
                    {errors.beneficiaryID && touched.beneficiaryID && (
                      <div style={{ color: "red" }}>
                        {errors.beneficiaryID}
                      </div>
                    )}
                  </section>
                )}

                <div className="fields-container field-line">
                  <div>
                    <label>No. Cheque</label>
                    <Field name="checkNumber" type="text" className="field" />
                    {errors.checkNumber && touched.checkNumber && (
                      <div style={{ color: "red" }}>{errors.checkNumber}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="description">Descripción</label>
                    <Field name="description" type="text" className="field" />
                  </div>
                </div>

                <div className="fields-container field-line">
                  <div>
                    <label>Fecha</label>
                    <Field name="date" type="date" className="field" />
                    {errors.date && touched.date && (
                      <div style={{ color: "red" }}>{errors.date}</div>
                    )}{" "}
                  </div>
                  <div>
                    <label>Monto</label>
                    <Field className="field" name="amount" type="number" />
                    {errors.amount && touched.amount && (
                      <div style={{ color: "red" }}>{errors.amount}</div>
                    )}
                  </div>
                </div>
              </CModalBody>

              <CModalFooter>
                <div className="buttons-container">
                  <CButton color="secondary"
                  className="cancel"
                    size="sm"
                    onClick={() => {
                      onClose();
                      initialOutgoing.type = null;
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

const Wrapper = styled.section`
  label {
    color: #000000;
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
    height: 40px;
    justify-content: end;
  }

  .cancel {
    padding: 0 12px;
  }

  @media only screen and (max-width:700px) { 
    label {
      font-size: 15px;
    }
    .sm {
      font-size: 17px;
    }
  }
`;

export default OutsModal;
