import texts from "../assets/lang/sk_SK.json";

export type textKey = keyof typeof texts;

export class TextParams{
    [key: string]: string;
}

const getText = (key: textKey, params?: TextParams) => {
    let text = texts[key] || key;
    if(!params) return text;

    Object.keys(params).forEach((param: string) => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}

export default getText;