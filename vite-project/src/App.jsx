import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactsTable from "./components/ContactsTable";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeContext, languageContext, translations } from "./сontext";

function App() {
  const [contacts, setContacts] = useState([]);

  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("ua");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const toggleLang = () => {
    setLang((prevLang) => (prevLang === "ua" ? "en" : "ua"));
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const url = `${import.meta.env.BASE_URL}contacts.json`;
        const response = await fetch(url);
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Не вдалося завантажити контакти:", error);
      }
    };
    fetchContacts();
  }, []);

  const handleSaveContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const t = (key) => translations[lang]?.[key] ?? key;

  const basename = import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL.replace(/\/$/, "")
    : undefined;

  return (
    <BrowserRouter basename={basename}>
      <languageContext.Provider value={{ lang, t }}>
        <ThemeContext.Provider value={theme}>
          <div className="App">
            <nav style={{ marginBottom: "20px" }}>
              <Link to="/list" style={{ marginRight: "10px" }}>
                {t("contactsList")}
              </Link>
              <Link to="/form">{t("addNewContact")}</Link>
            </nav>

            <Routes>
              <Route
                path="/form"
                element={<ContactForm onSave={handleSaveContact} />}
              />

              <Route
                path="/list"
                element={
                  <ContactsTable
                    contacts={contacts}
                    onDelete={handleDeleteContact}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <ContactsTable
                    contacts={contacts}
                    onDelete={handleDeleteContact}
                  />
                }
              />
            </Routes>
          </div>
          <button onClick={toggleTheme} style={{ float: "right" }}>
            {t("changeThemeTo")}
            {theme === "light" ? t("changeToDark") : t("changeToLight")}
          </button>
          <button onClick={toggleLang} style={{ float: "left" }}>
            {lang === "ua"
              ? t("changeLangToEnglish")
              : t("changeLangToUkrainian")}
          </button>
        </ThemeContext.Provider>
      </languageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
