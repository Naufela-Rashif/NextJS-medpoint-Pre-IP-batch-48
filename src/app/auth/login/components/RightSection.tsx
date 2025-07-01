'use client';

import Image from 'next/image';
import React from 'react';

export default function RightSection() {
  return (
    <div className="w-1/2 flex flex-col h-screen p-4">
      <div className="w-full h-full bg-gradient-to-b from-purple-700 to-violet-700 rounded-md mx-8 py-8 flex flex-col">

        <div className="flex justify-center">
          <Image
            src="/Mediverse-logo.png"
            width={160}
            height={160}
            alt="mediverse logo"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <Image
            src="/person.png"
            alt="ilustarion person"
            width={300}
            height={300}
            className="object-contain"
          />
          <h1 className="text-4xl text-center text-white leading-snug mt-4">
              Your Personal
            <br />
              Healthcare Assistant
          </h1>
        </div>

      </div>
    </div>
  );
}
