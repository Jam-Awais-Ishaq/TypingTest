import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

export default function LeaderBoard() {


    const baseData = [
        { test: "Test 1", wpm: 45 },
        { test: "Test 2", wpm: 52 },
        { test: "Test 3", wpm: 48 },
        { test: "Test 4", wpm: 55 },
        { test: "Test 5", wpm: 60 },
        { test: "Test 6", wpm: 57 },
        { test: "Test 7", wpm: 63 },
    ];

    const [waveData, setWaveData] = useState(baseData);

    const performanceData = [
        { test: "Test 1", wpm: 45 },
        { test: "Test 2", wpm: 52 },
        { test: "Test 3", wpm: 48 },
        { test: "Test 4", wpm: 55 },
        { test: "Test 5", wpm: 60 },
        { test: "Test 6", wpm: 57 },
        { test: "Test 7", wpm: 63 },
    ];

    const ranks = [
        { id: 1, name: "You", wpm: 63, accuracy: "95%" },
        { id: 2, name: "Alice", wpm: 59, accuracy: "92%" },
        { id: 3, name: "John", wpm: 56, accuracy: "90%" },
        { id: 4, name: "David", wpm: 52, accuracy: "87%" },
        { id: 5, name: "Sara", wpm: 49, accuracy: "85%" },
    ];



    useEffect(() => {
        const interval = setInterval(() => {
            setWaveData((prev) =>
                prev.map((item, i) => ({
                    ...item,
                    
                    wpm:
                        baseData[i].wpm +
                        Math.sin(Date.now() / 500 + i) * 2.5, 
                }))
            );
        }, 100); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-[100%] ml-auto p-3 min-h-[20vh] bg-gray-50">
       
            <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
                <p className="text-gray-500">Your typing performance summary</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="bg-white shadow-md rounded-2xl p-5 text-center">
                    <h2 className="text-lg font-semibold text-gray-600">WPM</h2>
                    <p className="text-3xl font-bold text-indigo-600">63</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-5 text-center">
                    <h2 className="text-lg font-semibold text-gray-600">Accuracy</h2>
                    <p className="text-3xl font-bold text-indigo-600">95%</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-5 text-center">
                    <h2 className="text-lg font-semibold text-gray-600">Total Tests</h2>
                    <p className="text-3xl font-bold text-indigo-600">7</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-5 text-center">
                    <h2 className="text-lg font-semibold text-gray-600">Average WPM</h2>
                    <p className="text-3xl font-bold text-indigo-600">54</p>
                </div>
            </div>

            <div className="md:flex md:justify-between mt-3.5">
                <div className="mb-1 bg-white shadow-md rounded-2xl h-[250px] p-2 md:w-[48%]">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Overview</h2>
                    <ResponsiveContainer width="100%" height={190}>
                        <AreaChart data={waveData}>
                            <defs>
                                <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis dataKey="test" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="wpm"
                                stroke="#6366f1"
                                strokeWidth={3}
                                fill="url(#waveGradient)"
                                activeDot={{ r: 6 }}
                                isAnimationActive={false} 
                            />
                        </AreaChart>
                    </ResponsiveContainer>


                </div>

                <div className="bg-white shadow-md rounded-2xl p-3 h-[250px] md:w-[48%]">
                    <h2 className="text-xl font-semibold text-gray-800 ">Top Typists</h2>

                    <div className="max-h-[200px] overflow-y-auto rounded-lg">
                        <table className="w-full border-collapse">
                            <thead className="sticky top-0 bg-indigo-100 z-10">
                                <tr className="text-left">
                                    <th className="p-3 rounded-l-lg">Rank</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">WPM</th>
                                    <th className="p-3 rounded-r-lg">Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ranks.map((player) => (
                                    <tr
                                        key={player.id}
                                        className={`border-b ${player.name === "You"
                                            ? "bg-indigo-50 font-semibold text-indigo-700"
                                            : "hover:bg-gray-50"
                                            }`}
                                    >
                                        <td className="p-3">{player.id}</td>
                                        <td className="p-3">{player.name}</td>
                                        <td className="p-3">{player.wpm}</td>
                                        <td className="p-3">{player.accuracy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
