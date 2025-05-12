
import { Layout, MainDisplay } from './components/Display'
import { Footer } from './components/Footer'
import Header from './components/Header';
import { AppProvider } from './config/AppProvider'
import AppRouter  from './config/AppRoutes'

function App() {

  return (
    <>
      <AppProvider>
        <Layout>
          <Header/>
          <MainDisplay>
            <AppRouter/>
          </MainDisplay>
          <Footer/>
        </Layout>
      </AppProvider>      
    </>
  )
}

export default App
