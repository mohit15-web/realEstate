import { BathIcon, BedIcon, Diamond, Heart, IndianRupee } from "lucide-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleLike } from "../store/slices";

function Cards({ data }) {
  const dispatch = useDispatch();
    const handleLike = (index) => {
      dispatch(toggleLike(index));
    }    

    console.log(data);
  return (
    <div className="flex  gap-12 justify-center items-center flex-wrap p-10">
    
      {data.map((item, index) => (
        <div key={index} className="rounded-xl shadow-md w-96">
          <img
            src={item.imgurl}
            alt=""
            className=" object-cover w-96 h-80 rounded-tl-lg rounded-tr-lg"
          />
          <div className="p-4">
            <div className="flex justify-between text-2xl">
              <h1 className="text-blue-500 text-2xl flex items-center">
                <IndianRupee /> {item.price}/day
              </h1>
              <span
              className="cursor-pointer"
              onClick={() => handleLike(index)}
              >{!item?.liked ? <Heart /> : "🧡 "}</span>
            </div>
            <h1 className="text-3xl py-2">{item.title}</h1>
            <p className="py-4 text-gray-500">{item.address}</p>
            <hr />
            <div className="flex gap-12 py-4 text-gray-500">
              <div className="flex gap-2">
                <BedIcon />
                <p>{item.beds} Beds</p>
              </div>
              <div className="flex gap-2">
                <BathIcon />
                <p>{item.bath} Bath</p>
              </div>
              <div className="flex gap-2">
                <Diamond />
                <p>{item.sqft}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Cards.propTypes = {
  data: PropTypes.array,
};

export default Cards;
