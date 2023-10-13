import { FieldProps } from "formik";
import Select from "react-select";

function SelectOptions({ form, field }: FieldProps) {
   const options = [
      { value: 'incomes', label: 'INGRESOS' },
      { value: 'outgoings', label: 'EGRESOS' },
      { value: 'loans', label: 'PRESTAMOS' },
   ]

   return (
      <Select 
      isMulti
      onChange={(value) => {
         form.setFieldValue(
            field.name,
            value.map(({ value }) => value)
         );
      }}  
      value={options.filter((op) => field.value?.includes(op.value))} 
      options={options} 
      className="" 
      placeholder="Seleccionar..." 
      classNamePrefix="select" />
   )
}

export default SelectOptions;