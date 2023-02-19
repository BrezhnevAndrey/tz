import axios from "axios";
import "normalize.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Main } from "./components/Main";
import { Viewing } from "./components/Viewing";
import { Сontrol } from "./components/Сontrol";
import { getData } from "./slice/dataSlice";

export const eID = 36555;
export const rID = "20872bb5-c12f-42ce-883f-b8e87b14e1c1";

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <HashRouter>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Viewing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/control" element={<Сontrol />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Main>
    </HashRouter>
  );
}
