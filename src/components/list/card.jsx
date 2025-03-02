import { useState } from "react";
import Selector from "./selector";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const Card = ({ item }) => {
  const [selectedType, setSelectedType] = useState(null);
  const dispatch = useDispatch();

  const handleType = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const handleBasket = () => {
    dispatch(addToCart({ item, selectedType }));
    setSelectedType(null);
  };

  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-600 via-red-600 border border-gray-600 rounded-2xl p-6 flex gap-6 lg:gap-10 shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-[120px] md:w-[160px] drop-shadow-xl rounded-lg"
        />
      </div>

      <div className="flex-1 text-white">
        <h2 className="text-xl md:text-2xl font-semibold">{item.name}</h2>

        <Selector selectedType={selectedType} handleType={handleType} />

        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-medium">₺{item.price} / top</p>

          <button
            onClick={handleBasket}
            className={`border border-white py-2 px-4 rounded-lg text-white font-medium hover:bg-white hover:text-gray-900 transition-all ${
              !selectedType && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!selectedType}
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
