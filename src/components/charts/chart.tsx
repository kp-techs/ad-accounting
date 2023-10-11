import { CChart } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHistoricChart, getTotalByMonth } from '../../hooks/useSupabase';

function ChartGeneral() {
   const [data, setData] = useState<any>([])

   useEffect(() => {
      async function getData() {
         const historicData = await getHistoricChart(
            [
               {
                  table: 'incomes', 
                  label: 'INGRESOS',
                  backgroundColor: "rgba(220, 220, 220, 0.2)",
                  borderColor: "rgba(220, 220, 220, 1)",
                  pointBackgroundColor: "rgba(220, 220, 220, 1)",
                  pointBorderColor: "#fff"
               },
               {
                  table: 'outgoings',
                  label: "EGRESOS",
                  backgroundColor: "rgba(151, 187, 205, 0.2)",
                  borderColor: "rgba(151, 187, 205, 1)",
                  pointBackgroundColor: "rgba(151, 187, 205, 1)",
                  pointBorderColor: "#fff",
               }
            ]
         )
         setData(historicData)
      }

      getData();
   }, [])

   return (
      <Wrapper>
         <CChart className='chart'
            type="line"
            data={data}
            options={{
               plugins: {
                  legend: {
                     labels: {
                        color: 'black',
                     }
                  }
               },
               scales: {
                  x: {
                     grid: {
                        color: '#eaeaffbd',
                     },
                     ticks: {
                        color: 'black',
                     },
                  },
                  y: {
                     grid: {
                        color: '#eaeaffbd',
                     },
                     ticks: {
                        color: 'black',
                     },
                  },
               },
            }}
         />
      </Wrapper>
   )
}


const Wrapper = styled.div`
   width: 100%;
   height: 100%;
   .chart {
      width: 100%;
      height: 100%;
   }
`

export default ChartGeneral;