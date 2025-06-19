"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AlertForm() {
  const t = useTranslations("AlertForm");

  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const services = ["Remitly", "Wise", "Western Union", "WorldRemit", "Sendwave"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !threshold || !service) {
      setMessage(t("error"));
      return;
    }

    // Simule un enregistrement – vous pourrez intégrer votre back-office plus tard
    setTimeout(() => {
      setMessage(`${t("success")} (${service}, ${threshold}%)`);
      setEmail("");
      setThreshold("");
      setService("");
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>

      <label className="block mb-2 font-medium">{t("email")}</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 font-medium">{t("threshold")}</label>
      <input
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        placeholder="Ex: 2.5"
        className="w-full p-2 mb-4 border rounded"
        step="0.1"
        min="0"
      />

      <label className="block mb-2 font-medium">{t("service")}</label>
      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">{t("selectService")}</option>
        {services.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {t("submit")}
      </button>

      {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
    </form>
  );
}
