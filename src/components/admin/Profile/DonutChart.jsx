import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEquipementsStatus } from "../../../redux/slices/admin/dashboardSlice";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";


export default function DonutChart({ darkMode }) {
  const dispatch = useDispatch();

  const { equipementsStatus } = useSelector((state) => state.dashboard);

  const { t } = useTranslation();

  useEffect(() => {
      dispatch(fetchEquipementsStatus());
  }, [dispatch]);

  const options = {
    series: [
        equipementsStatus.disponibles,
        equipementsStatus.empruntes,
        equipementsStatus.maintenance,
    ],
    options: {
      chart: {
        type: "donut",
        height: 350,
      },
      labels: [t("availables"), t("borrowed1"), t("maintenance")],
      colors: ["#33FF57", "#FF5733", "#3357FF"],
      legend: {
        position: "bottom",
        labels: {
          colors: darkMode ? "#dddddd" : "#000000",
        },
      },
      dataLabels: {
        style: {
          colors: ["#dddddd"],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="py-12 bg-white rounded-lg px-5 flex dark:text-gray-50 dark:bg-gray-700 items-center justify-center">
        <Chart 
            options={options.options} 
            series={options.series} 
            type="donut"
            height={350}
            className="dark:text-gray-50"
        />
    </div>
  )
}