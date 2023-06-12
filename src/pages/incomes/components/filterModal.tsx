import Modal from "react-modal";
import { FC } from "react";
import { customStyles } from "../constants";
import styled from "styled-components";
import Select from "react-select";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const FilterModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para registrar ingresos"
    >
      <Wrapper>
        <section className="field-line">
          <h3>Tipo de ingreso</h3>
          <Select
            isMulti
            name="types"
            options={colourOptions}
            className=""
            placeholder="Seleccionar..."
            classNamePrefix="select"
          />
        </section>
        <h3>Rango de fecha</h3>
        <section className="fields-container field-line">
          <div>
            <input type="date" name="startDate" className="field" />
          </div>
          <div>
            <input type="date" name="endDate" className="field" />
          </div>
        </section>
        <h3>Rango de monto</h3>
        <section className="fields-container field-line">
          <div>
            <input type="number" className="field" placeholder="Desde" />
          </div>
          <div>
            <input type="number" className="field" placeholder="Hasta" />
          </div>
        </section>
        <section className="foo-modal">
          <div className="buttons-container">
            <button type="submit" onClick={onClose}>
              Aplicar
            </button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </section>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 10px;

  h3 {
    margin: 0;
    margin-bottom: 5px;
    font-family: Poppins;
    font-weight: 400;
  }
  .selectIncomeType {
    grid-template-columns: 100px 1fr;
  }

  .incomeTypeLabel-container {
    display: flex;
    align-items: center;
  }

  input {
    font-family: Poppins, Arial, Helvetica, sans-serif;
    font-size: 14px;
    width: 100%;
    background-color: hsl(0, 0%, 100%);
    border-radius: 4px;
    border: 1px;
    border-color: hsl(0, 0%, 80%);
    border-style: solid;
    outline: 0;
  }

  .field {
    padding: 2px 8px;
    box-sizing: border-box;
    height: 38px;
  }

  .selectType-container {
    box-sizing: border-box;
    display: grid;
    border-bottom: 1px gray solid;
    width: 100%;
    margin: 5px;
    padding: 10px;
    gap: 10px;
  }

  .fields-container {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    justify-content: space-between;
    width: 100%;
  }

  .field-line {
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    grid-area: right;
    gap: 15px;

    button {
      width: 93px;
      height: 30px;
      text-align: center;
      justify-content: center;
      font-size: 16px;
      box-sizing: border-box;
      background-color: #eeeeee;
      border-radius: 5px;
      font-family: Poppins, Arial, Helvetica, sans-serif;
      border: 0;
      cursor: pointer;
      &:active {
        background-color: #a4a4a494;
      }
    }
  }

  .foo-modal {
    display: grid;
    grid-template: "left right" 25px/1fr;
    padding: 5px;
    height: 40px;
  }
`;

export default FilterModal;
