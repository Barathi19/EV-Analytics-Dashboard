import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div
      className="
      bg-card 
      p-6 
      rounded-lg 
      shadow 
      border
      border-gray-100
      hover:shadow-lg 
      hover:border-blue-300
      transition-all 
      duration-300 
      cursor-pointer
    "
    >
      <div className="flex items-center gap-4">
        {icon && <div className="text-primary text-3xl">{icon}</div>}
        <div>
          <p className="text-md font-medium text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-text">{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
