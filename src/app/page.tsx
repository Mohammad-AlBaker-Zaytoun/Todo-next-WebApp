"use client";

import { useState, useEffect } from "react";
import { TodoList } from "@/components/TodoList"; 


type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
};

type TodoItemType = {
  id: string;
  title: string;
  complete: boolean;
};

export default function Home() {
  const [dateTime, setDateTime] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [todosCount, setTodosCount] = useState(0);
  const [completedTodos, setCompletedTodos] = useState(0);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const todosArray: TodoItemType[] = JSON.parse(storedTodos);
      updateTodoStats(todosArray);
    }

    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
    }, 1000);

    fetchWeather();

    return () => clearInterval(interval);
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
      const weatherData: WeatherData = await weatherResponse.json(); 
      setWeather(weatherData);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  };

  const updateTodoStats = (todosArray: TodoItemType[]) => {
    const totalTodos = todosArray.length;
    const completedCount = todosArray.filter((todo) => todo.complete).length;

    setTodosCount(totalTodos);
    setCompletedTodos(completedCount);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="absolute top-4 right-4 text-center space-y-4">
        {dateTime && <div className="text-lg font-semibold">{dateTime}</div>}

        {weather && (
          <div className="text-base font-medium text-gray-400">
            {weather.name}: {Math.round(weather.main.temp)}°C,{" "}
            {weather.weather[0].description}
          </div>
        )}

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
        <TodoList updateTodoStats={updateTodoStats} />
      </div>
    </div>
  );
}
