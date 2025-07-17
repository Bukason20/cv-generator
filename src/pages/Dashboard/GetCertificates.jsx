import React, { useEffect, useState } from 'react'
import { authApi } from '../../api/axios'
import { certificate } from '../../assets'

function GetCertificates() {
  const [certificates, setCertificates] = useState()

  const getMyCertificates = async () => {
    try {
      const response = await authApi.get("/api/cert/my-certificates")
      const data = response.data

      console.log(data)
      if (response.status === 200) {
        setCertificates(data.certificates)
      }
    } catch (err) {
      console.error("Error fetching certificates:", err)
    }
  }

  useEffect(() => {
    getMyCertificates()
  }, [])

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generate Certificates</h1>
      {certificates &&<p>You have {certificates.length} certificates</p> }
      <div>
        {certificates ? (
          <div className='grid grid-cols-3 gap-2'>
            {certificates.map((certificate, id) => (
              <div key={id}>
                <img src={certificate.url} alt="" />
              </div>
            ))}
          </div>
        ) : (
          "Loading"
        )}
      </div>  
    </div>
      
  )
}

export default GetCertificates
