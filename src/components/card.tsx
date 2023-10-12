import { BsCloudDownload } from "react-icons/bs";
import styled from "styled-components"
import { StyledCard } from "./styledDiv";
import PrintButton from "./printButton";
import { LegacyRef, useRef } from "react";

type Props = {
   title: string,
   children: JSX.Element,
}
function Card({ title, children }: Props) {

   const ref = useRef<HTMLDivElement | null>(null)

   return (
      <Wrapper>
         <div className="card-top-container">
            <div>
               <h5>{title}</h5>
            </div>
            <PrintButton componentRef={ref} />
         </div>
         <div ref={ref} className="card-container">{children}</div>
      </Wrapper>
   )
}

const Wrapper = styled(StyledCard)`

width:100%;
height:100%;
display: flex;
flex-direction: column;
gap: 25px;


.card-top-container {
   width: 100%;
   display: grid;
   grid-template-columns: 1fr 40px;
}

.card-container {
   width: 100%;
   
}


`

export default Card;