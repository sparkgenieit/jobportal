import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({
  userBookedDates,
  blockedDates,
  onDateUpdate,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const isBlocked = (date) => {
    return blockedDates.some(
      (blockedDate) => date.toDateString() === blockedDate.toDateString()
    );
  };

  const isBooked = (date) => {
    return userBookedDates.some(
      (bookedDate) => date.toDateString() === bookedDate.toDateString()
    );
  };

  const getDatesInRange = (startDate, endDate) => {
    let dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (!isBlocked(currentDate) && !isBooked(currentDate)) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const handleDateChange = (date) => {
    if (isBlocked(date) || date < new Date()) return;

    if (startDate && hoverDate) {
      const newDates = getDatesInRange(startDate, date);
      onDateUpdate([...userBookedDates, ...newDates]);
      setStartDate(null);
      setHoverDate(null);
      setRefreshKey((prevKey) => prevKey + 1);
    } else {
      if (isBooked(date)) {
        const updatedDates = userBookedDates.filter(
          (d) => d.toDateString() !== date.toDateString()
        );
        onDateUpdate(updatedDates);
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        setStartDate(date);
        onDateUpdate([...userBookedDates, date]);
        setRefreshKey((prevKey) => prevKey + 1);
      }
    }
  };

  const handleMouseEnter = (date) => {
    if (startDate && !isBlocked(date) && date >= startDate) {
      setHoverDate(date);
    }
  };

  const resetBookings = () => {
    setStartDate(null);
    setHoverDate(null);
    setRefreshKey((prevKey) => prevKey + 1);
    onDateUpdate([]); // Reset all booked dates
  };

  const getDayClass = (date) => {
    if (isBlocked(date)) return "blocked";
    if (isBooked(date)) return "booked";
    if (startDate && hoverDate && date >= startDate && date <= hoverDate)
      return "hovered-green"; // Highlight the range in green
    return "available"; // Available dates
  };

  return (
    <div className="container p-1">
      <DatePicker
        key={refreshKey}
        selected={null}
        onChange={handleDateChange}
        inline
        filterDate={(date) => !isBlocked(date) && date >= new Date()}
        dayClassName={getDayClass}
        onDayMouseEnter={handleMouseEnter}
        minDate={new Date()}
        onClickOutside={() => {}}
      />
      <div className="text-left mt-4"> 
        <button
          className="p-2 bg-red-500 text-white rounded"
          onClick={resetBookings}
        >
          Reset Bookings
        </button>
      </div>
    {/*  <div className="mt-6">
        {userBookedDates.length > 0 && (
          <p className="text-lg">
            User Booked Dates:{" "}
            {userBookedDates.map((d) => d.toDateString()).join(", ")}
          </p>
        )}
      </div>  */}

      {/* Inline Styles */}
      <style jsx>{`
        .hovered-green {
          background-color: #28a745; /* Green color */
          color: white;
        }

        .booked {
          background-color: green;
          color: #fff;
        }

        .blocked {
          background-color: #dc3545;
          color: #fff;
        }

        .available {
          background-color: #fff;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default DatePickerComponent;
