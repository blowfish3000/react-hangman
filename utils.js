import {english} from "./english.js"
import {french} from "./french.js"




export function getRandomWord(language){
    console.log("entered get random word with language:" + language)
    let words = []
    if (language==="fr"){
        words = french
        console.log("loading french")
    }
    else if (language === "en"){
        words= english
        console.log("loading english")
    }
    
    let randomIndex = Math.floor(Math.random() * words.length)
    return (words[randomIndex])
}


export function getFarewellText(language) {
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}