import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';


export const Call = () => {
    const [strikePrice, setStrikePrice] = useState("");
    const [optionsPrice, setOptionsPrice] = useState("");
    const [numOptions, setNumOptions] = useState("");
    const [fees, setFees] = useState("");

    const [totalCost, setTotalCost] = useState(0);
    const [breakeven, setBreakeven] = useState(0);

    const [expectedValue, setExpectedValue] = useState("");
    const [tradeValue, setTradeValue] = useState(0)

    const calculateCost = (e) => {
        e.preventDefault();
        let costs = (parseFloat(optionsPrice) * numOptions * 100 + parseFloat(fees)).toFixed(2)
        setTotalCost(costs);
        //Break even is when gain = loss
        let be = ((parseFloat(totalCost) / 100 / parseFloat(numOptions)) + parseFloat(strikePrice)).toFixed(2);
        setBreakeven(be)
    }
    const calculateTrade = (e) => {
        e.preventDefault();
        if (parseFloat(expectedValue) < parseFloat(strikePrice)) {
            setTradeValue(1 - totalCost);
        }
        else {
            let gains = (parseFloat(expectedValue) - parseFloat(strikePrice)) * parseInt(numOptions) * 100;
            setTradeValue((gains - totalCost).toFixed(2));
        }
    }
    return (
        <div>
            <div>
                <h2>Call</h2>
                <form>
                    <TextField value={strikePrice} type="number" inputProps={{ step: "0.01" }} onChange={e => { setStrikePrice(e.target.value) }} label="Strike Price" />
                    <TextField value={optionsPrice} type="number" inputProps={{ step: "0.01" }} onChange={e => { setOptionsPrice(e.target.value) }} label="Option Price" />
                    <TextField value={numOptions} type="number" inputProps={{ step: "1" }} onChange={e => { setNumOptions(e.target.value) }} label="Number of Options" />
                    <TextField value={fees} type="number" inputProps={{ step: "0.01" }} onChange={e => { setFees(e.target.value) }} label="Addtional Fees" />
                    <Button type="submit" variant="contained" color="primary" disableElevation onClick={calculateCost}>Submit</Button>
                </form>
            </div>
            <p>Total Cost: {totalCost}</p>
            <p>Breakeven: {breakeven}</p>
            <div>
                <h3>Expected Final Price</h3>
                <form>
                    <TextField value={expectedValue} type="number" inputProps={{ step: "0.01" }} onChange={e => { setExpectedValue(e.target.value) }} label="Expected Stock Price" />
                    <Button type="submit" variant="contained" color="primary" disableElevation onClick={calculateTrade}>Submit</Button>
                </form>
            </div>
            <div>
                Based on only intrinsic values, your profit/loss is:
                <h3>{tradeValue}</h3>
            </div>
        </div>
    )
}