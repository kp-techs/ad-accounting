import styled from "styled-components";
import Modal from "react-modal";
import { Outgoing } from "../../../types/models";
import { FC } from "react";
import useAppData from "../../../hooks/useAppData";
import { useSupabase } from "../../../hooks/useSupabase";
import { customStyles, initialOutgoing, outgoingTypeID } from "../constants";
import { FastField, Field, Form, Formik } from "formik";
import moment from "moment";
import SelectOptions from "../../../components/selectOptions";
import Textarea from "../../../components/textarea";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	outgoing?: Outgoing;
};

const OutsModal: FC<Props> = ({ isOpen, onClose, outgoing }) => {
	const { loadOuts, profile } = useAppData();
	const { supabase } = useSupabase();

	return (
		<Modal
			ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={onClose}
			style={customStyles}
			contentLabel="Formulario para registrar los egresos"
		>
			<Wrapper>
				<Formik
					initialValues={outgoing ?? initialOutgoing}
					onSubmit={async (values, { resetForm }) => {
						if (outgoing) {
							values.modifiedBy = profile?.name;
							values.modifiedAt = moment().format();
							//revisar porque en la version de Income se eliminan valores y si es necesario aqui tambien
							await supabase
								.from("outgoings")
								.update({ ...values, id: outgoing.id })
								.eq("id", outgoing.id);
							onClose();
						} else {
							values.createdBy = profile?.name;
							await supabase
								.from("outgoings")
								.insert([values as any])
								.single();
						}
						resetForm();
						loadOuts();
					}}
				>
					{({ values }) => (
						<Form>
							<section className="form-content">
								<div className="top-modal">
									<div className="selectType-container selectOutgoingType">
										<div>
											<label htmlFor="selectOutgoingType">Tipo</label>
										</div>
										<FastField
											id="selectOutgoingType"
											name="type"
											component={(props: any) => <SelectOptions {...props} table={"outgoingTypes"} />}
										/>
                    {/* PONER AQUI INFORMACION DEL ERROR */}
                    
									</div>
									{values.type === outgoingTypeID.loan ? (
										<section className="field-line">
											<label htmlFor="creditor">Acreedor</label>
											<FastField
												name="creditorID"
												id="creditor"
												component={(props: any) => <SelectOptions {...props} table={"creditors"} />}
                      />
                      	beneficiaryID: null,

                    </section>
            				// PONER AQUI INFORMACION DEL ERROR 
                  ) : null}

                  <div className="fields-container field-line">
                    <div>
                      <label>No. Cheque</label>
                      <Field name="checkNumber" type="text" className="field" />
                      // PONER AQUI INFORMACION DEL ERROR 
                    </div>
                    <div>
                      <label>Beneficiario</label>
                      <FastField
                        name="beneficiaryID"
                        type='text'
												id="beneficiary"
												component={(props: any) => <SelectOptions {...props} table={"beneficiaries"} />}
                      />
                      // PONER AQUI INFORMACION DEL ERROR
                    </div>
                  </div>
                  
                  <div className="fields-container field-line">
                    <div>
                      <label>Fecha</label>
                      <Field name="date" type="date" className="field" />
                      // PONER AQUI INFORMACION DEL ERROR 
                    </div>
                    <div>
                      <label>Monto</label>
                      <Field className="field" name="amount" type="number" />
                      // PONER AQUI INFORMACION DEL ERROR 
                    </div>
                  </div>

                  <div className="field-line field-description">
                    <label htmlFor="description">Descripción</label>
                    <FastField
                      id="description"
                      className="description"
                      name="description"
                      component={Textarea}
                    />
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
                      {outgoing ? "Cancelar" : "Cerrar"}
                    </button>
                    <button type="submit">
                      {outgoing ? "Actualizar" : "Guardar"}
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