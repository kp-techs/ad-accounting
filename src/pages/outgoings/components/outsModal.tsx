import styled from "styled-components";
import Modal from "react-modal";
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
import { customStyles } from "../../../utils/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outgoing?: TableOutgoing;
  isLoanVersion?: boolean;
  income?: TableIncome;
};

const OutsModal: FC<Props> = ({
  isOpen,
  onClose,
  outgoing,
  isLoanVersion = false,
  income
}) => {
  const { loadOuts, profile, loadLoans } = useAppData();
  const { supabase } = useSupabase();
  const filters = useMemo(() => ({ ...outgoingsInitialValues, loanID: income?.id }), [income])

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
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
                const status = current <= 0 ? "Paid Off" : "Outstanding";

                await supabase
                  .from("incomes")
                  .update({
                    paidAmount: paidAmount,
                    currentDebt: current,
                    status: status,
                  })
                  .eq("id", outgoing.loanID);
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
                    ? "Paid Off"
                    : "Outstanding";

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
              <section className="form-content">
                <div className="top-modal">
                  {isLoanVersion ? (
                    <div className="underline">
                      <label>
                        {outgoing
                          ? `MODIFY PAYMENT: ${outgoing.incomes.loanName}`
                          : "ADD NEW PAYMENT"}
                      </label>
                    </div>
                  ) : (
                    <div className="selectType-container selectOutgoingType underline">
                      <>
                        <div>
                          <label htmlFor="selectOutgoingType">Type</label>
                        </div>
                        <FastField
                          id="selectOutgoingType"
                          name="type"
                          component={(props: any) => (
                            <SelectOptions {...props} table={"outgoingTypes"} />
                          )}
                        />
                        <div></div>
                      </>
                      {errors.type && touched.type && (
                        <div style={{ color: "red" }}>{errors.type}</div>
                      )}
                    </div>
                  )}
                  {values.type === outgoingTypeID.loan ? (
                    outgoing ? null : (
                      <div className=" field-line">
                        <div>
                          <label>Name</label>
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
                      <label htmlFor="beneficiary">Beneficiary</label>
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
                      <label>Check Number</label>
                      <Field name="checkNumber" type="text" className="field" />
                      {errors.checkNumber && touched.checkNumber && (
                        <div style={{ color: "red" }}>{errors.checkNumber}</div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="description">Description</label>
                      <Field name="description" type="text" className="field" />
                    </div>
                  </div>

                  <div className="fields-container field-line">
                    <div>
                      <label>Date</label>
                      <Field name="date" type="date" className="field" />
                      {errors.date && touched.date && (
                        <div style={{ color: "red" }}>{errors.date}</div>
                      )}{" "}
                    </div>
                    <div>
                      <label>Amount</label>
                      <Field className="field" name="amount" type="number" />
                      {errors.amount && touched.amount && (
                        <div style={{ color: "red" }}>{errors.amount}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="foo-modal">
                  <div className="buttons-container">
                    <button
                      onClick={() => {
                        onClose();
                        initialOutgoing.type = null;
                      }}
                    >
                      {outgoing ? "Cancel" : "Close"}
                    </button>
                    <button type="submit">
                      {outgoing ? "Update" : "Save"}
                    </button>
                  </div>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Modal>
  );
};

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

export default OutsModal;
