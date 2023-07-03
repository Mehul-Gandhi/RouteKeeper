import React, { useRef, useEffect } from 'react';

const Autocomplete = ({ placeholder, value, onChange }) => {
  const inputRef = useRef(null);
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current);

    autoCompleteRef.current.addListener('place_changed', () => {
      const selectedPlace = autoCompleteRef.current.getPlace();
      const selectedValue = selectedPlace ? selectedPlace.formatted_address : '';

      onChange(selectedValue);
    });
  }, [onChange]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Autocomplete;
