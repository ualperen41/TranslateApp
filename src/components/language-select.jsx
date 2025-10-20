import { ArrowLeftRight } from "lucide-react";
import Select from "react-select";
import { customStyles } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import {
  handleSwap,
  setSource,
  setTarget,
} from "../redux/slices/translateSlice";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { isLoading, languages } = useSelector(
    (store) => store.languageReducer
  );
  const { sourceLang, targetLang } = useSelector(
    (store) => store.translateReducer
  );
  /*
   * React select veriyi {language,name} formatında istediği için api'dan gelen veriyi güncelle:
   * languages dizisini mapleyip nesnelerin key değerini yeniden adlandır
   * language > value
   * name > label
   * useMemo kullanarak render anında hesaplamayıı gereksiz yere tekrar yapmasının önüne geçtik
   */

  const formatted = useMemo(
    () =>
      languages?.map((item) => ({
        value: item.language,
        label: item.name,
      })),
    [languages]
  );

  // dili algıla seçeneği
  const detect = { label: "Dili Algıla", value: undefined };

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-col lg:flex-row">
        {/* Kaynak Dil */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-zinc-300 mb-2">Kaynak Dil</label>
          <Select
            value={sourceLang}
            isLoading={isLoading}
            isDisabled={isLoading}
            options={[detect, ...formatted]}
            styles={customStyles}
            className="text-sm text-black"
            onChange={(lang) => dispatch(setSource(lang))}
          />
        </div>

        {/* Değiştirme Butonu */}
        <div className="flex items-center justify-center">
          <button
            disabled={!sourceLang.value || isLoading}
            onClick={() => dispatch(handleSwap())}
            className="size-10 lg:size-12 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:opacity-50 rounded-full flex justify-center items-center cursor-pointer"
          >
            <ArrowLeftRight />
          </button>
        </div>
        {/* Hedef Dil */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-zinc-300 mb-2"> Hedef Dil</label>
          <Select
            value={targetLang}
            isLoading={isLoading}
            isDisabled={isLoading}
            options={formatted}
            styles={customStyles}
            className="text-sm text-black"
            onChange={(lang) => dispatch(setTarget(lang))}
          />
        </div>
      </div>
      {/* Dil Sayısı */}
      <div className="text-center">
        <p className="text-xs text-zinc-500">156 Dil Destekleniyor</p>
      </div>
    </div>
  );
};

export default LanguageSelect;
