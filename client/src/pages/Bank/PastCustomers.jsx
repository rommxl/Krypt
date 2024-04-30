import React from 'react'
import { Navbar,Footer } from '../../components'

import illustration from "../../assets/illustration-intro.png";

import { Fragment } from 'react';


const PastCustomers = () => {
  return (
    <Fragment>
    <div className="min-h-screen">
        <Navbar />
        <section className="p-8 relative gradient-bg-services flex">
      <div className="flex-1 pt-28 ">
        <article className="text-center max-w-3xl mx-auto ">
        <form className="my-8">
      <div className="flex flex-col items-center">
        <label htmlFor="bankName" className="text-white text-lg mb-2">
          Upload Already KYC Verified Customers Data
        </label>
        <input
          type="file"
          id="bankName"
          className="p-2 border rounded-md"
          required
        />
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
        </article>
      </div>

      <div className="flex-1">
        <img
          src={illustration}
          alt=""
          className="block mx-auto mb-10 lg:mb-20"
        />
      </div>
    </section>
        <Footer />
    </div>
  </Fragment>
  )
}

export default PastCustomers