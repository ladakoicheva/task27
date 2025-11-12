import { useContext } from "react";
import ContactItem from "./ContactItem";
import { languageContext } from "../context";

export default function ContactsTable({ contacts, onDelete }) {
  const { t } = useContext(languageContext);
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">{t("id")}</th>
          <th scope="col">{t("name")}</th>
          <th scope="col">{t("phone")}</th>
          <th scope="col">{t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
