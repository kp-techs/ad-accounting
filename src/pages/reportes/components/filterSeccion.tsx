import styled from "styled-components";
import { StyledCard, StyledFilterSection } from "../../../components/styledDiv";
import { FastField, Field, Form, Formik } from "formik";
import { initialValues } from "../constant";
import SelectOptions from "./selectOptions";


type Props = {
   filters: ReporteFilters;
   setFilters: (filters: ReporteFilters) => void;

};

function FilterSeccion({ filters, setFilters }: Props) {
   return (
      <Wrapper>
         <StyledFilterSection>
            <Formik initialValues={filters} onReset={() => {
               setFilters(initialValues)
            }} onSubmit={setFilters}>
               {({ values }) => (
                  <Form>
                        <h2>GENERAR REPORTES</h2>
                     <section className="container">

                        <div className="slide-container">
                           <div className="field-title">
                              <label className="title">Tabla</label>
                           </div>

                           <div className="fields-container double-field">
                              <div className="field-container">
                                 <div className="select">
                                    <FastField
                                       name="tables"
                                       component={(props: any) => (
                                          <SelectOptions {...props} />
                                       )}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="slide-container">
                           <div className="field-title">
                              <label htmlFor="startDate">Fecha inicial</label>
                           </div>
                              <Field title="Fecha inicial" name="startDate" type="date" className="field" />
                           </div>

                        <div className="slide-container">
                           <div className="field-title">
                              <label htmlFor="startDate">Fecha final</label>
                           </div>
                              <Field title="Fecha final" name="endDate" type="date" className="field" />
                        </div>

                     </section>
                     <div className="buttons-container">
                        <button type="submit">Aplicar</button>
                        <button type="reset">Limpiar</button>
                     </div>
                  </Form>
               )}
            </Formik>

         </StyledFilterSection>
      </Wrapper>
   )
}

const Wrapper = styled(StyledCard)`

`

export default FilterSeccion;