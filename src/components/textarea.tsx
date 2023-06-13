import { FieldProps } from "formik";
import { useId } from "react";

type Props = FieldProps<any> & {
  rows: number;
  className?: string;
  id: string;
};

function Textarea({ field, rows = 5, className }: Props) {
  const postTextAreaId = useId();
  return (
    <textarea
      id={postTextAreaId}
      className={className}
      rows={rows}
      {...field}
    ></textarea>
  );
}

export default Textarea;
