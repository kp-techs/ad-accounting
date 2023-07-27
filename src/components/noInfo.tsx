import { ImSad } from "react-icons/im";

function NoInfo() {
  return (
    <div className="noInfo">
      <div>
        <p>No hay registros disponibles</p>
        <ImSad size={25} />
      </div>
    </div>
  );
}

export default NoInfo;
