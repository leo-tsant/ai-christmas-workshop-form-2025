import Header from './components/Header';
import Footer from './components/Footer';
import WorkshopForm from './components/WorkshopForm';

function App() {
  return (
    <div className="min-h-screen bg-[rgb(3,12,27)] text-white font-sans flex flex-col">
      <Header />
      <WorkshopForm />
      <Footer />
    </div>
  );
}

export default App;
