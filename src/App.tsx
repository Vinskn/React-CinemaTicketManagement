import "./App.css";
import FormInput from "./components/FormInput";
import History from "./components/History";

function App() {
    return (
        <main className="relative grid grid-cols-1 md:grid-cols-2 gap-2 p-5">
            <div className="absolute inset-0 bg-[url(/logoBG.svg)] bg-repeat-space bg-center opacity-10" />
            <FormInput />
            <History />
        </main>
    );
}

export default App;
