// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

import React from "react";

export const makeId = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

// Selector numbers (minutes)
const minNumbersList = [...Array(60).keys()]

export const minNumbers = minNumbersList.map(number =>
    <option value={number} key={number}>{number}</option>)

// Selector numbers (seconds)
const secNumbersList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
export const secNumbers = secNumbersList.map(number =>
        <option value={number} key={number}>{number}</option>)

// Tabata rounds selector. Show max 30 rounds
const roundNumbersList = [...Array(31).keys()]
export const roundNumbers = roundNumbersList.slice(1).map(number =>
       <option value={number} key={number}>{number}</option>)

// Timer type select
const timersTypeList = ["Stopwatch", "Countdown", "XY", "Tabata"]
export const timersTypes = timersTypeList.map(type =>
       <option value={type} key={type}>{type}</option>)


