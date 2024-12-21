import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer = () => {
  const { changeLanguage, translations, language } = useLanguage();

  return (
    <footer className="footer">
      <p>{translations[language].footer}</p>
      <div className="language-buttons">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('de')}>Deutsch</button>
        <button onClick={() => changeLanguage('mk')}>Македонски</button>
      </div>
    </footer>
  );
};

export default Footer;