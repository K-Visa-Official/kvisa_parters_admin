import React, { useState } from "react";

interface DatePickerProps {
  onSelectDate: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onSelectDate }) => {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");

  // 🔹 현재 연도를 기준으로 선택할 연도 리스트 생성
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2099 - 2025 + 1 }, (_, i) => (2025 + i).toString());


  // 🔹 월 리스트 (01~12)
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));

  // 🔹 일 리스트 (1~31)
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"));

  // 🔹 선택된 날짜 조합
  const handleSelect = (type: string, value: string) => {
    if (type === "year") setYear(value);
    if (type === "month") setMonth(value);
    if (type === "day") setDay(value);

    if (year && month && day) {
      onSelectDate(`${year}${month}${day}`);
    }
  };

  return (
    <div className="flex gap-2" style={{ marginTop:"20px"}}>
      {/* 연도 선택 */}
      <select value={year} onChange={(e) => handleSelect("year", e.target.value)} 
            style={{
                border: "none",
                width: "80px",
                height: "30px",
                padding:"5px" ,
                background : "#f5f6f9" ,
                color:"black" , fontSize:"14px"
            }}
            >
        <option value="">YYYY</option>
        {years.map((y) => (
          <option key={y} value={y}style={{ fontSize: "14px" }}>
            {y}
          </option>
        ))}
      </select>

      {/* 월 선택 */}
      <select value={month} onChange={(e) => handleSelect("month", e.target.value)} 
        style={{
            border: "none",
            width: "80px",
            height: "30px",
            padding:"5px" ,
            background : "#f5f6f9" ,  marginLeft:"10px" ,
            color:"black" , fontSize:"14px"
        }}>
        <option value="">MM</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* 일 선택 */}
      <select value={day} onChange={(e) => handleSelect("day", e.target.value)} className="border p-2 rounded"
        style={{
            border: "none",
            width: "80px",
            height: "30px",
            padding:"5px" ,
            background : "#f5f6f9" ,
            color:"black" , fontSize:"14px" , marginLeft:"10px"
        }}>
        <option value="">DD</option>
        {days.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;
