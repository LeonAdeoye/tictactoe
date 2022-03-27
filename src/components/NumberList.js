// Each list item needs a “key” which is a special string attribute you need to include when creating lists of elements without which you will get warnings in DevTools console.
// Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.
// A good rule of thumb is that elements inside the map() call need keys.
import React from "react";

function NumberList(props)
{
    const numbers = props.numbers;

    // The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.
    // This approach is preferred to using the index below.
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );

    // When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort.
    // We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state.
    const todoItems = numbers.map((number, index) =>
        // Only do this if items have no stable IDs
        <li key={index}>
            {number}
        </li>
    );

    // JSX allows embedding any expression in curly braces so we could inline the map() result.
    return (
        <ul>{ numbers.map((number, index) =>
            // Only do this if items have no stable IDs
            <li key={index}>
                {number}
            </li> )}
        </ul>
    );
}

export default NumberList;
