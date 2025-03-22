import React, { useState } from "react";

const MoxfieldDeck = ({ position = "above" }) => {
  const [deckId, setDeckId] = useState("");
  const [deckData, setDeckData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchDeck = async () => {
    if (!deckId.trim()) return;
    setLoading(true);
    setDeckData(null);

    try {
      const res = await fetch(`https://mtggpt.onrender.com/moxfield/${deckId.trim()}`);
      const data = await res.json();

      if (data.error) {
        alert("No se pudo obtener el mazo. Asegúrate de que el ID sea correcto.");
      } else {
        setDeckData(data);
      }
    } catch (err) {
      console.error("Error al obtener el mazo:", err);
      alert("Hubo un error al consultar el mazo.");
    }
    setLoading(false);
  };

  return (
    <div className={position === "above" ? "mt-8 mb-4 text-left" : "mt-12 text-left"}>
      <h2 className="text-xl font-semibold mb-2">Buscar mazo en Moxfield</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ingresa el ID del mazo de Moxfield"
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
          value={deckId}
          onChange={(e) => setDeckId(e.target.value)}
        />
        <button
          onClick={handleFetchDeck}
          className="bg-scry hover:bg-opacity-90 text-white px-4 rounded-md"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Cargando mazo...</p>}

      {deckData && (
        <div className="bg-gray-100 p-4 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-scry mb-2">{deckData.name}</h3>
          <p className="mb-2">Comandante: <strong>{deckData.commander}</strong></p>
          <p className="mb-4 text-sm text-sky-700 underline">
            <a href={deckData.publicUrl} target="_blank" rel="noreferrer">Ver en Moxfield</a>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto text-sm">
            {deckData.cards.map((c, i) => (
              <div key={i}>{c}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoxfieldDeck;
