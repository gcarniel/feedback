import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialNewEmployee = { name: "", office: "", hiringDate: 0 };

export default function ColaboradorForm() {
  const [employee, setEmployee] = useState(initialNewEmployee);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { name, office, hiringDate } = employee;

    try {
      const hiringDateValue = new Date(hiringDate).toISOString();
      const docRef = await addDoc(collection(db, "employees"), {
        name,
        office,
        hiringDate: hiringDateValue,
      });
      setEmployee(initialNewEmployee);
      toast.success("Colaborador cadastrado com sucesso!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        "Erro ao cadastrar colaborador. Por favor, tente novamente.",
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        }
      );
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center">
      <ToastContainer />
      <form className="m-4 sm:m-8 md:m-16 lg:m-32" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="flex items-center justify-between mb-4 space-x-2 pl-12 sm:pl-16 pr-4 py-2 border border-gray-300 rounded-md border-none bg-white text-black"
        />

        <input
          type="text"
          placeholder="Cargo"
          name="office"
          value={employee.office}
          onChange={handleChange}
          className="flex items-center justify-between mb-4 space-x-2 pl-12 sm:pl-16 pr-4 py-2 border border-gray-300 rounded-md border-none bg-white text-black"
        />

        <input
          type="date"
          placeholder="Data de Contratação"
          name="hiringDate"
          value={employee.hiringDate}
          onChange={handleChange}
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
