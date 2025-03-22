import React, { useEffect, useState } from 'react';
import i18next from 'i18next';

const questionsByLang = {
  es: [
    "Recomiéndame un mazo fuerte en Pauper.",
    "¿Qué sucede si olvido un trigger en un torneo?",
    "¿Qué hace exactamente la carta Force of Will?",
    "Explícame cómo funciona el efecto Storm.",
    "¿Qué significa que una carta esté restringida o baneada?",
    // ... más en español
  ],
  en: [
    "Recommend me a strong Pauper deck.",
    "What happens if I miss a trigger in a tournament?",
    "What exactly does Force of Will do?",
    "Explain how the Storm effect works.",
    "What does it mean when a card is restricted or banned?",
    // ... más en inglés
  ],
};

const SuggestedQuestions = ({ onSelectQuestion }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const lang = i18next.language || 'es';
    const list = questionsByLang[lang] || questionsByLang['es'];
    const shuffled = list.sort(() => 0.5 - Math.random()).slice(0, 4);
    setQuestions(shuffled);
  }, [i18next.language]); // actualiza si cambia el idioma

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {questions.map((q, index) => (
        <button
          key={index}
          className="bg-gray-100 hover:bg-scry hover:text-white transition text-gray-800 text-sm font-medium px-3 py-1.5 rounded-lg shadow-sm"
          onClick={() => onSelectQuestion(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
