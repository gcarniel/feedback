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

import { format, parseISO } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonRegister from "../common/registerButton";
import { Feedback } from "@/types/feedback";
import ButtonSave from "../common/saveButton";

interface EditCollaboratorProps {
  collaboratorId: string | null;
}

const initialNewEmployee = { name: "", office: "", hiringDate: "" };

export default function ColaboradorForm({
  collaboratorId,
}: EditCollaboratorProps) {
  const [employee, setEmployee] = useState<any>(initialNewEmployee);
  const [collaborator, setCollaborator] = useState<any>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { name, office, hiringDate } = employee;

    try {
      if (!name || !office || !hiringDate) {
        return;
      }

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const hiringDateValue = parseISO(hiringDate);
      const hiringDateLocal = utcToZonedTime(hiringDateValue, timeZone);
      const hiringDateUTC = zonedTimeToUtc(hiringDateLocal, timeZone);

      if (collaboratorId) {
        const collaboratorRef = doc(db, "employees", collaboratorId);
        await updateDoc(collaboratorRef, {
          name,
          office,
          hiringDate: hiringDateUTC.toISOString(),
        });
      } else {
        const docRef = await addDoc(collection(db, "employees"), {
          name,
          office,
          hiringDate: hiringDateUTC.toISOString(),
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
    console.log(value);
    if (name === "hiringDate") {
      setEmployee((prevEmployee: any) => ({
        ...prevEmployee,
        [name]: value,
      }));
    } else {
      setEmployee((prevEmployee: any) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
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
      hiringDate: collaboratorData.hiringDate
        ? format(new Date(collaboratorData.hiringDate), "yyyy-MM-dd")
        : "",
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
        setEmployee((prevEmployee: any) => ({
          ...prevEmployee,
          hiringDate: prevEmployee.hiringDate || "",
        }));
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
    getCollaboratorId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-xl mx-auto mb-4 bg-white rounded-lg shadow-lg p-5">
      <ToastContainer />
      <form className="m-4 sm:m-8 md:m-16 lg:m-32" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-slate-900">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Digite o nome do funcionário"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="w-72 px-4 py-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="office" className="block mb-2 text-slate-900">
            Cargo:
          </label>
          <input
            type="text"
            id="office"
            placeholder="Digite o cargo do funcionário"
            name="office"
            value={employee.office}
            onChange={handleChange}
            className="w-72 px-4 py-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="hiringDate" className="block mb-2 text-slate-900">
            Data de Contratação:
          </label>
          <input
            type="date"
            id="hiringDate"
            name="hiringDate"
            value={employee.hiringDate}
            onChange={handleChange}
            className="w-72 px-4 py-2 border border-gray-300 text-slate-900 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {collaboratorId ? (
          <ButtonSave onClick={function (): void {}} />
        ) : (
          <ButtonRegister onSubmit={function (feedback: Feedback): void {}} />
        )}
      </form>
    </div>
  );
}
