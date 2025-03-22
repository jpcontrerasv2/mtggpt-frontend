import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SuggestedQuestions from '../components/SuggestedQuestions';
import CardPreview from '../components/CardPreview';
import LanguageSelector from "../components/LanguageSelector";
import MoxfieldDeck from "../components/MoxfieldDeck";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';



const Home = () => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState(null);


  const handleConsult = async () => {
    setAnswer('');
    setLoading(true);
    // Reset preview
    setCardData(null);


    try {
      const lang = i18n.language;

      const systemPrompt =
        lang === 'es'
          ? 'Responde en español como un experto en Magic: The Gathering.'
          : 'Answer in English as an expert in Magic: The Gathering.';

      const fullPrompt = `${systemPrompt}\n\n${question}`;

      // Detectar si es una consulta tipo "qué hace la carta X"
      const matchCarta = question.match(/(?:carta|carta de|carta del|explica(?:me)? la carta)\s+(.+)/i);

      if (matchCarta) {
        const cardName = matchCarta[1].trim();
        try {
          const cardRes = await fetch(`https://mtggpt.onrender.com/card/${encodeURIComponent(cardName)}`);
          if (cardRes.ok) {
            const cardInfo = await cardRes.json();
            setCardData(cardInfo);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn("No se encontró la carta", e);
        }
      }



      const response = await fetch("https://mtggpt.onrender.com/ask", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: fullPrompt })
      });

      const responseData = await response.json();
      const rawAnswer = responseData.answer || (lang === 'es'
        ? "No se recibió respuesta."
        : "No response received.");

      let respuestaFormateada = rawAnswer
        .replace(/\s+/g, ' ')
        .replace(/,\s*\./g, '')
        .replace(/(\.|\:)/g, '$1\n\n')
        .replace(/\*\*(.*?)\*\*/g, '**$1**')
        .trim();

      setAnswer(respuestaFormateada);
      console.log("✅ Respuesta formateada:", respuestaFormateada);
    } catch (error) {
      console.error("❌ Error al consultar:", error);
      setAnswer(i18n.language === 'es'
        ? "Hubo un error al obtener la respuesta."
        : "There was an error getting the response.");
    }

    setLoading(false);
  };


  return (
    <div className="max-w-6xl mx-auto text-center py-10 px-4">
      <LanguageSelector />
      <h1 className="text-3xl font-mono font-semibold mb-2">
        MTG GPT {t('by')} <span className="text-scry">Scry.cl</span>
      </h1>
      <p>{t('description')}</p>

      <SuggestedQuestions onSelectQuestion={setQuestion} />

      <div className="mt-8">
        <MoxfieldDeck position="above" />

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t('textarea_placeholder')}
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scry resize-none"
          rows={3}
          style={{ minHeight: "50px", maxHeight: "400px", overflowY: "auto" }}
        />

        <button
          onClick={handleConsult}
          className="mt-4 bg-scry hover:bg-opacity-90 text-white py-2 px-6 rounded-lg transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : t('consult_button')}
        </button>

        {loading && (
          <p className="mt-4 text-gray-500 text-sm animate-pulse">
            {t('loading_message')}
          </p>
        )}
        {cardData && (
          <CardPreview card={cardData} />
        )}


        {answer && (
          <div className="mt-8 text-left bg-gray-100 p-6 rounded-xl shadow-md leading-relaxed">
            <h2 className="font-semibold text-xl text-scry mb-4">{t('answer_title')}</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
