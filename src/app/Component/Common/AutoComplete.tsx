import React from "react";
import { useSearchParams } from "next/navigation";

interface AutoCompleteProps {
    suggestions: string[];
    selectedValue: string;
    onSelect: (selectedValue: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions, selectedValue, onSelect }) => {
    const [filteredSuggestions, setFilteredSuggestions] = React.useState<string[]>([]);
    const [showDropdown, setShowDropdown] = React.useState(false);
    const parm = useSearchParams();
        
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onSelect(newValue);

        if (newValue.trim() === "") {
            setShowDropdown(false);
            return;
        }

        const filtered = suggestions.filter((item) =>
            item.toLowerCase().includes(newValue.toLowerCase())
        );

        setFilteredSuggestions(filtered);
        setShowDropdown(filtered.length > 0);
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-64" style={{ marginTop: "20px" }}>
            <input
                type="text"
                value={selectedValue}
                onChange={handleInputChange}
                placeholder={parm.get("language") === "0" ? "국적 입력" : "请输入国籍"}
                className="w-full p-2 border border-gray-300 rounded"
                style={{
                    border: "none",
                    width: "200px",
                    height: "30px",
                    padding: "5px",
                    background: "#f5f6f9",
                    color: "black",
                    fontSize: "16px",
                    borderRadius: "5px",
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
                                listStyle: "none",
                                fontSize: "14px",
                                border: "none",
                                width: "200px",
                                height: "30px",
                                padding: "5px",
                                background: "white",
                                color: "black"
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