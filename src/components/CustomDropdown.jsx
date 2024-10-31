import React, { useState } from 'react';

const CustomDropdown = ({ selectedValue, onChange, title }) => {
  const options = [{ label: "Baixa", value: "baixa" },
    { label: "Média", value: "media" },
    { label: "Alta", value: "alta" }];
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    console.log(option) // Call the onChange handler with the selected value
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative">
      <button
        className="w-full p-2 bg-[#FFFFFF] rounded-[12px] text-[18px] border-[#C6CFDC] border-[1px] text-left text-[#3F3D56]"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown
      >
        {selectedValue?.label || `${title}`}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#FFFFFF] border-[#C6CFDC] border-[1px] rounded-[12px] shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 text-[#3F3D56] hover:bg-[#1dc071] text-white cursor-pointer"
              onClick={() => handleOptionClick(option)} // Select option
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
