'use client'

import React from 'react'

type Color = "red" | "green" | "grey";

type ButtonProps = {
    color: Color;
    context: string;
    onClick: () => void;
}

export default function RetroButton({color,context,onClick}:ButtonProps){
    const colorVariants = {
        red: 'bg-red-retro hover:bg-red-retro-hover focus:bg-red-retro-hover active:bg-red-retro-active',
        green: 'bg-green-retro hover:bg-green-retro-hover focus:bg-green-retro-hover active:bg-green-retro-active',
        grey:'bg-grey-retro hover:bg-grey-retro-hover focus:bg-grey-retro-hover active:bg-grey-retro-active',
      }

    const retroButtonClasses = `box-border border-b-6 border-x-6 border-gray-800
                         text-white text-lg
                        cursor-pointer inline-block
                        m-4 min-w-48 p-2 uppercase`
                        
    const retroButtonStyles = {
        borderBottom: '6px inset rgba(0,0,0,.5)',
        borderLeft: '6px inset rgba(0,0,0,.5)',
        borderRight: '6px inset rgba(255,255,255,.5)',
        borderTop: '6px inset rgba(255,255,255,.5)',
    }

    return (
    <button  
        className={`${colorVariants[color]} ${retroButtonClasses} font-VT323`} 
        style={retroButtonStyles}
        onClick={onClick}
    >
        {context}
    </button>
    );
}