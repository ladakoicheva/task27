import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactForm.css";
import { languageContext } from "../../context";

function ContactForm({ onSave, onCancel }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({ name: "", phone: "", email: "" });

  const { t } = useContext(languageContext);

  const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ' -]{2,}$/u;
  const phoneRegex = /^\d{3}-\d{3}-\d{2}-\d{2}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (!value) return t("nameRequired");
        if (!nameRegex.test(value)) return t("nameInvalid");
        return "";
      case "phone":
        if (!value) return t("phoneRequired");
        if (!phoneRegex.test(value)) return t("phoneInvalid");
        return "";
      case "email":
        if (!value) return t("emailRequired");
        if (!emailRegex.test(value)) return t("emailInvalid");
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "email") setEmail(value);

    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", name),
      phone: validateField("phone", phone),
      email: validateField("email", email),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((v) => v !== "");
    if (hasError) {
      console.warn("Форма містить помилки", newErrors);
      return;
    }

    onSave({ id: Date.now(), name, phone, email });

    setName("");
    setPhone("");
    setEmail("");
    setErrors({ name: "", phone: "", email: "" });
    // Перейти на страницу списка контактов после успешного сохранения
    try {
      navigate("/list");
    } catch (err) {
      // если navigate недоступен — игнорируем
    }
  };

  const isFormValid =
    !Object.values(errors).some((v) => v) && name && phone && email;

  return (
    <div className="contact-form-container">
      <h2 className="contact-form-title">{t("addNewContactTitle")}</h2>
      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            {t("name")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`form-input ${errors.name ? "input-error" : ""}`}
            placeholder={t("namePlaceholder")}
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {errors.name && (
            <div id="name-error" className="error-text">
              {errors.name}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`form-input ${errors.email ? "input-error" : ""}`}
            placeholder={t("emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <div id="email-error" className="error-text">
              {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            {t("phone")}
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`form-input ${errors.phone ? "input-error" : ""}`}
            placeholder={t("phonePlaceholder")}
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
          />
          {errors.phone && (
            <div id="phone-error" className="error-text">
              {errors.phone}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => {
              if (typeof onCancel === "function") return onCancel();
              try {
                navigate("/list");
              } catch (err) {
                /* ignore */
              }
            }}
            className="btn btn-secondary"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid}
          >
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
