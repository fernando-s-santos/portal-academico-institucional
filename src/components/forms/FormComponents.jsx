import {
  INPUT_CLASS,
  INPUT_READONLY_CLASS,
} from "./formStyles";

export function FormField({
  label,
  children,
  colSpan2 = false,
}) {
  return (
    <div className={colSpan2 ? "md:col-span-2" : ""}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>

      {children}
    </div>
  );
}

export function FormInput({
  label,
  colSpan2 = false,
  ...props
}) {
  return (
    <FormField label={label} colSpan2={colSpan2}>
      <input className={INPUT_CLASS} {...props} />
    </FormField>
  );
}

export function FormSelect({
  label,
  options = [],
  colSpan2 = false,
  ...props
}) {
  return (
    <FormField label={label} colSpan2={colSpan2}>
      <select className={INPUT_CLASS} {...props}>
        {options.map((option) => {
          const value =
            typeof option === "object"
              ? option.value
              : option;

          const optionLabel =
            typeof option === "object"
              ? option.label
              : option;

          return (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </FormField>
  );
}

export function FormReadOnly({
  label,
  value,
  colSpan2 = false,
}) {
  return (
    <FormField label={label} colSpan2={colSpan2}>
      <input
        type="text"
        value={value}
        readOnly
        className={INPUT_READONLY_CLASS}
      />
    </FormField>
  );
}

export function FormTextarea({
  label,
  rows = 4,
  colSpan2 = false,
  ...props
}) {
  return (
    <FormField label={label} colSpan2={colSpan2}>
      <textarea
        rows={rows}
        className={`${INPUT_CLASS} resize-none`}
        {...props}
      />
    </FormField>
  );
}

export function SectionDivider({ title }) {
  return (
    <div className="md:col-span-2 border-t border-gray-200 pt-6">
      <h3 className="text-lg font-bold text-gray-800">
        {title}
      </h3>
    </div>
  );
}