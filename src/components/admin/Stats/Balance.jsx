import { FiSend } from "react-icons/fi"
import Title from "../../../ui/Title";
import Chart from "react-apexcharts";


export default function Balance({ darkMode }) {
    const chartConfig = {
      series: [
        {
          name: "Sales",
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 240,
          toolbar: {
            show: false,
          },
        },
        title: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#020617"],
        plotOptions: {
          bar: {
            columnWidth: "40%",
            borderRadius: 2,
          },
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: darkMode ? "#dddddd" : "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
          categories: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yaxis: {
          labels: {
            style: {
              colors: darkMode ? "#dddddd" : "#616161",
              fontSize: "12px",
              fontFamily: "inherit",
              fontWeight: 400,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#a0a0a0",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
      },
    };
    return (
        <div className="bg-white p-5 rounded-2xl dark:bg-gray-700 dark:text-gray-300 flex-1">
            <div className="flex justify-between items-center">
                <Title>Balance</Title>
                <FiSend className="bg-gray-500 p-2 rounded-full text-gray-300 w-8 h-8"/>
            </div>
            <div>
                <h1 className="font-bold text-2xl">
                    $600.000 <span className="font-medium text-xl">(USD)</span>
                </h1>
                <span>on July 2024</span>
            </div>
            <div className="px-6">
            <Chart 
                options={chartConfig.options}
                series={chartConfig.series}
                type="bar"
                height={240}
            />
        </div>  
        </div>
    )
}