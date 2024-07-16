import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';


const Layout = ({children,title,description,author,keywords}) => {
  return (
    <div>
        <Helmet>
                <meta charSet="utf-8" />
                
                
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author}/>
  <title>{title}</title>


                
            </Helmet>
        <Header />
        <main className='min-h-[85vh]'>
        <Toaster />


          {children}
          
          </main>
        <Footer />
    </div>
  )
}

export default Layout