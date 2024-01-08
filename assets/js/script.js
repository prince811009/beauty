 // Function to fetch language data
 async function fetchLanguageData(lang) {
  const response = await fetch(`languages/${lang}.json`);
  return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
  localStorage.setItem('language', lang);
  location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = langData[key];
  });
}

// Function to change language
async function changeLanguage(lang) {
  await setLanguagePreference(lang);
  
  const langData = await fetchLanguageData(lang);
  updateContent(langData);

  //
  toggleStylesheet(lang);// Toggle Arabic stylesheet
}

// Function to toggle Arabic stylesheet based on language selection
function toggleStylesheet(lang) {
  const head = document.querySelector('head');
  const link = document.querySelector('#styles-link');

  if (link) {
    head.removeChild(link); // Remove the old stylesheet link
  }
  else if (lang === 'en') {
    const newLink = document.createElement('link');
    newLink.id = 'styles-link';
    newLink.rel = 'stylesheet';
    head.appendChild(newLink);
  } else if (lang === 'zh-Hans') {
    const newLink = document.createElement('link');
    newLink.id = 'styles-link';
    newLink.rel = 'stylesheet';
    head.appendChild(newLink);
  }
}


// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
  const userPreferredLanguage = localStorage.getItem('language') || 'zh-Hant';
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
  toggleStylesheet(userPreferredLanguage);
});