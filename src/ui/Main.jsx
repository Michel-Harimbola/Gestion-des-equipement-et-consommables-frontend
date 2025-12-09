export default function Main({ children }) {
    return (
        <div className="text-gray-500 px-4 py-6 sm:ml-64 flex flex-col gap-5 lg:flex-row transition-all duration-300 mt-[50px]">
            {children}
        </div>
    )
};