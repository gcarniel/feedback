"use client";

import { useState } from "react";

export default function ColaboradorForm() {
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [hiringDate, setHiringDate] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("cliquei");

    const collaborator = {
      name: name,
      office: office,
      hire_date: new Date(hiringDate),
    };
    setName("");
    setOffice("");
    setHiringDate("");
  };

  return (
    <div className="mx-auto">
      <form className=" m-4 sm:m-8 md:m-16 lg:m-32" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex items-center justify-between mb-4 space-x-2 pl-12 sm:pl-16 pr-4 py-2 border border-gray-300 rounded-md border-none  bg-white"
        />

        <input
          type="text"
          placeholder="Cargo"
          value={office}
          onChange={(e) => setOffice(e.target.value)}
          className="flex items-center justify-between mb-4 space-x-2 pl-12 sm:pl-16 pr-4 py-2 border border-gray-300 rounded-md border-none  bg-white"
        />

        <input
          type="date"
          placeholder="Data de Contratação"
          value={hiringDate}
          onChange={(e) => setHiringDate(e.target.value)}
          className="block px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          className="block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
