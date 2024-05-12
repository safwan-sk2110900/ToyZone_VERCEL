import './globals.css'
import NavBar from './common/NavBar'
import Footer from './common/Footer'
export const metadata = {
  title: 'Welcome to ToyZone',
  description: 'Where Toys are for eveyone!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" />
        <link rel="icon" href="./images/logo/TZ_logo.2022-768x218.png" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css" />
        <title>ToyZone</title>
      </head>
      <body  className="bodySlide">
      <header>
          <NavBar/>
        </header>
        {children}
        <div className="space"></div>
        <footer>
          <Footer/>
        </footer>

      </body>
    </html >
  )
}