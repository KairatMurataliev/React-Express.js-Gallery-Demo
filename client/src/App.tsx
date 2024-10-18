import {LoginButton} from "@telegram-auth/react";
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";

function App() {
  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <div className="card">
          <LoginButton
            botUsername={'gallery_nodejs_bot'}
            onAuthCallback={(data) => {
              console.log(data);
            }}
            buttonSize='medium'
            cornerRadius={5}
            showAvatar={false}
            lang="en"
          />
        </div>
        <Container maxWidth="xl">
          <Routes>
            {/*<Route path="/" element={<Gallery/>}/>*/}
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
