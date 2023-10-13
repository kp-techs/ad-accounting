import { CChart } from '@coreui/react-chartjs'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getHistoricChart } from '../../hooks/useSupabase';
import { defaultDataset, defaultLineChartConfig } from './const';

type Props = {
   dataset?: ChartConfig[];
}
function LineChart({ dataset = defaultDataset }: Props) {
   const [data, setData] = useState<any>([])

   useEffect(() => {
      async function getData() {
         const historicData = await getHistoricChart(dataset)
         setData(historicData)
      }
      getData();
   }, [])

   return (
         <CChart
         style={{margin:"5px"}}
            type="line"
            data={data}
            options={{
               plugins: defaultLineChartConfig.plugins,
               scales: defaultLineChartConfig.scales
            }}
         />
   )
}

const Wrapper = styled.div`
   width: 100%;

   .chart {
      width: 100%;
      height: 100%;
      box-sizing: border-box;

   }

`

export default LineChart;