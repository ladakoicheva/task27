import { useContext } from "react";
import { LanguageContext } from "../context1.js";

function ContactItem({ contact, onDelete }) {
  const { t } = useContext(LanguageContext);
  return (
    <tr>
      <th scope="row" data-label="id">
        {contact.id}
      </th>
      <td data-label={t("name")}>{contact.name}</td>
      <td data-label={t("phone")}>{contact.phone}</td>
      <td data-label={t("actions")}>
        <button className="delete-btn" onClick={() => onDelete?.(contact.id)}>
          {t("delete")}
        </button>
      </td>
    </tr>
  );
}

export default ContactItem;
