import React, { useState } from "react";

const strengthLabels = ["debil", "segura", "fuerte"];

const PasswordStrength = ({name, placeholder, value, onChange }) => {
  const [strength, setStrength] = useState("");

  const getStrength = (password) => {
    let indicator = -1;

    if (/[a-z]/.test(password)) indicator++;
    if (/[A-Z]/.test(password)) indicator++;
    if (/\d/.test(password)) indicator++;
    if (/[^a-zA-Z0-9]/.test(password)) indicator++;

    if (password.length >= 16) indicator++;

    return strengthLabels[indicator];
  };

  const handleChange = (e) => {
    setStrength(getStrength(e.target.value));

    onChange(e.target.value);
  };
  return (
    <>
      <input
        type="password"
        name={name}
        value={value}
        spellCheck="false"
        className="control"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div className={`bars ${strength}`}>
        <div></div>
      </div>
      <div className="strength">
        {strength && `Contraseña ${strength}`}
      </div>
    </>
  );
};

export default PasswordStrength;
