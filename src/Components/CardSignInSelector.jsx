const CardSignInSelector = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <label
        htmlFor="iscrivoIn"
        className="block mb-1 font-semibold text-gray-700"
      >
        Mi iscrivo in
      </label>
      <select
        id="iscrivoIn"
        name="iscrivoIn"
        className="block w-full border-b text-xs border-black rounded px-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">---</option>
        <option value="it">Italia</option>
        <option value="estero">Estero</option>
      </select>
    </div>
  );
};

export default CardSignInSelector;
