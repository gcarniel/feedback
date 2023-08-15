interface SaveButtonProps {
  onClick: () => void; // Não requer argumentos
}

const ButtonSave: React.FC<SaveButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onClick}
    >
      Salvar
    </button>
  );
};

export default ButtonSave;
