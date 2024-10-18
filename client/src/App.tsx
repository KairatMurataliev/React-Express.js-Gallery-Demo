import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Gallery from "./containers/Gallery";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Gallery/>}/>
            {/*<Route path="/login" element={<Login/>}/>*/}
            {/*<Route path="/gallery/:id" element={<Gallery/>}/>*/}
            {/*<Route path="/gallery/add" element={<SubmitNewPhoto/>}/>*/}
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
