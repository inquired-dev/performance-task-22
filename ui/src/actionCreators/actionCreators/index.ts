import {
    handleCalculate,
    handleSettingsPost,
    handleSettingsGet
} from "../../services";
import { Grade } from "../../components/Calculator/calculator.types";
import { settingData } from "../../components/Calculator/settings.types";
type Total = { total: Number };
type Settings = { assessments: Number; homework: Number; quiz: Number };
export const handlePostCalculate = async (values: Grade[]): Promise<Total> => {
    try {
        const res = await handleCalculate(values);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const handlePostSettings = async (val: settingData): Promise<string> => {
    try {
        const res = await handleSettingsPost(val);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const handleGetSettings = async (): Promise<Settings> => {
    try {
        const res = await handleSettingsGet();
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};
