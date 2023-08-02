import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonRegister from "../common/registerButton";
import { Feedback } from "@/types/feedback";

interface EditCollaboratorProps {
  collaboratorId: string | null;
}

const initialNewEmployee = { name: "", office: "", hiringDate: 0 };

export default function ColaboradorForm({
  collaboratorId,
}: EditCollaboratorProps) {
  const [employee, setEmployee] = useState(initialNewEmployee);
  const [collaborator, setCollaborator] = useState<any>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { name, office, hiringDate } = employee;

    try {
      const hiringDateValue = new Date(hiringDate).toISOString();
      if (collaboratorId) {
        const collaboratorRef = doc(db, "employees", collaboratorId);
        await updateDoc(collaboratorRef, {
          name,
          office,
          hiringDate: hiringDateValue,
        });
      } else {
        const docRef = await addDoc(collection(db, "employees"), {
          name,
          office,
          hiringDate: hiringDateValue,
        });
      }
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

  const getCollaboratorId = async () => {
    if (!collaboratorId) {
      return false;
    }
    const collaboratorRef = doc(db, "employees", collaboratorId);
    const collaboratorDoc = await getDoc(collaboratorRef);
    const collaboratorData = collaboratorDoc.exists()
      ? collaboratorDoc?.data()
      : null;
    if (!collaboratorData) {
      return;
    }
    setEmployee({
      name: collaboratorData.name,
      office: collaboratorData.office,
      hiringDate: collaboratorData.hiringDate,
    });
  };

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const collaboratorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollaborator(collaboratorsData);
        setEmployee(initialNewEmployee);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
    getCollaboratorId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {/* <button
          className="block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Cadastrar
        </button> */}
        <ButtonRegister
          onSubmit={function (feedback: Feedback): void {
            throw new Error("Function not implemented.");
          }}
        />
      </form>
    </div>
  );
}
