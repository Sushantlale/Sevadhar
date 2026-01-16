// import Voice from '@react-native-voice/voice';
// import { useEffect, useState } from 'react';

// export const useVoiceSearch = (onResult: (text: string) => void) => {
//   const [isListening, setIsListening] = useState(false);

//   useEffect(() => {
//     Voice.onSpeechResults = (event) => {
//       const text = event.value?.[0];
//       if (text) onResult(text);
//       setIsListening(false);
//     };

//     Voice.onSpeechError = () => {
//       setIsListening(false);
//     };

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const startListening = async () => {
//     try {
//       setIsListening(true);
//       await Voice.start('en-IN');
//     } catch {
//       setIsListening(false);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await Voice.stop();
//       setIsListening(false);
//     } catch {}
//   };

//   return {
//     isListening,
//     startListening,
//     stopListening,
//   };
// };
