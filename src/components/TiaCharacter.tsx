import React, { useState, useEffect } from 'react';

interface TiaCharacterProps {
  mood?: 'happy' | 'thinking' | 'explaining' | 'celebrating';
  message?: string;
  showSpeechBubble?: boolean;
}

const TiaCharacter: React.FC<TiaCharacterProps> = ({ 
  mood = 'happy', 
  message = "Hi! I'm TIA 👋",
  showSpeechBubble = true 
}) => {
  const [eyesBlink, setEyesBlink] = useState(false);
  const [armWave, setArmWave] = useState(false);

  useEffect(() => {
    // Blinking animation
    const blinkInterval = setInterval(() => {
      setEyesBlink(true);
      setTimeout(() => setEyesBlink(false), 150);
    }, 3000);

    // Arm waving animation
    const waveInterval = setInterval(() => {
      setArmWave(true);
      setTimeout(() => setArmWave(false), 1000);
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(waveInterval);
    };
  }, []);

  const getMoodStyles = () => {
    switch (mood) {
      case 'thinking':
        return {
          eyebrows: 'transform: translateY(2px)',
          mouth: 'border-radius: 50% 50% 50% 50%',
          headTilt: 'transform: rotate(-5deg)'
        };
      case 'explaining':
        return {
          eyebrows: 'transform: translateY(-1px)',
          mouth: 'width: 8px; height: 4px; border-radius: 50%',
          headTilt: 'transform: rotate(2deg)'
        };
      case 'celebrating':
        return {
          eyebrows: 'transform: translateY(-2px)',
          mouth: 'width: 10px; height: 6px; border-radius: 50%',
          headTilt: 'transform: rotate(0deg)'
        };
      default:
        return {
          eyebrows: 'transform: translateY(0px)',
          mouth: 'width: 6px; height: 3px; border-radius: 0 0 50px 50px',
          headTilt: 'transform: rotate(0deg)'
        };
    }
  };

  const moodStyles = getMoodStyles();

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        
        {/* Main character container */}
        <div className="relative bg-white rounded-full p-8 shadow-2xl border-4 border-white/50 backdrop-blur-sm">
          <div className="w-64 h-64 relative">
            {/* Head with mood-based tilt */}
            <div 
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-24 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full transition-transform duration-500"
              style={{ transform: `translateX(-50%) ${moodStyles.headTilt.split(': ')[1]}` }}
            >
              {/* Hair */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-gradient-to-b from-amber-800 to-amber-700 rounded-full"></div>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-28 h-16 bg-gradient-to-b from-amber-700 to-amber-600 rounded-t-full"></div>
              
              {/* Hair accessories */}
              <div className="absolute -top-1 left-3 w-3 h-3 bg-pink-400 rounded-full"></div>
              <div className="absolute -top-1 right-3 w-3 h-3 bg-blue-400 rounded-full"></div>
              
              {/* Eyebrows with mood */}
              <div 
                className="absolute top-6 left-4 w-4 h-1 bg-amber-800 rounded-full transition-transform duration-300"
                style={{ transform: moodStyles.eyebrows }}
              ></div>
              <div 
                className="absolute top-6 right-4 w-4 h-1 bg-amber-800 rounded-full transition-transform duration-300"
                style={{ transform: moodStyles.eyebrows }}
              ></div>
              
              {/* Eyes with blinking */}
              <div className={`absolute top-8 left-5 w-3 h-3 bg-gray-800 rounded-full transition-all duration-150 ${eyesBlink ? 'h-1' : 'h-3'}`}></div>
              <div className={`absolute top-8 right-5 w-3 h-3 bg-gray-800 rounded-full transition-all duration-150 ${eyesBlink ? 'h-1' : 'h-3'}`}></div>
              
              {/* Eye sparkles */}
              <div className="absolute top-8 left-6 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-8 right-6 w-1 h-1 bg-white rounded-full"></div>
              
              {/* Nose */}
              <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-orange-300 rounded-full"></div>
              
              {/* Mouth with mood */}
              <div 
                className="absolute top-14 left-1/2 transform -translate-x-1/2 border-b-2 border-gray-700 transition-all duration-300"
                style={{ 
                  width: moodStyles.mouth.includes('width') ? moodStyles.mouth.split('width: ')[1].split(';')[0] : '6px',
                  height: moodStyles.mouth.includes('height') ? moodStyles.mouth.split('height: ')[1].split(';')[0] : '3px',
                  borderRadius: moodStyles.mouth.includes('border-radius') ? moodStyles.mouth.split('border-radius: ')[1] : '0 0 50px 50px'
                }}
              ></div>
              
              {/* Cheeks */}
              <div className="absolute top-10 left-1 w-2 h-2 bg-pink-200 rounded-full opacity-60"></div>
              <div className="absolute top-10 right-1 w-2 h-2 bg-pink-200 rounded-full opacity-60"></div>
            </div>
            
            {/* Body */}
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-lg">
              {/* Shirt details */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-80"></div>
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full opacity-60"></div>
            </div>
            
            {/* Arms with waving animation */}
            <div className={`absolute top-32 left-12 w-12 h-4 bg-orange-300 rounded-full transition-transform duration-500 ${armWave ? 'animate-wave' : 'transform rotate-12'}`}></div>
            <div className="absolute top-32 right-12 w-12 h-4 bg-orange-300 rounded-full transform -rotate-12"></div>
            
            {/* Hands */}
            <div className="absolute top-34 left-8 w-3 h-3 bg-orange-300 rounded-full"></div>
            <div className="absolute top-34 right-8 w-3 h-3 bg-orange-300 rounded-full"></div>
            
            {/* Speech bubble */}
            {showSpeechBubble && (
              <div className="absolute -top-8 -right-8 bg-white rounded-lg shadow-lg p-3 border-2 border-blue-200 animate-float max-w-xs">
                <div className="text-sm font-medium text-blue-600">{message}</div>
                <div className="absolute bottom-0 left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-200 transform translate-y-full"></div>
              </div>
            )}
            
            {/* Floating elements based on mood */}
            {mood === 'celebrating' && (
              <>
                <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60">⭐</div>
                <div className="absolute bottom-8 left-4 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-40">🎉</div>
                <div className="absolute top-1/2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-50">✨</div>
              </>
            )}
            
            {mood === 'thinking' && (
              <div className="absolute -top-4 right-8 text-2xl animate-bounce">🤔</div>
            )}
            
            {mood === 'explaining' && (
              <div className="absolute -top-4 right-8 text-2xl animate-pulse">💡</div>
            )}
            
            {mood === 'happy' && (
              <>
                <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute bottom-8 left-4 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-40"></div>
                <div className="absolute top-1/2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-50"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiaCharacter;