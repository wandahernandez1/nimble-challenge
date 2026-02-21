import "./Spinner.css";

export function Spinner({ size = "md", label = "Cargando..." }) {
  return (
    <span
      className={`spinner spinner--${size}`}
      role="status"
      aria-label={label}
    >
      <span className="spinner__ring" />
    </span>
  );
}
