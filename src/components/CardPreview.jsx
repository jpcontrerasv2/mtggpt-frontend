import React from 'react';
import { useTranslation } from 'react-i18next';

const CardPreview = ({ card }) => {
  const { t } = useTranslation();

  if (!card) return null;

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row items-start md:items-center gap-6">
      {card.image && (
        <img
          src={card.image}
          alt={card.name}
          className="w-full max-w-xs rounded-lg shadow-md"
        />
      )}
      <div className="text-left">
        <h3 className="text-2xl font-bold text-scry mb-2">{card.name}</h3>
        <p className="text-sm italic text-gray-600 mb-2">{card.type_line}</p>
        <p className="mb-4 whitespace-pre-line text-gray-800">{card.oracle_text}</p>

        <div className="text-sm text-gray-700 space-y-1">
          <p>💵 <strong>{t("card_preview.usd")}:</strong> {card.prices?.usd ? `$${card.prices.usd}` : t("card_preview.na")}</p>
          <p>💿 <strong>{t("card_preview.foil")}:</strong> {card.prices?.usd_foil ? `$${card.prices.usd_foil}` : t("card_preview.na")}</p>
          <p>💶 <strong>{t("card_preview.cardmarket")}:</strong> {card.prices?.eur ? `€${card.prices.eur}` : t("card_preview.na")}</p>
        </div>

        {card.scryfall_uri && (
          <a
            href={card.scryfall_uri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-scry hover:underline"
          >
            {t("card_preview.link")}
          </a>
        )}
      </div>
    </div>
  );
};

export default CardPreview;
