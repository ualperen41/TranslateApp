import { ArrowRight, Volume2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/slices/translateSlice";
import Loader from "./loader";

const TextContainer = () => {
  const { textToTranslate, translatedText, sourceLang, targetLang, isLoading } =
    useSelector((store) => store.translateReducer);
  const dispatch = useDispatch();

  // metni temizle
  const handleClear = () => {
    dispatch(setText(""));
  };

  // metni kopyala
  const handleCopy = () => {
    window.navigator.clipboard.writeText(translatedText);
  };

  // çevrilcek metni seslendir
  const handleSpeakSource = () => {
    if (!textToTranslate) return;

    //mevcut seslendirilen metni durdur
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToTranslate);

    if (sourceLang.value) {
      utterance.lang = sourceLang.value;
    }

    // window
    window.speechSynthesis.speak(utterance);
  };

  // çevrilmiş metni seslendir
  const handleSpeakTarget = () => {
    if (!translatedText) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(translatedText);

    utterance.lang = targetLang.value;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex gap-4 mt-6 lg:gap-8 flex-col lg:flex-row">
      {/* Çevirilecek Metin */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-zinc-300">Çevirilecek Metin</label>
          {textToTranslate && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSpeakSource}
                className="text-xs text-zinc-400 hover:text-zinc-300 flex gap-2"
              >
                <Volume2 className="size-4" />
                Seslendir
              </button>
              <button
                onClick={handleClear}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                Temizle
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <textarea
            value={textToTranslate}
            className="textarea"
            placeholder="Çevirmek istediğiniz metni buraya yazınız"
            onChange={(e) => dispatch(setText(e.target.value))}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-zinc-500 bg-zinc-100">
            {textToTranslate.length} karakter
          </div>
        </div>
      </div>
      {/* İkon */}
      <div className="flex items-center justify-center lg:flex-col">
        <div className="size-8 lg:size-12 bg-blue-600 rounded-full grid place-items-center">
          <ArrowRight className="size-4 lg:size-6 max-lg:rotate-90" />
        </div>
      </div>

      {/* Çevirilmiş Metin */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm text-zinc-300">Çevirilmiş Metin</label>
          {translatedText && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSpeakTarget}
                className="text-xs text-zinc-400 hover:text-zinc-300 flex gap-2"
              >
                <Volume2 className="size-4" />
                Seslendir
              </button>
              <button
                onClick={handleCopy}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                Kopyala
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <textarea
            className="textarea text-gray-300"
            disabled
            value={translatedText}
          ></textarea>

          {isLoading && <Loader />}

          {!isLoading && !translatedText && !textToTranslate && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-zinc-500 text-sm">Çeviri Bekleniyor</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextContainer;
