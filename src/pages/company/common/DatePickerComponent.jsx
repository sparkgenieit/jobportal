import React, { useState, useMemo, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ 
  userBookedDates = [], 
  blockedDates = [], 
  onDateUpdate, 
  selectSingleDay = false, 
  noOfMonths = 0 
}) => {
  const [startDate, setStartDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const isSingleDayMode = selectSingleDay;

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString("en-NZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).split("/").reverse().join("-");
  };

  const blockedSet = useMemo(() => new Set(blockedDates.map(formatDate)), [blockedDates]);
  const bookedSet = useMemo(() => new Set(userBookedDates.map(formatDate)), [userBookedDates]);

  const isBlocked = (date) => blockedSet.has(formatDate(date));
  const isBooked = (date) => bookedSet.has(formatDate(date));

  useEffect(() => {
    setSelectedDates(userBookedDates);
    if (isSingleDayMode && userBookedDates.length > 0) {
      setStartDate(userBookedDates[0]);
    }
  }, [userBookedDates, isSingleDayMode]);

  const handleDateChange = (date) => {
    if (isBlocked(date) || date < new Date()) return;

    if (isSingleDayMode) {
      setStartDate(date);
      setSelectedDates([date]);
      onDateUpdate([date]);
    } else {
      let updatedDates = isBooked(date)
        ? selectedDates.filter((d) => formatDate(d) !== formatDate(date))
        : [...selectedDates, date];

      setSelectedDates(updatedDates);
      onDateUpdate(updatedDates);
    }
  };

  const getDayClass = (date) => {
    if (date < new Date()) return ""; // No background for past dates
    if (isBlocked(date)) return "blocked";
    if (isBooked(date)) return "booked";
    if (isSingleDayMode && startDate && formatDate(date) === formatDate(startDate)) return "single-day-selected";
    return "available";
  };

  const endDate = startDate && noOfMonths > 0 
    ? new Date(startDate.getFullYear(), startDate.getMonth() + noOfMonths, startDate.getDate() - 1) 
    : null;

  return (
    <div className="container p-2">
      <DatePicker
        selected={isSingleDayMode ? startDate : null}
        onChange={handleDateChange}
        inline
        filterDate={(date) => !isBlocked(date) && date >= new Date()}
        dayClassName={getDayClass}
        minDate={new Date()}
        highlightDates={selectedDates}
      />

      {isSingleDayMode && startDate && noOfMonths > 0 && (
        <div className="mt-4 p-2 bg-gray-200 rounded">
          <strong>Ad booked from {startDate.toDateString()} to {endDate.toDateString()}</strong>
        </div>
      )}

      {!isSingleDayMode && (
        <div className="text-left mt-4">
          <button 
            type="button" 
            className={`p-2 text-white rounded ${selectedDates.length ? "bg-red-500" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={() => {
              setSelectedDates([]);
              onDateUpdate([]);
            }}
            disabled={!selectedDates.length}
          >
            Reset Bookings
          </button>
        </div>
      )}

      <style jsx>{`
        .single-day-selected {
          background-color: green !important;
          color: white !important;
        }
        .booked {
          background-color: green;
          color: #fff;
        }
        .blocked {
          background-color: #dc3545;
          color: #fff;
        }
        .available:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default DatePickerComponent;
