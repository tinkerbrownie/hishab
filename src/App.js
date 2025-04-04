import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calculator } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function MealSplitCalculator() {
  const [restaurantName, setRestaurantName] = useState("");
  const [people, setPeople] = useState([{ name: "", basic: 0 }]);
  const [equalCost, setEqualCost] = useState(0);
  const [variableCost, setVariableCost] = useState(0);
  const [calculatorValue, setCalculatorValue] = useState("");
  const [activeField, setActiveField] = useState(null);

  const handlePersonChange = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = field === "name" ? value : parseFloat(value) || 0;
    setPeople(updatedPeople);
  };

  const addPerson = () => {
    setPeople([...people, { name: "", basic: 0 }]);
  };

  const openCalculator = (field) => {
    setActiveField(field);
    setCalculatorValue("");
  };

  const insertCalculatorValue = (val) => {
    setCalculatorValue((prev) => prev + val);
  };

  const clearCalculator = () => {
    setCalculatorValue("");
  };

  const applyCalculator = () => {
    try {
      const value = parseFloat(eval(calculatorValue));
      if (!isNaN(value)) {
        if (typeof activeField === "number") {
          handlePersonChange(activeField, "basic", value);
        } else if (activeField === "equal") {
          setEqualCost(value);
        } else if (activeField === "variable") {
          setVariableCost(value);
        }
      }
    } catch (e) {
      alert("Invalid expression");
    }
  };

  const clearAll = () => {
    setRestaurantName("");
    setPeople([{ name: "", basic: 0 }]);
    setEqualCost(0);
    setVariableCost(0);
  };

  const totalBasic = people.reduce((sum, p) => sum + p.basic, 0);
  const summary = people.map((p) => {
    const proportionalShare = totalBasic ? (p.basic / totalBasic) * variableCost : 0;
    const equalShare = equalCost / people.length;
    const totalOwed = p.basic + equalShare + proportionalShare;
    return { ...p, equalShare, proportionalShare, totalOwed };
  });

  const totalOwedSum = summary.reduce((sum, p) => sum + p.totalOwed, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Meal Split Calculator</h1>
      {/* UI content continues as per canvas... */}
    </div>
  );
}
