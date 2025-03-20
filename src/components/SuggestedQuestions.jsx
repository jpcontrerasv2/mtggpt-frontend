// src/components/SuggestedQuestions.jsx
import React, { useEffect, useState } from 'react';

const suggestedQuestions = [
  "¿Cuáles son los mejores mazos del formato Modern actualmente?",
  "Recomiéndame un mazo fuerte en Pauper.",
  "¿Qué sucede si olvido un trigger en un torneo?",
  "¿Cuáles son las mejores cartas en Standard ahora mismo?",
  "¿Qué hace exactamente la carta Force of Will?",
  "Explícame cómo funciona el efecto Storm.",
  "¿Cuál es la carta más cara actualmente en MTG?",
  "¿Qué significa que una carta esté restringida o baneada?",
  "¿Cómo funciona la mecánica de Mutate?",
  "¿Qué es el formato Commander y cómo se juega?",
  "¿Cuáles son las cartas más icónicas de la historia de MTG?",
  "¿Cómo puedo mejorar mi mazo de Draft?",
  "¿Qué es el efecto de proliferar y cómo se usa?",
  "¿Cuáles son las mejores cartas de removal en Legacy?",
  "¿Cómo se juega un mazo de combo en Modern?",
  "¿Qué es el formato Pioneer y cuáles son sus características?",
  "¿Cuáles son las cartas más poderosas en Vintage?",
  "¿Cómo funciona la habilidad de Deathtouch?",
  "¿Qué es el efecto de Scry y cómo se utiliza?",
  "¿Cuáles son las mejores cartas de ramp en Commander?",
  "¿Cómo puedo proteger mis cartas de MTG?",
  "¿Qué es el efecto de Flashback y cómo se juega?",
  "¿Cuáles son las mejores cartas de counter en Standard?",
  "¿Cómo se juega un mazo de control en Legacy?",
  "¿Qué es el formato Brawl y cómo se juega?",
  "¿Cuáles son las cartas más valiosas de la edición Alpha?",
  "¿Cómo funciona la habilidad de Trample?",
  "¿Qué es el efecto de Cascade y cómo se usa?",
];

const SuggestedQuestions = ({ onSelectQuestion }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const shuffled = suggestedQuestions.sort(() => 0.5 - Math.random()).slice(0, 4);
    setQuestions(shuffled);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      {questions.map((q, index) => (
        <button
          key={index}
          className="bg-gray-100 hover:bg-scry hover:text-white transition text-gray-800 font-medium px-4 py-3 rounded-xl shadow-sm"
          onClick={() => onSelectQuestion(q)}
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default SuggestedQuestions;
