import { FC } from "react";
import styled from "styled-components";
import SelectOptions from "../../../components/selectOptions";
import { FastField, Field, Form, Formik } from "formik";
import { GrFormClose } from "react-icons/gr";
import { loansInitialValues } from "../constant";

type Props = {
	isActive: boolean;
	onClose: () => void;
	filters: LoansFilters;
	setFilters: (filters: LoansFilters) => void;
};

const FilterSection: FC<Props> = ({ isActive, filters, onClose, setFilters }) => {
	return (
		<Wrapper>
			{isActive ? (
				<Formik
					initialValues={filters}
					onReset={() => {
						setFilters(loansInitialValues);
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
										<label className="title">Préstamo</label>
									</div>

									<div className="fields-container double-field">
										<div className="field-container">
											<label htmlFor="name" className="text">Nombre</label>
											<div className="select">
											<FastField
												name="name"
												component={(props: any) => (
													<SelectOptions {...props} table={"loans"} isCreatable={false} />
												)}
												/>
											</div>
                    </div>
                    
                    <div className="field-container">
											<label htmlFor="creditorID" className="text">Acreedor</label>
											<div className="select">											
											<FastField
												name="creditorID"
												component={(props: any) => (
													<SelectOptions {...props} table={"people"} isCreatable={false} />
												)}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Fecha</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
											<label className="text">Desde</label>
											<Field title="Fecha inicial" name="startDate" type="date" className="field" />
										</div>
										<div className="field-container">
										<label className="text">Hasta</label>
											<Field title="Fecha final" name="endDate" type="date" className="field" />
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Monto Inicial</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container double-field">
										<label className="text">Desde</label>
											<Field name="startAmount_initialAmount" type="number" className="field" />
										</div>
										<div className="field-container">
										<label className="text">Hasta</label>
											<Field
												name="endAmount_initialAmount"
												type="number"
												className="field"
												value={values.endAmount_initialAmount || null}
											/>
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Monto Adeudado</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
										<label className="text">Desde</label>
											<Field name="startAmount_currentAmount" type="number" className="field" />
										</div>
										<div className="field-container">
										<label className="text">Hasta</label>
											<Field
												name="endAmount_currentAmount"
												type="number"
												className="field"
												value={values.endAmount_currentAmount || null}
											/>
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Monto Pagado</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
										<label className="text">Desde</label>
											<Field name="startAmount_paidAmount" type="number" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Hasta</label>
											<Field
												name="endAmount_paidAmount"
												type="number"
												className="field"
												value={values.endAmount_paidAmount || null}
											/>
										</div>
									</div>
								</div>

							</section>
							<div className="buttons-container">
								<button type="submit">Aplicar</button>
								<button type="reset">Limpiar</button>
							</div>
							<div className="separation-line"/>
						</Form>
					)}
				</Formik>
			) : null}
		</Wrapper>
	);
};

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
			margin-bottom: 5px;
		}
	}

	.slide-container {
		box-sizing: border-box;
		display: grid;
		width: 100%;
		grid-template-rows: auto 1fr;
	}

	.double-field {
		display: flex;
		flex-direction: column;
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
	.field-container{
		display: flex;
		flex-direction: column;
		.text {
			margin: 0;
			font-weight: normal;
			font-style: italic;
		}
	}

	.separation-line {
		border-bottom: 1px solid #0000004f;
		margin: 0;
		padding: 0;
	}
`;

export default FilterSection;
