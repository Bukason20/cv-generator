import React, { useState, useRef } from 'react'
import { certificate } from '../../assets'
import { authApi } from '../../api/axios'
import * as XLSX from 'xlsx' // Add at the top

const CertificateGenerator = () => {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('bulk')
  const [fileName, setFileName] = useState('')
  const [names] = useState([
    'Sophia Clark',
    'Ethan Reed',
    'Olivia Morgan',
    'Liam Carter',
    'Ava Kendra',
  ])
  const [singleName, setSingleName] = useState('')
  const [coords, setCoords] = useState({
    displayX: null,
    displayY: null,
    originalX: null,
    originalY: null,
  })

  const imageRef = useRef(null)

  
  const [bulkNames, setBulkNames] = useState([])
  const [bulkFirstName, setBulkFirstName] = useState(bulkNames ? bulkNames[0] : "")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
    const data = new Uint8Array(event.target.result)
    const workbook = XLSX.read(data, { type: 'array' })

    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json = XLSX.utils.sheet_to_json(worksheet)

    // Assume name is in a column titled "Name" or "name"
    const extractedNames = json.map((row) => row.Name || row.name).filter(Boolean)
    setBulkNames(extractedNames)
    
  }
  reader.readAsArrayBuffer(file)
}

  const handleImageClick = (e) => {
    const img = imageRef.current
    const rect = img.getBoundingClientRect()

    const displayX = e.clientX - rect.left
    const displayY = e.clientY - rect.top

    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height

    const originalX = Math.round(displayX * scaleX)
    const originalY = Math.round(displayY * scaleY)
    
    setCoords({
      displayX,
      displayY,
      originalX,
      originalY,
    })
    setBulkFirstName(bulkNames?.[0])
    // console.log(scaleX, img.naturalWidth, rect.width, displayX)
  }

  const adjustPosition = (deltaX, deltaY) => {
    if (coords.displayX === null || coords.displayY === null) return

    const newDisplayX = coords.displayX + deltaX
    const newDisplayY = coords.displayY + deltaY

    const img = imageRef.current
    const scaleX = img.naturalWidth / img.getBoundingClientRect().width
    const scaleY = img.naturalHeight / img.getBoundingClientRect().height

    const newOriginalX = Math.round(newDisplayX * scaleX)
    const newOriginalY = Math.round(newDisplayY * scaleY)

    setCoords({
      displayX: newDisplayX,
      displayY: newDisplayY,
      originalX: newOriginalX,
      originalY: newOriginalY,
    })
  }

  const submitCertificate = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(bulkNames)

  try {
    if (activeTab === 'single') {
      const certificateData = {
        name: singleName,
        x: coords.originalX,
        y: coords.originalY,
      }

      const response = await authApi.post('/api/cert/generate', certificateData)
      console.log(response.data)
    } else {
      const multipleCertificateData = {
        names: bulkNames,
        x: coords.originalX,
        y: coords.originalY,
      }
      const response = await authApi.post("/api/cert/generate-batch", multipleCertificateData)
      console.log(response.data)
    }
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Generate Certificates</h1>

      {/* Template Selection */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Template Selection</h2>
        <p className="text-gray-600 mb-4">Choose a template or upload your own.</p>
        <div className="flex gap-4">
          <button className="bg-gray-100 text-sm px-4 py-2 rounded-3xl font-bold hover:bg-gray-200">
            Browse Templates
          </button>
          <button className="bg-gray-100 text-sm px-4 py-2 rounded-3xl font-bold hover:bg-gray-200">
            Upload Template
          </button>
        </div>
      </section>

      {/* Recipient Info Tabs */}
      {/* Recipient Info Tabs */}
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-2">Recipient Information</h2>
      <div className="flex gap-4 border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('bulk')}
          className={`pb-2 ${activeTab === 'bulk' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
        >
          Bulk Upload
        </button>
        <button
          onClick={() => setActiveTab('single')}
          className={`pb-2 ${activeTab === 'single' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
        >
          Single Entry
        </button>
      </div>

      {activeTab === 'bulk' && (
        <div className="border border-dashed border-gray-300 p-6 text-center rounded-lg">
          <p className="mb-3 text-gray-500">Drag and drop a file here, or</p>
          <label className="inline-block px-4 py-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200">
            Upload File
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      )}

      {activeTab === 'single' && (
        <>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Enter Name</label>
            <input
              type="text"
              placeholder="Enter a name"
              className="border rounded w-full p-2"
              value={singleName}
              onChange={(e) => setSingleName(e.target.value)}
            />
          </div>
        </>
      )}
    </section>


      {/* Preview Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Preview Certificate</h2>
        {(fileName && activeTab=="bulk")  && (
          <p className="text-gray-600 text-sm mb-4">File name: {fileName}</p>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image + Rendered Name */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              <img
                ref={imageRef}
                src={certificate}
                alt="Certificate Preview"
                className="w-full h-auto block rounded border cursor-crosshair"
                onClick={handleImageClick}
              />

              {activeTab === 'bulk' &&
                bulkNames &&
                coords.displayX !== null &&
                coords.displayY !== null && (
                  <div
                    className="absolute whitespace-nowrap text-lg font-semibold text-black select-none"
                    style={{
                      left: `${coords.displayX}px`,
                      top: `${coords.displayY}px`,
                      transform: "translateY(-50%)"
                    }}
                  >
                    {bulkFirstName}
                  </div>
                )}

              {activeTab === 'single' &&
                singleName &&
                coords.displayX !== null &&
                coords.displayY !== null && (
                  <div
                    className="absolute whitespace-nowrap text-lg font-semibold text-black select-none"
                    style={{
                      left: `${coords.displayX}px`,
                      top: `${coords.displayY}px`,
                      transform: "translateY(-50%)"
                    }}
                  >
                    {singleName}
                  </div>
                )}

            </div>
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 text-sm text-gray-600">
            <h3 className="font-semibold mb-1">Certificate Preview</h3>
            <p>
              {activeTab === 'single'
                ? 'Click on the certificate to place the name.'
                : 'Bulk names will render in your final export.'}
            </p>

            {(activeTab === 'single' || activeTab === "bulk") && coords.displayX !== null && (
              <div className="mt-2">
                <p><strong>Display X:</strong> {Math.round(coords.displayX)}px</p>
                <p><strong>Display Y:</strong> {Math.round(coords.displayY)}px</p>
                <p><strong>Original X:</strong> {coords.originalX}px</p>
                <p><strong>Original Y:</strong> {coords.originalY}px</p>

                {/* Adjustment Buttons */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-1">Fine-Tune Position</h4>
                  <div className="flex flex-col items-center gap-1 text-sm">
                    <button
                      onClick={() => adjustPosition(0, -1)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      ↑ Up
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => adjustPosition(-1, 0)}
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        ← Left
                      </button>
                      <button
                        onClick={() => adjustPosition(1, 0)}
                        className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                      >
                        → Right
                      </button>
                    </div>
                    <button
                      onClick={() => adjustPosition(0, 1)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      ↓ Down
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recipient Names Preview (Bulk) */}
      {activeTab === "bulk" ? (
        <section className="mb-10">
          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'bulk' ? bulkNames : names).map((name, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>  
      ): ""}
      

      {/* Action Button */}
      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={submitCertificate}
        >
          {loading ? 'Loading...' : 'Confirm and Proceed'}
        </button>
      </div>
    </div>
  )
}

export default CertificateGenerator
