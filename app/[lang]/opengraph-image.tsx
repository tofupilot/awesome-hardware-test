import { ImageResponse } from 'next/og'
import { Locale } from '@/lib/translations'

export const runtime = 'edge'

export const alt = 'Awesome Hardware Test'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ lang: Locale }> }) {
  try {
    const { lang } = await params
    const isEnglish = lang === 'en'
    
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #18181b 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4ade80',
            fontFamily: 'monospace',
            position: 'relative',
          }}
        >
          {/* Terminal brackets */}
          <div style={{ 
            fontSize: 48, 
            marginBottom: 20, 
            color: '#71717a',
            fontWeight: 'bold'
          }}>
            [{ }]
          </div>
          
          {/* Main title */}
          <div style={{ 
            fontSize: 64, 
            fontWeight: 'bold', 
            marginBottom: 20,
            lineHeight: 1.1,
            textAlign: 'center'
          }}>
            AWESOME HARDWARE TEST
          </div>
          
          {/* Subtitle */}
          <div style={{ 
            fontSize: 28, 
            color: '#a1a1aa', 
            textAlign: 'center', 
            marginBottom: 30,
            lineHeight: 1.3
          }}>
            {isEnglish 
              ? 'Open Source Testing Tools & Frameworks'
              : 'Outils et Frameworks Open Source'
            }
          </div>
          
          {/* Stats */}
          <div style={{ 
            fontSize: 20, 
            color: '#4ade80',
            textAlign: 'center'
          }}>
            50+ {isEnglish ? 'Tools' : 'Outils'} • 6+ {isEnglish ? 'Categories' : 'Catégories'} • {isEnglish ? 'Open Source' : 'Libre'}
          </div>
          
          {/* Language indicator */}
          <div style={{ 
            position: 'absolute',
            top: 30,
            right: 40,
            fontSize: 18,
            color: '#71717a',
            background: '#27272a',
            padding: '8px 16px',
            border: '1px solid #4ade80'
          }}>
            {lang.toUpperCase()}
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('OG Image generation error:', error)
    
    // Fallback simple image
    return new ImageResponse(
      (
        <div
          style={{
            background: '#18181b',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4ade80',
            fontFamily: 'monospace',
            fontSize: 72,
            fontWeight: 'bold'
          }}
        >
          AWESOME HARDWARE TEST
        </div>
      ),
      { ...size }
    )
  }
}