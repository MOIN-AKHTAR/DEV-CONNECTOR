import React from "react";
import classnames from "classnames";

export default function SelectListGroup({
  error,
  name,
  value,
  onChange,
  info,
  options,
  type
}) {
  const selectOptions = options.map(option => (
    <option key={option.lable} value={option.value}>
      {option.lable}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
