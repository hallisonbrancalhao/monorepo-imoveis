interface FormInputProps {
  type: string;
  placeholder: string;
  register: any;
  errors: any;
  label: string;
}
export default function FormInput({
  type,
  placeholder,
  register,
  errors,
  label,
}: FormInputProps) {
  return (
    <div className="relative mt-10">
      <input
        {...register}
        id={label}
        type={type}
        name={label}
        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-cyan-600 focus:outline-none"
        placeholder={placeholder}
        autoComplete="off"
      />
      {errors?.endereco && (
        <p className="text-red-600 text-sm">{errors?.endereco?.message}</p>
      )}
      <label
        htmlFor={label}
        className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {placeholder}
      </label>
    </div>
  );
}
