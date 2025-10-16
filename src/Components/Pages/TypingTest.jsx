import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyBoardText, { completionData } from "./KeyBoardText";
import { addNewRecord } from "./PreviousRecords";

const TypingTest = React.memo(() => {

    const [state, setState] = useState({
        timerLeft: null,
        isRunning: false,
        selectedTime: null,
        showTimeUpModal: false,
    });

    const handleTimeSelect = (time) => {

        if (state.isRunning) return;
        setState({
            ...state,
            timerLeft: time,
            isRunning: true,
            selectedTime: time,
            showTimeUpModal: false,
        });
    };

    useEffect(() => {
        let timer;
        if (state.isRunning && state.timerLeft > 0) {
            timer = setInterval(() => {
                setState((prevState) => ({
                    ...prevState,
                    timerLeft: prevState.timerLeft - 1,
                }));
            }, 1000);
        }

        if (state.timerLeft === 0 && state.isRunning) {
            setState((prevState) => ({
                ...prevState,
                isRunning: false,
                timerLeft: null,
                selectedTime: null,
                showTimeUpModal: true,
            }));
            clearInterval(timer);

        }
        return () => clearInterval(timer);
    }, [state.timerLeft, state.isRunning]);



    const closeTimeUpModal = () => {
        setState((prevState) => {
            return { ...prevState, showTimeUpModal: false };
        });
    }

    if (completionData) {
        addNewRecord(completionData);
    }
    const stopTimer = () => {
        setState((prevState) => ({
            ...prevState,
            isRunning: false,
            timerLeft: null,
            selectedTime: null,
        }));
    };
    return (
        <>
            <div className="flex  justify-between items-center h-20 md:p-2 pt-5 gap-4 md:gap-6">
                <div className="grid grid-cols-2 md:gap-4 gap-1 sm:grid-cols-2 md:flex md:flex-row md:justify-start h-auto p-1 md:w-fit">
                    <Button
                        onClick={() => handleTimeSelect(30)}
                        disabled={state.isRunning && state.selectedTime !== 30}
                        sx={{
                            background:
                                state.isRunning && state.selectedTime !== 30
                                    ? "#42403a"
                                    : "linear-gradient(230deg, #4e342e, #212121)",
                            color: "white",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                        }}>
                        30s
                    </Button>
                    <Button
                        onClick={() => handleTimeSelect(60)}
                        disabled={state.isRunning && state.selectedTime !== 60}
                        sx={{
                            background:
                                state.isRunning && state.selectedTime !== 60
                                    ? "#42403a"
                                    : "linear-gradient(230deg, #4e342e, #212121)",
                            color: "white",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                        }}>
                        60s
                    </Button>
                    <Button
                        onClick={() => handleTimeSelect(120)}
                        disabled={state.isRunning && state.selectedTime !== 120}
                        sx={{
                            background:
                                state.isRunning && state.selectedTime !== 120
                                    ? "#42403a"
                                    : "linear-gradient(230deg, #4e342e, #212121)",
                            color: "white",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                        }}
                    >
                        2min
                    </Button>
                    <Button
                        onClick={() => handleTimeSelect(300)}
                        disabled={state.isRunning && state.selectedTime !== 300}
                        sx={{
                            background:
                                state.isRunning && state.selectedTime !== 300
                                    ? "#42403a"
                                    : "linear-gradient(230deg, #4e342e, #212121)",
                            color: "white",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                        }}
                    >
                        5min
                    </Button>
                </div>
                {state.timerLeft && (
                    <p
                        className="rounded-full p-1 h-14 w-14 sm:h-18 sm:w-18 md:h-14 md:w-14 text-center flex justify-center items-center text-[#4e342e] font-bold sm:text-xl md:text-xl"
                        style={{
                            border: "8px solid transparent",
                            borderRadius: "50%",
                            background:
                                "linear-gradient(white, white) padding-box, linear-gradient(230deg, #4e342e, #212121) border-box",
                            backgroundOrigin: "border-box",
                            backgroundClip: "padding-box, border-box",
                        }}
                    >
                        {state.timerLeft}
                    </p>
                )}
            </div>

            <KeyBoardText selectedTime={state.selectedTime} isRunning={state.isRunning} stopTimer={stopTimer} showTimeUpModal={state.showTimeUpModal}
                closeTimeUpModal={closeTimeUpModal} />
        </>
    )
});

export default TypingTest