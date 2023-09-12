import { FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "react-Datepicker/dist/react-Datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

type Props = FieldProps<any>;

function PickDate({ form, field }: Props) {
  return (
    <DatePicker
      showTimeSelect
      selected={field.value}
      onChange={(value) => {
        form.setFieldValue(field.name, value);
      }}
    />
  );
}

export default PickDate;
