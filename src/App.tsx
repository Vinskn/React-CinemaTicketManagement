import "./App.css";
import FormInput from "./components/FormInput";
import History from "./components/History";

function App() {
    return (
        <main className="relative flex flex-col md:flex-row gap-2 p-5">
            <div className="absolute -z-20 inset-0 bg-[url(/logoBG.svg)] bg-repeat-space bg-center opacity-10" />
            <FormInput />
            <History />
        </main>
    );
}

export default App;
