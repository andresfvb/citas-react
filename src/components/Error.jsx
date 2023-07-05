const Error = ({children}) => {
    return (
        <div>
            <p className="bg-red-800 text-white text-center rounded uppercase font-bold p-3 mb-5">{children}</p>
        </div>
    )
}

export default Error