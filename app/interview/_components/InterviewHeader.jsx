import React from 'react'
import Image from 'next/image'

function InterviewHeader() {
  return (
    <div className="flex  space-x-4 py-4 bg-gray-100 shadow-sm rounded-xl">
      {/* Logo */}
      <Image
        src="/logo.jpg"
        alt="InterVox Logo"
        width={80}
        height={80}
        className="rounded-lg object-cover"
      />

      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-wide leading-tight ">
        <span className="text-indigo-900">Inter</span>
        <span className="text-blue-400">Vox</span>
      </h1>
    </div>
  )
}

export default InterviewHeader
