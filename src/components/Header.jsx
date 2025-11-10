function Header({ title, language, onLanguageToggle }) {
  const coffeeText = language === "fr" ? "Café" : "Coffee";

  return (
    <div className="header-container">
      <h1>{title}</h1>
      <div className="header-actions">
        {/* <a
          href="https://ko-fi.com/votrecompte"
          target="_blank"
          rel="noopener noreferrer"
          className="coffee-button-header"
        >
          ☕ {coffeeText}
        </a> */}
        <div className="language-selector">
          <button className="language-button" onClick={onLanguageToggle}>
            {language === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
