import { ErrorMessage, useField } from "formik";

const TextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-2">
      {label ? <label htmlFor={field.name}>{label}</label> : <></>}
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error text-danger position-absolute"
      />
    </div>
  );
};

export default TextField;
