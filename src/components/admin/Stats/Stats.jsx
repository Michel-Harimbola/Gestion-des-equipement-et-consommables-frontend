import { employeesData } from "../../../constants/index";
import Balance from "./Balance";
import Card from "./Card";

export default function Stats({ darkMode }) {
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-4 h-full">
                {employeesData.map((data, index) => (
                    <Card key={index}  data={data}/>
                ))}
            </div>
            <Balance darkMode={darkMode} />
        </div>
    )
}