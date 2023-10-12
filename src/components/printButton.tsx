import { BsCloudDownload } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import styled from "styled-components";

type Props = {
   componentRef: any,
}

function PrintButton({ componentRef }: Props) {
   const handlePrint = useReactToPrint({ content: () => componentRef?.current, pageStyle: `padding: 10px` })

   return (
      <Wrapper onClick={handlePrint}>
         <BsCloudDownload size={20} color="#fff" />
      </Wrapper>
   )

}

export default PrintButton;

const Wrapper = styled.button`
   border: 0;
   background-color: #063970;
   padding: 8px;
   border-radius: 5px;
   display: grid;
   place-content: center;
   height: 40px;
   width: 40px;
`