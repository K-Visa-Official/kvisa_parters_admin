import React, { useState } from "react";

interface AutoCompleteProps {
    suggestions: string[];
    onSelect: (selectedValue: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions , onSelect }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // 입력 값이 변경될 때 자동완성 필터링
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === "") {
            setShowDropdown(false);
            return;
        }

        // 입력 값과 일치하는 추천 리스트 필터링
        const filtered = suggestions.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredSuggestions(filtered);
        setShowDropdown(filtered.length > 0);
    };

    // 추천 리스트에서 선택 시
    const handleSelect = (value: string) => {
        setInputValue(value);
        setShowDropdown(false);
        onSelect(value); 
    };

    return (
        <div className="relative w-64"  style={{ marginTop:"20px"}}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="국적 입력"
                className="w-full p-2 border border-gray-300 rounded"
                style={{
                    border: "none",
                    width: "200px",
                    height: "30px",
                    padding:"5px" ,
                    background : "#f5f6f9" ,
                    color:"black" , fontSize:"14px",
                    borderRadius:"5px"
                }}
            />
            {showDropdown && (
                <ul className="absolute left-0 w-full border border-gray-300 bg-white shadow-md max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            style={{
                                listStyle:"none" , fontSize:"14px" ,
                                border: "none",
                                width: "200px",
                                height: "30px",
                                padding:"5px" ,
                                background : "white" ,
                                color:"black"
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
