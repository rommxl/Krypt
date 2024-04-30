import AreaCard from "./AreaCard";
import "./userCard.scss";

const AreaCards = () => {

  return (
    <section className="content-area-cards ">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Balance",
          value: `₹ ${JSON.parse(localStorage.getItem("customer")).balance}`,
          text: "Last 2 months transactions",
        }}
      />
    </section>
  );
};

export default AreaCards;