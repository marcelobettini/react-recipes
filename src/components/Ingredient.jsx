import React from "react";

export default function Ingredient({ amount, measurement, name }) {
  return (
    <li>
      {name} {amount} {measurement}
    </li>
  );
}
