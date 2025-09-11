import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Awesome Hardware Test'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4ade80',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 20, color: '#71717a' }}>
          {'{ }'}
        </div>
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 10 }}>
          AWESOME HARDWARE TEST
        </div>
        <div style={{ fontSize: 32, color: '#a1a1aa', textAlign: 'center', maxWidth: 900 }}>
          Open Source Testing Tools & Frameworks
        </div>
        <div style={{ fontSize: 24, color: '#71717a', marginTop: 40 }}>
          Test Execution • Wafer Maps • Instrument Control
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}