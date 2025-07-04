"use client"

import type React from "react"

interface FlagIconProps {
  className?: string
}

export const USFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg fill="none" aria-hidden="true" className={className} viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="us-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#us-a)">
      <path
        fill="#D02F44"
        fillRule="evenodd"
        d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
        clipRule="evenodd"
      />
      <path fill="#46467F" d="M0 .5h8.4v6.533H0z" />
      <g filter="url(#us-filter0_d)">
        <path
          fill="url(#us-paint0_linear)"
          fillRule="evenodd"
          d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
          clipRule="evenodd"
        />
      </g>
    </g>
    <defs>
      <linearGradient id="us-paint0_linear" x1=".933" x2=".933" y1="1.433" y2="6.1" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#F0F0F0" />
      </linearGradient>
      <filter
        id="us-filter0_d"
        width="6.533"
        height="5.667"
        x=".933"
        y="1.433"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)

export const UKFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="uk-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#uk-a)">
      <path fill="#0A17A7" d="M0 .5h19.6v14H0z" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
        clipRule="evenodd"
      />
      <path
        stroke="#DB1F35"
        strokeLinecap="round"
        strokeWidth=".667"
        d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
      />
      <path
        fill="#E6273E"
        fillRule="evenodd"
        d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
        clipRule="evenodd"
      />
    </g>
  </svg>
)

export const PortugalFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="pt-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#pt-a)">
      <path fill="#FF0000" d="M8.4 .5h11.2v14H8.4z" />
      <path fill="#006600" fillRule="evenodd" d="M0 14.5h8.4V.5H0v14z" clipRule="evenodd" />
      <circle cx="8.4" cy="7.5" r="2.5" fill="#FFD700" stroke="#000" strokeWidth="0.2" />
    </g>
  </svg>
)

export const SpainFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="es-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#es-a)">
      <path fill="#C60B1E" fillRule="evenodd" d="M0 3.5h19.6V.5H0v3z" clipRule="evenodd" />
      <path fill="#FFC400" fillRule="evenodd" d="M0 11.5h19.6V3.5H0v8z" clipRule="evenodd" />
      <path fill="#C60B1E" fillRule="evenodd" d="M0 14.5h19.6v-3H0v3z" clipRule="evenodd" />
    </g>
  </svg>
)

export const FranceFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#F5F5F5" strokeWidth=".5" rx="1.75" />
    <mask id="fr-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.1" height="13.5" x=".25" y=".75" fill="#fff" stroke="#fff" strokeWidth=".5" rx="1.75" />
    </mask>
    <g mask="url(#fr-a)">
      <path fill="#F44653" d="M13.067.5H19.6v14h-6.533z" />
      <path fill="#1035BB" fillRule="evenodd" d="M0 14.5h6.533V.5H0v14z" clipRule="evenodd" />
    </g>
  </svg>
)

export const GermanyFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="de-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#de-a)">
      <path fill="#262626" fillRule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clipRule="evenodd" />
      <path fill="#F01515" fillRule="evenodd" d="M0 9.833h19.6V5.167H0v4.666z" clipRule="evenodd" />
      <path fill="#FFD521" fillRule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clipRule="evenodd" />
    </g>
  </svg>
)

export const ItalyFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="it-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#it-a)">
      <path fill="#009246" fillRule="evenodd" d="M0 14.5h6.533V.5H0v14z" clipRule="evenodd" />
      <path fill="#CE2B37" d="M13.067.5H19.6v14h-6.533z" />
    </g>
  </svg>
)

export const BrazilFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#009739" rx="2" />
    <path fill="#FEDD00" d="M9.8 2.5L16.8 7.5L9.8 12.5L2.8 7.5L9.8 2.5z" />
    <circle cx="9.8" cy="7.5" r="2.5" fill="#012169" />
  </svg>
)

export const CanadaFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="ca-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#ca-a)">
      <path fill="#FF0000" fillRule="evenodd" d="M0 14.5h5V.5H0v14z" clipRule="evenodd" />
      <path fill="#FF0000" d="M14.6.5h5v14h-5z" />
      <path fill="#FF0000" d="M9.8 4l1.2 2.4h2.4l-1.8 1.2.6 2.4-1.8-1.2-1.8 1.2.6-2.4-1.8-1.2h2.4L9.8 4z" />
    </g>
  </svg>
)

export const NetherlandsFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="nl-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#nl-a)">
      <path fill="#AE1C28" fillRule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clipRule="evenodd" />
      <path fill="#21468B" fillRule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clipRule="evenodd" />
    </g>
  </svg>
)

export const BelgiumFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="be-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#be-a)">
      <path fill="#262626" fillRule="evenodd" d="M0 14.5h6.533V.5H0v14z" clipRule="evenodd" />
      <path fill="#FEDD00" d="M6.533.5h6.534v14H6.533z" />
      <path fill="#AE1C28" d="M13.067.5H19.6v14h-6.533z" />
    </g>
  </svg>
)

export const SwitzerlandFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#FF0000" rx="2" />
    <path fill="#fff" d="M8.4 4.5h2.8v6h-2.8z" />
    <path fill="#fff" d="M6 6.5h7.6v2H6z" />
  </svg>
)

export const AustriaFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="at-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#at-a)">
      <path fill="#ED2939" fillRule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clipRule="evenodd" />
      <path fill="#ED2939" fillRule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clipRule="evenodd" />
    </g>
  </svg>
)

export const SwedenFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#006AA7" rx="2" />
    <path fill="#FECC00" d="M0 6.5h6v2h13.6v-2H8V.5H6v6z" />
    <path fill="#FECC00" d="M6 8.5v6h2v-6h11.6v-2H8v2z" />
  </svg>
)

export const NorwayFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#EF2B2D" rx="2" />
    <path fill="#fff" d="M0 6h6v3h13.6V6H8V.5H6V6z" />
    <path fill="#fff" d="M6 9v5.5h2V9h11.6V6H8v3z" />
    <path fill="#002868" d="M0 6.5h6v2h13.6v-2H7V.5H6v6z" />
    <path fill="#002868" d="M6 8.5v6h1v-6h12.6v-1H7v1z" />
  </svg>
)

export const DenmarkFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#C60C30" rx="2" />
    <path fill="#fff" d="M0 6.5h6v2h13.6v-2H8V.5H6v6z" />
    <path fill="#fff" d="M6 8.5v6h2v-6h11.6v-2H8v2z" />
  </svg>
)

export const FinlandFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <path fill="#003580" d="M0 6.5h6v2h13.6v-2H8V.5H6v6z" />
    <path fill="#003580" d="M6 8.5v6h2v-6h11.6v-2H8v2z" />
  </svg>
)

export const IrelandFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="ie-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#ie-a)">
      <path fill="#009A49" fillRule="evenodd" d="M0 14.5h6.533V.5H0v14z" clipRule="evenodd" />
      <path fill="#FF7900" d="M13.067.5H19.6v14h-6.533z" />
    </g>
  </svg>
)

export const PolandFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="pl-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#pl-a)">
      <path fill="#DC143C" fillRule="evenodd" d="M0 14.5h19.6V7.5H0v7z" clipRule="evenodd" />
    </g>
  </svg>
)

export const CzechFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="cz-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#cz-a)">
      <path fill="#D7141A" fillRule="evenodd" d="M0 14.5h19.6V7.5H0v7z" clipRule="evenodd" />
      <path fill="#11457E" d="M0 .5L9.8 7.5L0 14.5z" />
    </g>
  </svg>
)

export const HungaryFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="hu-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#hu-a)">
      <path fill="#CD212A" fillRule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clipRule="evenodd" />
      <path fill="#436F4D" fillRule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clipRule="evenodd" />
    </g>
  </svg>
)

export const GreeceFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="gr-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#gr-a)">
      <path fill="#0D5EAF" d="M0 .5h7v7H0z" />
      <path fill="#fff" d="M3 .5h1v7H3z" />
      <path fill="#fff" d="M0 3h7v1H0z" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} fill={i % 2 === 0 ? "#0D5EAF" : "#fff"} d={`M0 ${0.5 + i * 1.556}h19.6v1.556H0z`} />
      ))}
    </g>
  </svg>
)

export const MexicoFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="mx-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#mx-a)">
      <path fill="#006847" fillRule="evenodd" d="M0 14.5h6.533V.5H0v14z" clipRule="evenodd" />
      <path fill="#CE1126" d="M13.067.5H19.6v14h-6.533z" />
    </g>
  </svg>
)

export const ArgentinaFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="ar-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#ar-a)">
      <path fill="#74ACDF" fillRule="evenodd" d="M0 5.167h19.6V.5H0v4.667z" clipRule="evenodd" />
      <path fill="#74ACDF" fillRule="evenodd" d="M0 14.5h19.6V9.833H0V14.5z" clipRule="evenodd" />
    </g>
  </svg>
)

export const ChileFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="cl-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#cl-a)">
      <path fill="#0039A6" d="M0 .5h6.533v7H0z" />
      <path fill="#D52B1E" fillRule="evenodd" d="M6.533 7.5h13.067v7H6.533v-7z" clipRule="evenodd" />
      <path fill="#fff" d="M3.267 3.5l.8 1.6h1.6l-1.2.8.4 1.6-1.2-.8-1.2.8.4-1.6-1.2-.8h1.6l.8-1.6z" />
    </g>
  </svg>
)

export const ColombiaFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="co-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#co-a)">
      <path fill="#FDE047" fillRule="evenodd" d="M0 7.5h19.6V.5H0v7z" clipRule="evenodd" />
      <path fill="#003893" fillRule="evenodd" d="M0 11h19.6V7.5H0V11z" clipRule="evenodd" />
      <path fill="#CE1126" fillRule="evenodd" d="M0 14.5h19.6V11H0v3.5z" clipRule="evenodd" />
    </g>
  </svg>
)

export const PeruFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask id="pe-a" style={{ maskType: "luminance" }} width="20" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#pe-a)">
      <path fill="#D91023" fillRule="evenodd" d="M0 14.5h6.533V.5H0v14z" clipRule="evenodd" />
      <path fill="#D91023" d="M13.067.5H19.6v14h-6.533z" />
    </g>
  </svg>
)

export const AustraliaFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#012169" rx="2" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
      clipRule="evenodd"
    />
    <path
      stroke="#DB1F35"
      strokeLinecap="round"
      strokeWidth=".667"
      d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
    />
    <path
      fill="#E6273E"
      fillRule="evenodd"
      d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
      clipRule="evenodd"
    />
    <g fill="#fff">
      <circle cx="15" cy="3" r="0.5" />
      <circle cx="17" cy="4" r="0.5" />
      <circle cx="16" cy="6" r="0.5" />
      <circle cx="14" cy="5" r="0.5" />
      <circle cx="15" cy="11" r="0.5" />
    </g>
  </svg>
)

export const NewZealandFlag = ({ className = "h-4 w-4" }: FlagIconProps) => (
  <svg className={className} fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#012169" rx="2" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M-.898-.842L7.467 4.8V-.433h4.667V4.8l8.364-5.642L21.542.706l-6.614 4.46H19.6v4.667h-4.672l6.614 4.46-1.044 1.549-8.365-5.642v5.233H7.467V10.2l-8.365 5.642-1.043-1.548 6.613-4.46H0V5.166h4.672L-1.941.706-.898-.842z"
      clipRule="evenodd"
    />
    <path
      stroke="#DB1F35"
      strokeLinecap="round"
      strokeWidth=".667"
      d="M13.067 4.933L21.933-.9M14.009 10.088l7.947 5.357M5.604 4.917L-2.686-.67M6.503 10.024l-9.189 6.093"
    />
    <path
      fill="#E6273E"
      fillRule="evenodd"
      d="M0 8.9h8.4v5.6h2.8V8.9h8.4V6.1h-8.4V.5H8.4v5.6H0v2.8z"
      clipRule="evenodd"
    />
    <g fill="#fff">
      <circle cx="14" cy="3" r="0.4" />
      <circle cx="16" cy="4" r="0.4" />
      <circle cx="15" cy="6" r="0.4" />
      <circle cx="13" cy="5" r="0.4" />
    </g>
  </svg>
)

// Map country codes to flag components
export const flagComponents: Record<string, React.ComponentType<FlagIconProps>> = {
  US: USFlag,
  GB: UKFlag,
  PT: PortugalFlag,
  ES: SpainFlag,
  FR: FranceFlag,
  DE: GermanyFlag,
  IT: ItalyFlag,
  BR: BrazilFlag,
  CA: CanadaFlag,
  NL: NetherlandsFlag,
  BE: BelgiumFlag,
  CH: SwitzerlandFlag,
  AT: AustriaFlag,
  SE: SwedenFlag,
  NO: NorwayFlag,
  DK: DenmarkFlag,
  FI: FinlandFlag,
  IE: IrelandFlag,
  PL: PolandFlag,
  CZ: CzechFlag,
  HU: HungaryFlag,
  GR: GreeceFlag,
  MX: MexicoFlag,
  AR: ArgentinaFlag,
  CL: ChileFlag,
  CO: ColombiaFlag,
  PE: PeruFlag,
  AU: AustraliaFlag,
  NZ: NewZealandFlag,
}

export const getFlagComponent = (countryCode: string): React.ComponentType<FlagIconProps> | null => {
  return flagComponents[countryCode] || null
}
