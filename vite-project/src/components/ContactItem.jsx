import { useContext } from "react";
import { languageContext } from "../context";

function ContactItem({ contact, onDelete }) {
  const { t } = useContext(languageContext);
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
