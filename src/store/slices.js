import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

export const propertySlice = createSlice({
  name: "property",
  initialState: {
    propertyData: data, // Initial data
    searchTerm: "",
    formData: {
      city: "",
      date: "",
      priceRange: "",
      propertyType: "",
    },
    filteredProperty: data, // Initial filtered data
  },
  reducers: {
    toggleLike(state, action) {
      state.filteredProperty = state.filteredProperty.map((item, i) => {
        if (i === action.payload) {
          if (!("liked" in item)) {
            item.liked = false;
          }
          return { ...item, liked: !item.liked };
        }
        return item;
      });
    },
    filterLiked(state) {
      state.filteredProperty = state.filteredProperty.filter(
        (item) => item.liked
      );
    },
    setSearch(state, action) {
      state.searchTerm = action.payload;
      state.filteredProperty = state.propertyData.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    updateFormData(state, action) {
      const { id, value } = action.payload;
      state.formData[id] = value; // Update form data directly
    },
    filteredData(state) {
      state.filteredProperty = filterPropertyData(
        state.propertyData,
        state.formData
      ); // Update filtered data on form data change
    },
  },
});

const filterPropertyData = (propertyData, formData) => {
  // Convert proxies to plain objects for logging
  const plainPropertyData = JSON.parse(JSON.stringify(propertyData));
  const plainFormData = JSON.parse(JSON.stringify(formData));

  console.log("Initial propertyData:", plainPropertyData);
  console.log("FormData:", plainFormData);

  let filtered = [...propertyData]; // Make a copy of propertyData to filter

  const { city, date, priceRange, propertyType } = formData;
  console.log(city);

  if (city !== "") {
    filtered = filtered.filter((property) => {
      console.log(property.address.split(",")[2].trim().toLowerCase());

      let currCity = property.address.split(",")[2].trim().toLowerCase();
     return currCity.includes(city.toLowerCase());
    });
  }

  if (date) {
    filtered = filtered.filter((property) => property.date === date);
  }
  if (priceRange) {
    // Remove the currency symbol and parse the price range
    const [minPrice, maxPrice] = priceRange
      .replace(/Rs\s*/g, "")
      .split("-")
      .map((price) => parseInt(price.trim(), 10));
    filtered = filtered.filter(
      (property) => property.price >= minPrice && property.price <= maxPrice
    );
  }
  if (propertyType) {
    filtered = filtered.filter((property) => property?.type === propertyType);
  }

  console.log("Filtered Data:", filtered);
  return filtered;
};

export const {
  toggleLike,
  setSearch,
  filterLiked,
  updateFormData,
  filteredData,
} = propertySlice.actions;

export default propertySlice.reducer;
