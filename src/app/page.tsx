"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TodoList } from "@/components/TodoList"; // Use your TodoList component

export default function Home() {
  const [dateTime, setDateTime] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [todosCount, setTodosCount] = useState(0);
  const [completedTodos, setCompletedTodos] = useState(0);

  // Load todos and completed todos count from Local Storage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todosArray = JSON.parse(storedTodos);
      updateTodoStats(todosArray);
    }

    // Update date and time after component is mounted (client-side only)
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
    }, 1000);

    // Fetch weather info based on location (client-side only)
    fetchWeather();

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Fetch weather based on IP location
  const fetchWeather = async () => {
    try {
      const ipResponse = await fetch("https://ipapi.co/json/");
      const ipData = await ipResponse.json();
      const city = ipData.city;

      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_APIKEY;
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  };

  // Update both the total todos count and completed todos count
  const updateTodoStats = (todosArray: any[]) => {
    const totalTodos = todosArray.length;
    const completedCount = todosArray.filter((todo: any) => todo.complete)
      .length;

    setTodosCount(totalTodos);
    setCompletedTodos(completedCount);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="absolute top-4 right-4 text-center space-y-4">
        {/* Display DateTime */}
        {dateTime && <div className="text-lg font-semibold">{dateTime}</div>}

        {/* Display Weather Information right under DateTime */}
        {weather && (
          <div className="text-base font-medium text-gray-400">
            {weather.name}: {Math.round(weather.main.temp)}°C,{" "}
            {weather.weather[0].description}
          </div>
        )}

        {/* Display Total and Completed Todos */}
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-blue-500 text-white w-20 h-20 flex justify-center items-center rounded-full text-2xl animate-pulse">
            {todosCount}
          </div>
          <div className="text-gray-400">Added Todos</div>
          <div className="bg-green-500 text-white w-20 h-20 flex justify-center items-center rounded-full text-2xl animate-pulse">
            {completedTodos}
          </div>
          <div className="text-gray-400">Completed Todos</div>
        </div>
      </div>
      <div className="flex-grow p-6">
        <h1 className="text-4xl font-bold mb-4">Todo App</h1>
        {/* Pass updateTodoStats to TodoList to update counts */}
        <TodoList updateTodoStats={updateTodoStats} />
      </div>
    </div>
  );
}
