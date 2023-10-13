export const defaultDataset = [
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

export const tablesDatasets = {
   income: {
      table: 'incomes',
      label: 'INGRESOS',
      backgroundColor: "rgba(220, 220, 220, 0.2)",
      borderColor: "rgba(220, 220, 220, 1)",
      pointBackgroundColor: "rgba(220, 220, 220, 1)",
      pointBorderColor: "#fff"
   },
   outgoing: {
      table: 'outgoings',
      label: "EGRESOS",
      backgroundColor: "rgba(151, 187, 205, 0.2)",
      borderColor: "rgba(151, 187, 205, 1)",
      pointBackgroundColor: "rgba(151, 187, 205, 1)",
      pointBorderColor: "#fff",
   },
}

export const defaultLineChartConfig = {
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
}


