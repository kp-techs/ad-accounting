import { FC } from "react";
import styled from "styled-components";
import SelectOptions from "../../../components/selectOptions";
import { FastField, Field, Form, Formik } from "formik";
import { GrFormClose } from "react-icons/gr";
import { loansInitialFilterValues } from "../constant";

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
						setFilters(loansInitialFilterValues);
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
										<label className="title">LOAN</label>
									</div>

									<div className="fields-container double-field">
										<div className="field-container">
											<label htmlFor="loanName" className="text">Name</label>
											<div className="select">
												<FastField
													name="loanName"
													component={(props: any) => (
														<SelectOptions {...props} table={"incomes"} isCreatable={false} isMulti={true} isLoanIncome={true} />
													)}
												/>
											</div>
										</div>

										<div className="field-container">
											<label htmlFor="memberID" className="text">Creditor</label>
											<div className="select">
												<FastField
													name="memberID"
													component={(props: any) => (
														<SelectOptions {...props} table={"people"} isCreatable={false} isMulti={true} />
													)}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Date</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
											<label className="text">Since</label>
											<Field title="Date inicial" name="startDate" type="date" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Until</label>
											<Field title="Date final" name="endDate" type="date" className="field" />
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Initial Amount</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container double-field">
											<label className="text">Since</label>
											<Field name="startInitialAmount" type="number" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Until</label>
											<Field
												name="endInitialAmount"
												type="number"
												className="field"
												value={values.endInitialAmount || null}
											/>
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Current Amount</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
											<label className="text">Since</label>
											<Field name="startCurrentAmount" type="number" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Until</label>
											<Field
												name="endCurrentAmount"
												type="number"
												className="field"
												value={values.endCurrentAmount || null}
											/>
										</div>
									</div>
								</div>

								<div className="slide-container">
									<div className="field-title">
										<label className="title">Paid Amount</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
											<label className="text">Since</label>
											<Field name="startPaidAmount" type="number" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Until</label>
											<Field
												name="endPaidAmount"
												type="number"
												className="field"
												value={values.endPaidAmount || null}
											/>
										</div>
									</div>
								</div>

							</section>
							<div className="buttons-container">
								<button type="submit">Apply</button>
								<button type="reset">Clean</button>
							</div>
							<div className="separation-line" />
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
