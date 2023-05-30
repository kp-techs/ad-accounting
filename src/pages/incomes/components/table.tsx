import styled from "styled-components";
import { useTable } from "react-table";
import useColumns from "../const/columns";
import { useEffect, useState } from "react";
import { CreateIncome, Income, IncomeType } from "../../../types/models";
import useAppData from "../../../hooks/useAppData";
import Modal from "react-modal";
import { Field, Form, Formik } from "formik";
import { types } from "util";

function Table() {
  const { incomes, loadIncomes } = useAppData();
  const [types, setTypes] = useState<IncomeType[]>([]);
  const [isAdmin] = useState(true);

  const initialIncome: CreateIncome = {
    date: "",
    amount: 0,
    createdBy: "",
    createdDate: null,
    updatedBy: "",
    updatedDate: null,
    comment: "",
    type: "",
    tithingID: null,
    ministryID: null,
    eventName: "",
  };

  useEffect(() => {
    loadIncomes();
  }, [loadIncomes]);

  const columns = useColumns();

  const table = useTable<Income>({ columns, data: incomes });

  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    table;

  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  const [modifyModalIsOpen, setmodifyModalIsOpen] = useState(false);

  function openDeleteModal() {
    setdeleteModalIsOpen(true);
  }

  function closeDeleteModal() {
    setdeleteModalIsOpen(false);
  }
  function openModifyModal() {
    setmodifyModalIsOpen(true);
  }

  function closeModifyModal() {
    setmodifyModalIsOpen(false);
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Wrapper>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Modal para eliminar registro"
      >
        <div>
          <h2>¿Seguro que desea eliminar este registro?</h2>
          <div>
            <button onClick={closeDeleteModal}>Cancelar</button>
            <button onClick={closeDeleteModal}>Confirmar</button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modifyModalIsOpen}
        onRequestClose={closeModifyModal}
        style={customStyles}
        contentLabel="Modal para modificar registro"
      >
        <Formik
          initialValues={initialIncome}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ values }) => (
            <Form>
              <div className="selectType-container">
                <label htmlFor="selectIncomeType">Concepto</label>
                <Field id="selectIncomeType" as="select" name="type">
                  <option>Seleccionar</option>
                  {types.map(({ type }, i) => (
                    <option key={`${i}`} value={type}>
                      {type}
                    </option>
                  ))}
                </Field>
              </div>
              <section></section>
              {values.type === "Diezmos" ? (
                <section className="field-line">
                  <label htmlFor="diezmante-nombre">Diezmante</label>
                  <Field
                    id="diezmante-name"
                    type="text"
                    name="tithing"
                    placeholder="Jocelin Sanchez"
                  />
                </section>
              ) : values.type === "Evento" ? (
                <section
                  id="typeEventFields-container"
                  className="fields-container field-line"
                >
                  <div>
                    <label htmlFor="event-name">Nombre</label>
                    <Field
                      id="event-name"
                      type="text"
                      name="eventName"
                      placeholder="Congreso Estruendo"
                    />
                  </div>
                  <div>
                    {/* aqui ira un tipo de input que sugerira 
                     de los que tiene, y sino hay lo agrega */}
                    <label htmlFor="event-name">Ministerio</label>
                    <Field id="ministery-name" type="text" name="ministryID" />
                  </div>
                </section>
              ) : null}

              <div className="fields-container field-line">
                <div>
                  <label>Fecha</label>
                  <Field name="date" type="date" />
                </div>
                <div>
                  <label>Monto</label>
                  <Field name="amount" type="number" />
                </div>
              </div>

              <div className="field-line">
                <label>Comentario</label>
                <Field name="comment" type="text" />
              </div>
              <div>
                <button onClick={closeModifyModal}>Cancelar</button>
                <button type="submit" onClick={closeModifyModal}>
                  Confirmar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((income) => {
            prepareRow(income);
            return (
              <tr {...income.getRowProps()} className="row">
                {income.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                {isAdmin && (
                  <div id="modifyButtons-container">
                    <div className="buttons" onClick={openModifyModal}>
                      <img
                        src="assets/images/pencil-161946_640.webp"
                        alt="Modify"
                      />
                    </div>
                    <div className="buttons" onClick={openDeleteModal}>
                      <img
                        src="assets/images/delete_318-901546.avif"
                        alt="Delete"
                      />
                    </div>
                  </div>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
  }
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  thead tr th {
    font-size: 20px;
    border-collapse: separate;
    color: #7a7517;
    text-align: justify;
    border: 0;
  }

  tbody tr:hover {
    background-color: #ddd;
  }
  tr {
    position: relative;

    &:hover {
      #modifyButtons-container {
        display: flex;
      }
    }
  }

  #modifyButtons-container {
    display: none;
    justify-content: center;
    gap: 15px;
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 50;
  }

  .buttons {
    display: flex;
    padding: 5px;
  }
  img {
    cursor: pointer;
    width: 20px;
  }
  .buttons:hover {
    border-radius: 50%;
    background-color: #99a7b46f;
    border: 0.5 #f0f8ffbe solid;
  }
`;

export default Table;
