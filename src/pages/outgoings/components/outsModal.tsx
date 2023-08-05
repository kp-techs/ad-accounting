import styled from "styled-components";
import Modal from "react-modal";
import { Outgoing } from "../../../types/models";
import { FC } from "react";
import useAppData from "../../../hooks/useAppData";
import { useSupabase } from "../../../hooks/useSupabase";
import {
	ValidationOutgoingForm,
	customStyles,
	initialLoanVersion,
	initialOutgoing,
	outgoingTypeID
} from "../constants";
import { FastField, Field, Form, Formik } from "formik";
import moment from "moment";
import SelectOptions from "../../../components/selectOptions";
import Textarea from "../../../components/textarea";
import { ValidationLoanPaymentForm } from "../../loans/constant";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	outgoing?: Outgoing;
	isLoanVersion?: boolean;
};

const OutsModal: FC<Props> = ({ isOpen, onClose, outgoing, isLoanVersion = false }) => {
	const { loans, loadOuts, profile, loadLoans } = useAppData();
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
					initialValues={outgoing ?? (isLoanVersion ? initialLoanVersion : initialOutgoing)}
					validationSchema={isLoanVersion ? ValidationLoanPaymentForm : ValidationOutgoingForm}
					onSubmit={async (values, { resetForm }) => {
						if (outgoing) {
							values.modifiedBy = profile?.name;
							values.modifiedAt = moment().format();
							// @ts-ignore
							delete values.people;
							// @ts-ignore
							delete values.outgoingTypes;
							await supabase
								.from("outgoings")
								.update({ ...values, id: outgoing.id })
								.eq("id", outgoing.id);
							onClose();
						} else {
							if (values.loanID) {
								const { data: loan } = await supabase.from("loans").select().eq("id", values.loanID).single();
								values.beneficiaryID = loan?.creditorID;
								let status = "Pendiente";
								if ((loan?.currentLoanAmount || 0) - (values.amount || 0) <= 0) status = "Saldado";
								await supabase
									.from("loans")
									.update({
										paidAmount: (loan?.paidAmount || 0) + (values.amount || 0),
										currentLoanAmount: (loan?.currentLoanAmount || 0) - (values.amount || 0),
										updateAt: moment().format(),
										updateBy: profile?.name,
										status: status
									})
									.eq("id", values.loanID);
								loadLoans();
							}

							values.createdBy = profile?.name;
							await supabase.from("outgoings").insert([values as any]);
						}
						resetForm();
						loadOuts();
					}}
				>
					{({ values, errors, touched }) => (
						<Form>
							<section className="form-content">
								<div className="top-modal">
									{isLoanVersion ? (
										<div className="underline">
											<label>AGREGAR PAGO</label>
										</div>
									) : (
										<div className="selectType-container selectOutgoingType underline">
											<>
												<div>
													<label htmlFor="selectOutgoingType">Tipo</label>
												</div>
												<FastField
													id="selectOutgoingType"
													name="type"
													component={(props: any) => <SelectOptions {...props} table={"outgoingTypes"} />}
												/>
												<div></div>
											</>
											{errors.type && touched.type && <div style={{ color: "red" }}>{errors.type}</div>}
										</div>
									)}
									{values.type === outgoingTypeID.loan ? (
										<div className=" field-line">
											<div>
												<label>Nombre</label>
												<FastField
													name="loanID"
													component={(props: any) => (
														<SelectOptions {...props} table={"loans"} isCreatable={false} isLoan={true} />
													)}
												/>
											</div>
										</div>
									) : (
										<section className="field-line">
											<label htmlFor="beneficiary">Beneficiario</label>
											<FastField
												name="beneficiaryID"
												id="beneficiary"
												component={(props: any) => <SelectOptions {...props} table={"people"} />}
											/>
											{errors.beneficiaryID && touched.beneficiaryID && (
												<div style={{ color: "red" }}>{errors.beneficiaryID}</div>
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
											{errors.date && touched.date && <div style={{ color: "red" }}>{errors.date}</div>}{" "}
										</div>
										<div>
											<label>Monto</label>
											<Field className="field" name="amount" type="number" />
											{errors.amount && touched.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
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
											{outgoing ? "Cancelar" : "Cerrar"}
										</button>
										<button type="submit">{outgoing ? "Actualizar" : "Guardar"}</button>
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
