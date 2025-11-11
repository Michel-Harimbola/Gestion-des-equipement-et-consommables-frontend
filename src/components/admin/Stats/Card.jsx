


export default function({ data }) {
    return (
        <div className="bg-white pl-6 py-6 pr-18 rounded-2xl flex items-center gap-5 dark:bg-gray-700 dark:text-gray-400">
            <span className={`${data.bgColor} px-3 py-6 text-2xl rounded-2xl dark:bg-gray-500`}>
                <data.icon />
            </span>
            <div className="">
                <h2 className="text-1xl">
                    <span className="text-2xl font-bold">{data.count}</span>/250
                </h2>
                <p className="font-bold">{data.title}</p>
            </div>
        </div>
    )
}