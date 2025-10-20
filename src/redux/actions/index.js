import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { Target } from "lucide-react";

export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    const res = await api.get("/languages");
    return res.data.languages;
  }
);

// Çeviri işlemini gerçekleştiricek asenkron thunk aksiyonu
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (_, { getState }) => {
    // thunk aksiyonu içerisinden store'da tutulan veriye erişme
    const { translateReducer } = getState();

    // api'a çeviri için istek at
    const res = await api.post("", {
      q: translateReducer.textToTranslate,
      source: translateReducer.sourceLang.value,
      target: translateReducer.targetLang.value,
    });

    // aksiyonun payload'ını return et
    return res.data.data.translations.translatedText[0];
  }
);
