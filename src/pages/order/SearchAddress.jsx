import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import React from "react";

function SearchAddress({ setAddress }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }, main_text, secondary_text) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then(result => {
        const { lat, lng } = getLatLng(result[0]);
        console.log(("Coordinates : ", { lat, lng }));
      });

      const add = secondary_text.split(",");

      setAddress({
        main_text,
        city: add.length >= 2 ? add[0] : "",
        country: add[add.length - 1],
        secondary_text,
      });
    };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="oa_list_items"
          key={place_id}
          onClick={handleSelect(suggestion, main_text, secondary_text)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <div>
      <input
        className="order_input"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder=" biulding number and street name"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul className="oa_items">{renderSuggestions()}</ul>}
    </div>
  );
}

export default SearchAddress;
