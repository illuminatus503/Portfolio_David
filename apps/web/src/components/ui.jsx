import { forwardRef } from "react";

export const Section = ({ title, subtitle, children, actions }) => (
  <section className="section">
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
    {children}
  </section>
);

export const Card = ({ className = "", children }) => (
  <article className={`card ${className}`.trim()}>{children}</article>
);

export const Button = ({ variant = "primary", className = "", ...props }) => (
  <button className={`button ${variant} ${className}`.trim()} {...props} />
);

export const Input = forwardRef(({ label, ...props }, ref) => (
  <label className="field">
    <span>{label}</span>
    <input ref={ref} {...props} />
  </label>
));

export const Textarea = forwardRef(({ label, ...props }, ref) => (
  <label className="field">
    <span>{label}</span>
    <textarea ref={ref} {...props} />
  </label>
));

export const Badge = ({ children }) => <span className="badge">{children}</span>;

export const Banner = ({ tone = "info", children }) => (
  <div className={`banner ${tone}`}>{children}</div>
);

export const FieldError = ({ message }) =>
  message ? <span className="field-error">{message}</span> : null;
