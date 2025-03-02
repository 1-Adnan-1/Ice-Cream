import Header from "./components/header";
import Home from "./pages/home/index";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-orange-500 text-white py-8 2xl:py-12 px-[5%]">
      <Header />
      <Home />
    </div>
  );
};

export default App;
