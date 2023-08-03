import Modal from "react-modal";
import styled from "styled-components";
import { FC, useState } from "react";
import { Formik, Field, Form, FastField } from "formik";
import SwitchButton from "../../../components/switchButton";
import { useSupabase } from "../../../hooks/useSupabase";
import { Income } from "../../../types/models";
import useAppData from "../../../hooks/useAppData";
import SelectOptions from "../../../components/selectOptions";

import { initialIncome, customStyles, incomeTypeID, ValidationIncomeForm } from "../constants";
import Textarea from "../../../components/textarea";
import moment from "moment";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	income?: Income;
};

const IncomesModal: FC<Props> = ({ isOpen, onClose, income }) => {
	const { loadIncomes, profile } = useAppData();
	const [on, setOn] = useState(false);
	const { supabase } = useSupabase();

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
					validationSchema={ValidationIncomeForm}
					initialValues={income ?? initialIncome}
					onSubmit={async (values, { resetForm }) => {
						if (income) {
							values.updatedBy = profile?.name;
							values.updatedDate = moment().format();
							if (income.type === incomeTypeID.loan) {
								await supabase
									.from("loans")
									.update({
										name: values.loanName,
										creditorID: values.tithingID,
										initialLoanAmount: values.amount,
										createdBy: profile?.name,
										createdAt: moment().format(),
										description: values.comment,
										date: values.date
									})
									.eq("name", income.loanName)
								
							}
							// @ts-ignore
							delete values.incomeTypes;
							// @ts-ignore
							delete values.ministries;
							// @ts-ignore
							delete values.people;
							await supabase
								.from("incomes")
								.update({ ...values, id: income.id })
								.eq("id", income.id);
							onClose();
						} else {
							values.createdBy = profile?.name;
							await supabase
								.from("incomes")
								.insert([values as any])
								
							if (values.type === incomeTypeID.loan) {
								await supabase
									.from("loans")
									.insert([
										{
											name: values.loanName,
											creditorID: values.tithingID,
											initialLoanAmount: values.amount,
											currentLoanAmount: values.amount,
											createdBy: profile?.name,
											createdAt: moment().format(),
											description: values.comment,
											date: values.date
										}
									])
									
							}
						}
						if (on) {
							initialIncome.date = values.date;
							initialIncome.type = incomeTypeID.tithe;
						} else {
							initialIncome.date = '';
							initialIncome.type = null;
						}
						resetForm();
						loadIncomes();
					}}
				>
					{({ values, errors, touched }) => (
						<Form>
							<section className="form-content">
								<div className="top-modal">
									<div className="selectType-container selectIncomeType">
										<div>
											<label htmlFor="selectIncomeType">Concepto</label>
										</div>
										<FastField
											id="selectIncomeType"
											name="type"
											component={(props: any) => <SelectOptions {...props} table={"incomeTypes"} />}
										/>
										<div></div>
										{errors.type && touched.type && <div style={{ color: "red" }}>{errors.type}</div>}
									</div>
									{values.type === incomeTypeID.tithe ? (
										<section className="field-line">
											<label htmlFor="tithingName">Diezmante</label>
											<FastField
												name="tithingID"
												id="tithingName"
												component={(props: any) => <SelectOptions {...props} table={"people"} />}
											/>
											{errors.tithingID && touched.tithingID && (
												<div style={{ color: "red" }}>{errors.tithingID}</div>
											)}
										</section>
									) : values.type === incomeTypeID.event ? (
										<section id="typeEventFields-container" className="fields-container field-line">
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
													component={(props: any) => <SelectOptions {...props} table={"ministries"} />}
												/>
												{errors.ministryID && touched.ministryID && (
													<div style={{ color: "red" }}>{errors.ministryID}</div>
												)}
											</div>
										</section>
									) : values.type === incomeTypeID.loan ? (
										<section className="field-line fields-container">
											<div>
												<label htmlFor="loan-name">Nombre</label>
												<Field id="loan-name" className="field" type="text" name="loanName" />
												{errors.loanName && touched.loanName && (
													<div style={{ color: "red" }}>{errors.eventName}</div>
												)}
											</div>
											<div>
												<label htmlFor="tithingID">Acreedor</label>
												<FastField
													type="number"
													name="tithingID"
													component={(props: any) => <SelectOptions {...props} table={"people"} />}
												/>
												{errors.tithingID && touched.tithingID && (
													<div style={{ color: "red" }}>{errors.tithingID}</div>
												)}
											</div>
										</section>
									) : null}

									<div className="fields-container field-line">
										<div>
											<label>Fecha</label>
											<Field name="date" type="date" className="field" />
											{errors.date && touched.date && <div style={{ color: "red" }}>{errors.date}</div>}
										</div>
										<div>
											<label>Monto</label>
											<Field className="field" name="amount" type="number" />
											{errors.amount && touched.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
										</div>
									</div>

									<div className="field-line field-comment">
										<label htmlFor="comment">
											{values.type === incomeTypeID.loan ? "Descripción" : "Comentario"}
										</label>
										<FastField className="comment" name="comment" component={Textarea} />
									</div>
								</div>

								<div className="foo-modal">
									{!income && values.type === incomeTypeID.tithe ? (
										<div className="toggle">
											<SwitchButton on={on} onClick={() => setOn(!on)} />
											<label>Mantener selección</label>
										</div>
									) : null}
									<div className="buttons-container">
										<button
											onClick={() => {
												setOn(false);
												onClose();
												initialIncome.type = null;
											}}
										>
											{income ? "Cancelar" : "Cerrar"}
										</button>
										<button type="submit">{income ? "Actualizar" : "Guardar"}</button>
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

const Wrapper = styled.div`
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
	.toggle {
		grid-area: left;
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		gap: 10px;
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

export default IncomesModal;
