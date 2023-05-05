import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar />
      <SideBar />
      <Routes>{/* <Route path="*" element={<ErrorPage />} /> */}</Routes>
      <Footer />
    </Router>
  );
}

export default App;
