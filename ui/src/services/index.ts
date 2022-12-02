const API_STRING: string = "http://localhost:8081";
import { Grade } from "../components/Calculator/calculator.types";
import { settingData } from "../components/Calculator/settings.types";

export const handleCalculate = (values: Grade[]) => {
    return fetch(`${API_STRING}/calculate`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(values)
    });
};

export const handleSettingsPost = (values: settingData) => {
    return fetch(`${API_STRING}/settings`, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(values)
    });
};

export const handleSettingsGet = () => {
    return fetch(`${API_STRING}/settings`);
};
