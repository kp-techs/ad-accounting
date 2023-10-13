import { FC } from "react";
import styled from "styled-components";
import SelectOptions from "../../../components/selectOptions";
import { FastField, Field, Form, Formik } from "formik";
import { GrFormClose } from "react-icons/gr";
import { loansInitialFilterValues } from "../constant";
import { StyledFilterSection } from "../../../components/styledComponents";

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
										<label className="title">Préstamo</label>
									</div>

									<div className="fields-container double-field">
										<div className="field-container">
											<label htmlFor="loanName" className="text">Nombre</label>
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
											<label htmlFor="memberID" className="text">Acreedor</label>
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
											<Field name="startInitialAmount" type="number" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Hasta</label>
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
										<label className="title">Monto Adeudado</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
											<label className="text">Desde</label>
											<Field name="startCurrentAmount" type="number" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Hasta</label>
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
										<label className="title">Monto Pagado</label>
									</div>
									<div className="fields-container double-field">
										<div className="field-container">
											<label className="text">Desde</label>
											<Field name="startPaidAmount" type="number" className="field" />
										</div>
										<div className="field-container">
											<label className="text">Hasta</label>
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
								<button type="submit">Aplicar</button>
								<button type="reset">Limpiar</button>
							</div>
							<div className="separation-line" />
						</Form>
					)}
				</Formik>
			) : null}
		</Wrapper>
	);
};

const Wrapper = styled(StyledFilterSection)``;

export default FilterSection;
