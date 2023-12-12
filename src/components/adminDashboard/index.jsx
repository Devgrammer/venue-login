import { useEffect, useState } from "react";
import { getAdminDetails, updatePrice } from "../../api"; // Import your API functions

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [customSongAmount, setCustomSongAmount] = useState(0);
  const [regularSongAmounts, setRegularSongAmounts] = useState([]);
  const [isChargingCustomers, setIsChargingCustomers] = useState(false);
  const token = localStorage.getItem("token"); 
  const adminId = localStorage.getItem("adminID");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAdminDetails(token, adminId);
        setData(response.data);
        setCustomSongAmount(response.data.amount?.category_6 || 0);
        setRegularSongAmounts([
          response.data.amount?.category_7 || 0,
          response.data.amount?.category_8 || 0,
          response.data.amount?.category_9 || 0,
          response.data.amount?.category_10 || 0,
        ]);
        setIsChargingCustomers(response.data.charge_customers || false);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    }
    fetchData();
  }, [token,adminId]);

  
  const handleUpdatePrices = async () => {
    try {
      const updatedAmounts = {
      category_6: parseInt(customSongAmount),
      category_7: parseInt(regularSongAmounts[0]),
      category_8: parseInt(regularSongAmounts[1]),
      category_9: parseInt(regularSongAmounts[2]),
      category_10: parseInt(regularSongAmounts[3]),
      };
     
      await updatePrice(token, adminId, updatedAmounts); 
     
      const updatedDetails = await getAdminDetails(token, adminId);
      setData(updatedDetails.data);
    } catch (error) {
      console.error("Error updating prices:", error);
    }
    alert('Price updated successfully!')
  };
  const handleRadioChange = (e) => {
    setIsChargingCustomers(e.target.value === "true");
  };
   const canSave = regularSongAmounts.every(
     (amount, index) => amount > [79, 59, 39, 19][index]
     );
     console.log("canSave: ", regularSongAmounts);
   const barChartData = [
     {
       category: "Custom",
       value: customSongAmount,
       color: "bg-violet-500",
     },
     {
       category: "Category 1",
       value: regularSongAmounts[0],
       color: "bg-violet-500",
     },
     {
       category: "Category 2",
       value: regularSongAmounts[1],
       color: "bg-violet-500",
     },
     {
       category: "Category 3",
       value: regularSongAmounts[2],
       color: "bg-violet-500",
     },
     {
       category: "Category 4",
       value: regularSongAmounts[3],
       color: "bg-violet-500",
     },
   ];

  return (
    <div className="dashboard-container flex flex-col gap-y-8 mx-auto w-[600px] m-12 box-border">
     
      <div className="w-full font-bold text-[32px] mx-auto text-center">
        {data.name}, {data.location} on DhunJam
      </div>

      <div className="customer-charger-main-container w-full   flex justify-between">
        <div className="question-container w-1/2 ">
          Do you want to charge your customers for requesting songs?
        </div>
        <div className="radio-boolean-response flex gap-x-4 mx-auto ">
          <div className="radio-btn-wrapper flex items-center gap-x-2">
            <input
              type="radio"
              value="true"
              className="radio-btn-yes bg-[#C2C2C2] accent-[#6741d9] border-[#C2C2C2]"
              name="chargeCustomers"
              checked={isChargingCustomers}
              onChange={handleRadioChange}
            />
            <label className="radio-response">Yes</label>
          </div>
          <div className="radio-btn-wrapper flex items-center gap-x-2">
            <input
              type="radio"
              className="radio-btn-yes bg-[#C2C2C2] accent-[#6741d9] border-[#C2C2C2]"
              name="chargeCustomers"
              value="false"
              checked={!isChargingCustomers}
              onChange={handleRadioChange}
            />
            <label className="radio-response">No</label>
          </div>
        </div>
      </div>

     
      {true && (
        <div className="flex flex-col gap-y-8">
         
          <div className="custom-song-wrapper w-full flex justify-between items-center">
            <label>Custom Song Request Amount:</label>
            <input
              type="number"
              value={customSongAmount}
              min={99}
              required
              disabled={!isChargingCustomers}
              className="border-2 bg-transparent h-[40px] border-[#C2C2C2] rounded-md w-[300px] px-4 "
              onChange={(e) => setCustomSongAmount(e.target.value)}
            />
          </div>

        
          <div className="regular-song-price-container w-full flex justify-between items-center gap-x-4 ">
            <div className="w-1/2 ">
              Regular Song Request Amounts (from high to low):
            </div>
            <div className="regular-amt-field-wrapper flex gap-x-2 mx-auto">
              {regularSongAmounts.map((amount, index) => (
                <input
                  key={index}
                  type="number"
                  value={amount}
                  disabled={!isChargingCustomers}
                  className="w-[60px] h-[40px] border text-center bg-transparent flex items-center justify-center border-[#C2C2C2] rounded-md"
                  onChange={(e) =>
                    setRegularSongAmounts((prevAmounts) => {
                      const updatedAmounts = [...prevAmounts];
                      updatedAmounts[index] = e.target.value;
                      return updatedAmounts;
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}

      
      {isChargingCustomers && (
        <div className="mt-8 h-[300px] relative border-2 border-t-0 border-r-0 px-4">
          <div className="grid grid-cols-5 gap-4">
            {barChartData.map((bar) => {
              const heit = bar.value / 0.5 + "px";

              return (
                <div key={bar.category} className=" flex flex-col gap-y-4">
                  <div
                    className={` absolute bottom-10 ${heit}  h-max-[280px] rounded-md text-center flex items-center justify-center font-semibold ${bar.color}`}
                    style={{ width: "20px", height: heit }}
                  >
                    <span className="ml-2 mt-2 text-sm transform rotate-[-90deg] text-white font-semibold  mx-auto mr-2">
                      {bar.value}
                    </span>
                  </div>
                  <div className="text-center absolute bottom-0">
                    {bar.category}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <button
        className={`w-full h-16 ${
          !isChargingCustomers || !canSave ? "bg-[#C2C2C2]" : "bg-[#6741D9]"
        } rounded-xl font-semibold hover:border hover:border-[#F0C3F1]`}
        onClick={handleUpdatePrices}
        disabled={!isChargingCustomers || !canSave}
      >
        Save
      </button>
    </div>
  );
};

export default AdminDashboard;
