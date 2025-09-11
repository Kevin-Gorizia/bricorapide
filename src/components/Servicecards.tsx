import React, { type ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  desc: string;
  price: string;
  icon?: ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  desc,
  price,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-sm text-gray-600">À partir de</div>
        <div className="text-xl font-bold text-primary">{price}</div>
      </div>
    </div>
  );
};

export default ServiceCard;
