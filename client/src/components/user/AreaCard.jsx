import PropTypes from "prop-types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import React, { useState } from "react";


const AreaCard = ({ colors, percentFillValue, cardInfo }) => {
  const filledValue = (percentFillValue / 100) * 360; 
  const remainedValue = 360 - filledValue;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState("0");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBalanceChange = (e) => {
    setBalance(e.target.value || "0");
  };

  const handleBalanceSubmit = () => {

    closeModal();
  };

  const data = [
    { name: "Remaining", value: remainedValue },
    { name: "Spent", value: filledValue },
  ];

  const renderTooltipContent = (value) => {
    return `${(value / 360) * 100} %`;
  };

  const customModalStyles = {
    content: {
      width: "300px",
      height: "200px",
      margin: "auto",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      background: "linear-gradient(180deg, #FFFFFF 0%, #F8F9FC 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
      position: "absolute", // Add position: "absolute"
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
    },
  };
  
  

  return (
    <div className="rounded-md p-6 shadow-md white-glassmorphism">
      <div className="area-card white-glassmorphism text-white">
        <div className="area-card-info">
          <h3 className="info-title text-white">{cardInfo.title}</h3>
          <div className="info-value text-white">{cardInfo.value}</div>
          <p className="info-text text-white">{cardInfo.text}</p>
        </div>
        <div className="area-card-chart">
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx={50}
              cy={45}
              innerRadius={20}
              fill="#e4e8ef"
              paddingAngle={0}
              dataKey="value"
              startAngle={-270}
              endAngle={150}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={renderTooltipContent} />
          </PieChart>
        </div>

      </div>
    </div>
  );
};

export default AreaCard;

AreaCard.propTypes = {
  colors: PropTypes.array.isRequired,
  percentFillValue: PropTypes.number.isRequired,
  cardInfo: PropTypes.object.isRequired,
};
