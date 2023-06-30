import Modal from "react-modal";
import { FC } from "react";
import styled from "styled-components";
import { customStyles } from "../pages/incomes/constants";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UserOptionsModal: FC<Props> = ({ isOpen, onClose }) => {
  //TO DO: estilizar el modal para cerrar sesion y perfil.
  const navigate = useNavigate();
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para registrar ingresos"
    >
      <Wrapper>
        <label>Optiones de usuario y cerrar sesion.</label>
        <div onClick={() => navigate("/configuration")}>Ver perfil</div>
        <div onClick={() => navigate("/")}>Cerrar sesión</div>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </Wrapper>
    </Modal>
  );
};
const Wrapper = styled.section``;

export default UserOptionsModal;
