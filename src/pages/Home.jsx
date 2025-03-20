import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // ✅ Agregar esto
import SuggestedQuestions from '../components/SuggestedQuestions';

const Home = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConsult = async () => {
    setAnswer('');
    setLoading(true);

    try {
      const response = await fetch("https://mtggpt.onrender.com/ask", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      const responseData = await response.json(); // ✅ Convertimos la respuesta en JSON
      const rawAnswer = responseData.answer || "No se recibió respuesta."; // ✅ Extraemos solo "answer"

      // 🔥 **Limpieza y formato**
      let respuestaFormateada = rawAnswer
        .replace(/\s+/g, ' ') // Compactar espacios repetidos
        .replace(/,\s*\./g, '') // Eliminar ", ."
        .replace(/(\.|\:)/g, '$1\n\n') // Saltos de línea después de puntos y dos puntos
        .replace(/\*\*(.*?)\*\*/g, '**$1**') // Negritas en Markdown
        .trim();

      setAnswer(respuestaFormateada);
      console.log("✅ Respuesta formateada:", respuestaFormateada);
    } catch (error) {
      console.error("❌ Error al consultar:", error);
      setAnswer("Hubo un error al obtener la respuesta.");
    }

    setLoading(false);
  };


  return (
    <div className="max-w-3xl mx-auto text-center py-12 px-4">
      <h1 className="text-3xl font-mono font-semibold">
        MTG GPT es un proyecto de <span className="text-scry">Scry.cl</span>
      </h1>
      <p>
        Evalúa datos actuales de cartas de Magic: The Gathering, datos de listas de mazos meta,
        datos de precios, recomendaciones de cartas e información sobre las reglas del juego para responder preguntas.
      </p>

      <SuggestedQuestions onSelectQuestion={setQuestion} />

      <div className="mt-8">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Pregunta lo que quieras sobre MTG..."
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-scry"
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
          ) : "Consultar"}
        </button>

        {loading && (
          <p className="mt-4 text-gray-500 text-sm animate-pulse">Generando respuesta...</p>
        )}

        {answer && (
          <div className="mt-8 text-left bg-gray-100 p-6 rounded-xl shadow-md leading-relaxed">
            <h2 className="font-semibold text-xl text-scry mb-4">Respuesta:</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
