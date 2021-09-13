import React, {useEffect} from 'react';
import './Counter.css';
import {useDispatch, useSelector} from "react-redux";
import {addCounter, decrease, fetchCounter, fetchCounterRec, increase, subtract} from "../../store/actions";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  useEffect(() => {
     dispatch(fetchCounterRec());
  },[dispatch, counter]);

  const increaseCounter = () => {
    dispatch(increase());
  }
  const addCounterH = () => dispatch(addCounter(5));
  const decreaseCounter = () => dispatch(decrease());
  const minusCounter = () => dispatch(subtract(5));

  return (
    <div className="Counter">
      <h1>{counter}</h1>
      <button onClick={increaseCounter}>Increase</button>
      <button onClick={decreaseCounter}>Decrease</button>
      <button onClick={addCounterH}>Increase by 5</button>
      <button onClick={minusCounter}>Decrease by 5</button>
    </div>
  );
};

export default Counter;