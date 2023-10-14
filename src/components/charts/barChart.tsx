import { CChart } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHistoricChart } from '../../hooks/useSupabase';
import { defaultDataset } from './const';

type Props = {
   dataset?: ChartConfig[];
}

function BarChart({ dataset = defaultDataset }: Props) {
   const [data, setData] = useState<any>([]);

   useEffect(() => {
      async function getData() {
         const historicData = await getHistoricChart(dataset)
         setData(historicData)
      }
      getData();
   }, [])

   return (
      <Wrapper>
         <CChart
            className='chart'
            type='bar'
            data={data}
            options={{
               indexAxis: 'y',
               elements: {
                  bar: {
                     borderWidth: 2,
                  }
               },
               responsive: true,
               plugins: {
                  legend: {
                     position: 'right',
                  },

               }
            }
            }

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
export default BarChart