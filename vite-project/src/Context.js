
import { createContext } from "react";

export const ThemeContext = createContext("light");


export const translations = {
  ua: {
    id: "id",
    contactsList: "Список контактів",
    addNewContact: "Додати контакт",
    addNewContactTitle: "Добавити новий контакт",
    changeToDark: "Темну",
    changeToLight: "Світлу",
    changeThemeTo: "Змінити на ",
    changeLangToEnglish: "Змінити мову на Англійську",
    changeLangToUkrainian: "Змінити мову на Українську",
    name: "Ім'я",
    email: "Email",
    phone: "Телефон",
    namePlaceholder: "Іван Петренко",
    emailPlaceholder: "ivan@example.com",
    phonePlaceholder: "050-123-45-67",
    cancel: "Відміна",
    save: "Зберегти",
    delete: "видалити",
    actions: "Дії",
    nameRequired: "Ім'я обов'язкове",
    nameInvalid: "Ім'я має містити лише літери (мінімум 2)",
    phoneRequired: "Телефон обов'язковий",
    phoneInvalid: "Телефон має бути у форматі 050-123-45-67",
    emailRequired: "Email обов'язковий",
    emailInvalid: "Невірний формат email",
  },
  en: {
    id: "id",
    contactsList: "Contacts List",
    addNewContact: "Add New Contact",
    addNewContactTitle: "Add new contact",
    changeToDark: "Dark",
    changeToLight: "Light",
    changeThemeTo: "Change to ",
    changeLangToEnglish: "Change language to English",
    changeLangToUkrainian: "Change language to Ukrainian",
    name: "Name",
    email: "Email",
    phone: "Phone",
    namePlaceholder: "Ivan Petrenko",
    emailPlaceholder: "ivan@example.com",
    phonePlaceholder: "050-123-45-67",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    actions: "Actions",
    nameRequired: "Name is required",
    nameInvalid: "Name should contain only letters (min 2)",
    phoneRequired: "Phone is required",
    phoneInvalid: "Phone must match 050-123-45-67",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
  },
};

export const languageContext = createContext({
  lang: "ua",
  t: (k) => k,
});
