import { useDispatch, useSelector } from "react-redux";
import { filteredData, updateFormData } from "../store/slices";

const filterData = [
  {
    id: "city",
    title: "Enter City",
    type: "text",
  },
  {
    id: "date",
    title: "Date",
    type: "date",
  },
  {
    id: "priceRange",
    title: "Price",
    type: "select",
    options: [
      "Rs 0-500",
      "Rs 500-1000",
      "Rs 1000-1500",
      "Rs 1500-2000",
      "Rs 2000-2500",
      "Rs 2500-3000",
      "Rs 3000-3500",
      "Rs 3500-4000",
      "Rs 4000-4500",
      "Rs 4500-5000",
    ],
  },
  {
    id: "propertyType",
    title: "Property Type",
    type: "select",
    options: ["All", "house", "pg", "farm-house", "villa", "oyo"],
  },
];

function FilterData() {
  const formData = useSelector((state) => state.property.formData);
  const dispatch = useDispatch();

  const handleChange = (e, id) => {
    const { value } = e.target;
    dispatch(updateFormData({ id, value }));
  };

  const handleSubmit = () => {
    dispatch(filteredData(formData));
  };

  console.log(formData);

  return (
    <div className="flex justify-center flex-wrap items-center gap-4 bg-gray-100 rounded-lg mx-4 2xl:mx-20 mt-10">
      {filterData.map((item) => (
        <div className="flex flex-col w-40 2xl:w-72 p-4 my-5" key={item.id}>
          <label htmlFor={item.id}>{item.title}</label>
          {item.type === "select" ? (
            <select
              id={item.id}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleChange(e, item.id)}
              value={formData[item.id] || ""}
            >
              {item.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              id={item.id}
              type={item.type}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="All"
              onChange={(e) => handleChange(e, item.id)}
              value={formData[item.id] || ""}
            />
          )}
        </div>
      ))}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default FilterData;
