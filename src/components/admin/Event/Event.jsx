import { events } from "../../../constants/index";
import Title from "../../../ui/Title";
import Item from "./Item";



export default function Event() {
    
    return (
        <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
            <Title>Events</Title>

            {events.map((event, index) => (
                <Item key={index} event={event} />
            ))}
        </div>
    )
}