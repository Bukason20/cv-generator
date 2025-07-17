import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFolder } from 'react-icons/bs'
import { CiClock2 } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'
import { IoCheckmark } from 'react-icons/io5'
import { PiCertificate, PiUpload } from 'react-icons/pi'

function Home() {
  const features = [
    {icon: <GoPencil />, title: "Template Customization", body:"Easily customize certificate templates to match your brand and event."},
    {icon: <PiUpload />, title: "Bulk Uploads", body:"Upload recipient data in bulk for efficient certificate generation."},
    {icon: <AiOutlineUser />, title: "User Account Management", body: "Manage your certificates and user information securely."}
  ]

  const benefits = [
    {icon: <CiClock2 />, title: "Saves Time", body:"Generate certificates in minutes, saving you valuable time and effort."},
    {icon: <PiCertificate />, title: "Professional Certificates", body:"Create high-quality, professional-looking certificates that impress recipients."},
    {icon: <BsFolder />, title: "Efficient Management", body: "Easily manage and organize your certificates for future reference."}
  ]

  const pricingPlans = [
    {type:"Basic", price: "Free", duration:"Forever", btnText:"Get Started", features: ["Unlimited templates", "Basic Support"]},
    {type:"Pro", price: "$19", duration:"/month", btnText:"Choose plan", features: ["Unlimited templates", "Advanced Support", "Customer branding"]},
    {type: "Enterprise", price: "Contact us", btnText: "Contact Sales", features: ["Unlimited templates", "Dedicated Support", "Custom Integrations", "Volume Discounts"]}
  ]
  return (
    <div>
      <header className='home-cont min-h-[90vh] flex justify-center items-center'>
        <div className='text-center'>
          <h1 className='text-5xl font-extrabold text-white'>Generate Your Certificates Instantly</h1>
          <p className='text-2xl text-white'>Create professional certificates quickly and easily</p>
          <button className='rounded-2xl px-3 py-1 mt-5'>Start Now</button>

        </div>
      </header>

      <main className='p-8 max-w-5xl mx-auto'>
        <section className='my-16'>
          <h1 className='mb-3'>Our Features</h1>
          <p>Explore the powerful features that make our certificate generation service stand out.</p>  
          <div className="features">
            {features.map((feature, id) => (
              <div className="feature" key={id}>
                <div id='icon'>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>  
              </div>  
            ))}
          </div>
        </section>

        <section className='my-16'>
          <h1 className='mb-3'>Our Benefits</h1>
          <p>Discover the benefits of using our service for all your certificate needs.</p>  
          <div className="benefits">
            {benefits.map((benefit, id) => (
              <div className="benefit" key={id}>
                <div id='icon'>
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>  
              </div>  
            ))}
          </div>
        </section>

        <section className='my-16'>
          <h1>Choose the plan that's right for you</h1>
          <div className="prices">
            {pricingPlans.map((price, index) => (
              <div className='price' key={index}>
                <h3 className='text-lg font-bold'>{price.type}</h3>
                <h1 className='text-4xl font-bold'>{price.price}<span className='text-lg ml-1'>{price.duration}</span></h1>
                <button className='bg-gray-300 w-full my-4 rounded-2xl py-1 font-bold cursor-pointer'>{price.btnText}</button>
                {price.features.map((feature, index) => (
                  <div key={index} className='flex items-center gap-4'>
                    <IoCheckmark />
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            ))}  
          </div>
          
        </section>  
      </main>
      
    </div>
    
  )
}

export default Home