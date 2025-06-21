import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Upload, CheckCircle, AlertCircle, Waves as Waveform, Brain, Volume2, RotateCcw, NotepadText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
//import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Lazyloading/Loader';
import RecordRTC from 'recordrtc';
import { Bounce, ToastContainer } from 'react-toastify';
const CorrectRead = () => {
  const { t, isRTL } = useLanguage();
  //const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [detectedVerse, setDetectedVerse] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [rightWords, setRightWords] = useState([]);
  const [wrongWords, setWrongWords] = useState([]);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
const baseUrl="https://nn-io-oops-bg.trycloudflare.com"
 const saveToHistory = (recordingData) => {
    const historyItem = {
      id: Date.now(),
      verseNumber: recordingData.detectedVerse || Math.floor(Math.random() * 7) + 1,
      verseText: recordingData.verseText || '',
      uploadDate: new Date().toISOString(),
      duration: formatDuration(recordingDuration),
      score: recordingData.score || Math.floor(Math.random() * 40) + 60,
      feedback: recordingData.feedback || (isRTL ? 'تم تحليل التسجيل بنجاح' : 'Recording analyzed successfully'),
      audioUrl: recordingData.audioUrl || null,
      detectedVerse: recordingData.detectedVerse,
      confidence: recordingData.confidence || Math.floor(Math.random() * 30) + 70
    };

    //const existingHistory = JSON.parse(localStorage.getItem(`uploadHistory_${user?.id}`) || '[]');
   // const updatedHistory = [historyItem, ...existingHistory];
  //  localStorage.setItem(`uploadHistory_${user?.id}`, JSON.stringify(updatedHistory));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        setRecordedBlob(recordedBlob);
        console.log(recordedBlob);
        stream.getTracks().forEach(track => track.stop());
        console.log(stream)
        
      };
      

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      setAnalysisResult(null);
      setDetectedVerse(null);
      
      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error(isRTL ? 'فشل في بدء التسجيل' : 'Failed to start recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(intervalRef.current);
    }
  };

  const playRecording = () => {
    if (recordedBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(recordedBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setRecordedBlob(file);

        setRecordingDuration(0); // We don't know the duration yet
        toast.success(isRTL ? 'تم رفع الملف بنجاح' : 'File uploaded successfully');
      } else {
        toast.error(isRTL ? 'يرجى رفع ملف صوتي فقط' : 'Please upload audio files only');
      }
    }
  };

  /*const analyzeRecording = async () => {
    if (!recordedBlob) {
      toast.error(isRTL ? 'لا يوجد تسجيل للتحليل' : 'No recording to analyze');
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);
      setAnalysisStep(isRTL ? 'جاري رفع التسجيل...' : 'Uploading recording...');

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

 

      setTimeout(() => {
        setAnalysisStep(isRTL ? 'جاري تحليل الصوت...' : 'Analyzing audio...');
      }, 1000);

      setTimeout(() => {
        setAnalysisStep(isRTL ? 'جاري اكتشاف الآية...' : 'Detecting verse...');
      }, 2000);

      setTimeout(() => {
        setAnalysisStep(isRTL ? 'جاري تقييم التلاوة...' : 'Evaluating recitation...');
      }, 3000);
      
      const formData = new FormData();
      formData.append('file', recordedBlob, 'recording.wav');  // upload
    
      const response = await axios.post(
        `${baseUrl}/model/upload`,
        formData
      );
      clearInterval(progressInterval);
      setUploadProgress(100);
console.log(response.data);

      // Mock verse detection and analysis
      const mockDetectedVerse = Math.floor(Math.random() * 7) + 1;
      const mockScore = Math.floor(Math.random() * 40) + 60;
      const mockConfidence = Math.floor(Math.random() * 30) + 70;

      const alFatihaVerses = [
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        'الرَّحْمَٰنِ الرَّحِيمِ',
        'مَالِكِ يَوْمِ الدِّينِ',
        'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
      ];

      const detectedVerseData = {
        verseNumber: mockDetectedVerse,
        verseText: alFatihaVerses[mockDetectedVerse - 1],
        confidence: mockConfidence
      };

   
 
    

      const analysisData = {
        score: mockScore,
        detectedVerse: mockDetectedVerse,
        verseText: alFatihaVerses[mockDetectedVerse - 1],
        confidence: mockConfidence,
        feedback: response.data?.analysis || (isRTL ? 
          `تم اكتشاف الآية ${mockDetectedVerse} من سورة الفاتحة بدقة ${mockConfidence}%. التلاوة جيدة مع بعض النقاط للتحسين.` :
          `Detected verse ${mockDetectedVerse} from Surah Al-Fatiha with ${mockConfidence}% confidence. Good recitation with some points for improvement.`
        ),
        audioUrl: URL.createObjectURL(recordedBlob)
      };

      setDetectedVerse(detectedVerseData);
      setAnalysisResult(analysisData);
      
      // Save to user's history
      //saveToHistory(analysisData);
      
      toast.success(t('success'));

    } catch (error) {
      console.error('Error analyzing recording:', error);
      
      // Fallback analysis for demo
      const mockDetectedVerse = Math.floor(Math.random() * 7) + 1;
      const mockScore = Math.floor(Math.random() * 40) + 60;
      const mockConfidence = Math.floor(Math.random() * 30) + 70;

      const alFatihaVerses = [
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        'الرَّحْمَٰنِ الرَّحِيمِ',
        'مَالِكِ يَوْمِ الدِّينِ',
        'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
      ];

      const fallbackData = {
        score: mockScore,
        detectedVerse: mockDetectedVerse,
        verseText: alFatihaVerses[mockDetectedVerse - 1],
        confidence: mockConfidence,
        feedback: isRTL ? 
          `تم اكتشاف الآية ${mockDetectedVerse} من سورة الفاتحة. تم حفظ التسجيل في التاريخ.` :
          `Detected verse ${mockDetectedVerse} from Surah Al-Fatiha. Recording saved to history.`,
        audioUrl: URL.createObjectURL(recordedBlob)
      };

    
      setAnalysisResult(fallbackData);
      saveToHistory(fallbackData);
      
      setUploadProgress(100);
      toast.success(isRTL ? 'تم تحليل التسجيل محلياً' : 'Recording analyzed locally');
    } finally {
      setLoading(false);
      setAnalysisStep('');
    }
  };*/

  const uploadRealTimeRecord=async()=>{
    setLoading(true)

    if (recordedBlob) {
      const ext = recordedBlob.type.split('/')[1]; // webm أو ogg
      const formData = new FormData();
      formData.append('file', recordedBlob, `recording.${ext}`);
  
      console.log('Uploading file:', {
        name: `recording.${ext}`,
        size: recordedBlob.size,
        type: recordedBlob.type,
      });
  
      try {
        const response = await fetch(`${baseUrl}/model/upload`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
  
        const result = await response.json();
        console.log(result);
        
        toast.success("تم رفع الصوت بنجاح");
        //setSurahNumber(result?.surah_number);
        //setSurahVerseNumber(result?.verse_number);
        //getSurahVerse(result?.verse_number);
        const alFatihaVerses = [
          'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          'الرَّحْمَٰنِ الرَّحِيمِ',
          'مَالِكِ يَوْمِ الدِّينِ',
          'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
          'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
          'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
        ];
        

        // افصل الكلمات من الآية المحددة
        const verseIndex = parseInt(result?.verse_number) - 1;
        const wordIndexes = result?.incorrect_indexes || [];
        
        const verseWords =
          verseIndex >= 0 && verseIndex < alFatihaVerses.length
            ? alFatihaVerses[verseIndex].split(' ')
            : [];
            setRightWords(verseWords)
        
        const wrongWords = wordIndexes
          .filter(index => typeof index === 'number' && index >= 0 && index < verseWords.length)
          .map(index => verseWords[index]);
          setWrongWords(wrongWords)
          console.log("✅ index list:", wordIndexes);
          console.log("✅ all verse words:", verseWords);
          console.log("✅ wrong words from verse:", wrongWords);
        setDetectedVerse({
          verseNumber: result.verse_number,
          verseText: alFatihaVerses[verseIndex],
          wrongWords,
          rightWords: verseWords,
          confidence: result.prediction_accuracy,
        });
       
        
        
 
        const analysisData = {
          //score: mockScore,
          detectedVerse: result.verse_number,
          verseText: alFatihaVerses[result.verse_number - 1],
          //confidence: mockConfidence,
          feedback:
          result?.model_response_message === "Correct Recitation"
            ? (isRTL ? "تم قراءة الآية بشكل صحيح" : "Correct Recitation")
            : result?.model_response_message === "The user recitation is incorrect"
            ? (isRTL ? "هناك خطأ في التلاوة، تأكد من القراءة الصحيحة" : "The user recitation is incorrect")
            : result?.model_response_message === "The model is incorrect"
            ? (isRTL ?" لم يتمكن النظام من تقييم التلاوة بشكل صحيح، يُرجى إعادة المحاولة. ": "The model is incorrect")
            : result?.model_response_message,
          audioUrl: URL.createObjectURL(recordedBlob)
        };
  
      
        setAnalysisResult(analysisData);
        
      }  catch (error) {
        console.error('Error uploading audio file:', error);
        toast.error(`خطأ في رفع ملف الصوت: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('لم يتم رفع ملف الصوت');
      setLoading(false);
    }
  }

  const resetRecording = () => {
    setRecordedBlob(null);
    setAnalysisResult(null);
    setDetectedVerse(null);
    setRecordingDuration(0);
    setUploadProgress(0);
    setAnalysisStep('');
    if (audioRef.current) {
      audioRef.current.src = '';
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="py-8 min-h-screen bg-gradient-to-br via-white from-primary-50 to-secondary-50">
       <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex justify-center items-center mb-6 w-20 h-20 bg-gradient-to-br rounded-full from-primary-500 to-secondary-500">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {isRTL ? 'تصحيح التلاوة الذكي' : 'Smart Recitation Correction'}
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            {isRTL ? 
              'ارفع تسجيلك الصوتي وسيقوم الذكاء الاصطناعي بتحديد الآية وتصحيح تلاوتك تلقائياً' :
              'Upload your audio recording and AI will automatically detect the verse and correct your recitation'
            }
          </p>
        </div>

        {/* Main Recording Interface */}
        <div className="overflow-hidden mb-8 bg-white rounded-3xl shadow-2xl">
          <div className="p-8 text-center text-white bg-gradient-to-r from-primary-600 to-secondary-600">
            <h2 className="mb-2 text-2xl font-bold">
              {isRTL ? 'مساعد التلاوة الذكي' : 'AI Recitation Assistant'}
            </h2>
            <p className="text-primary-100">
              {isRTL ? 'اكتشاف تلقائي للآيات وتصحيح فوري' : 'Automatic verse detection and instant correction'}
            </p>
          </div>

          <div className="p-8">
            {/* Recording Controls */}
            <div className="mb-8 text-center">
              {!recordedBlob ? (
                <div className="space-y-6">
                  {/* Recording Button */}
                  <div className="flex justify-center">
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="flex relative justify-center items-center w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg transition-all duration-300 transform group hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-xl"
                      >
                        <Mic className="w-12 h-12 text-white transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-red-400 rounded-full opacity-0 animate-pulse group-hover:opacity-20"></div>
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="flex relative justify-center items-center w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg transition-all duration-300 animate-pulse group"
                      >
                        <Square className="w-8 h-8 text-white" />
                        <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                      </button>
                    )}

                 
                  </div>

                  <div className="text-center">
                    <p className="mb-2 text-lg font-medium text-gray-700">
                      {isRecording ? 
                        (isRTL ? 'جاري التسجيل...' : 'Recording...') :
                        (isRTL ? 'اضغط للبدء في التسجيل' : 'Press to start recording')
                      }
                    </p>
                    {isRecording && (
                      <div className="flex justify-center items-center space-x-2 text-red-600 rtl:space-x-reverse">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="font-mono text-lg">{formatDuration(recordingDuration)}</span>
                      </div>
                    )}
                   
                  </div>

                  {/* File Upload Option */}
                  <div className="relative">
              
                    <div className="flex justify-center items-center">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="px-4 text-sm text-gray-500">
                        {isRTL ? 'أو' : 'or'}
                      </span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                    <div className="mt-4">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center mx-auto space-x-2 btn-secondary rtl:space-x-reverse"
                      >
                        <Upload className="w-5 h-5" />
                        <span>{isRTL ? 'رفع ملف صوتي' : 'Upload Audio File'}</span>
                  
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Recording Preview */}
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <div className="flex justify-center items-center mb-4 space-x-4 rtl:space-x-reverse">
                      <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br rounded-full from-primary-500 to-secondary-500">
                        <Waveform className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">
                          {isRTL ? 'تسجيل جاهز للتحليل' : 'Recording Ready for Analysis'}
                        </p>
                        <p className="text-gray-600">
                          {recordingDuration > 0 ? formatDuration(recordingDuration) : (isRTL ? 'ملف مرفوع' : 'Uploaded file')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 justify-items-center mt-6 sm:grid-cols-3">
                      {/* Replay Button - creative: gradient, left border, icon in circle */}
                      <button
                        onClick={resetRecording}
                        className="flex relative flex-col justify-center items-center w-40 h-16 text-base font-bold text-white bg-gradient-to-r from-green-700 to-green-500 rounded-lg border-l-4 border-green-900 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300 sm:w-44 sm:h-16 md:w-48 md:h-16"
                      >
                        <span className="flex absolute left-3 top-1/2 justify-center items-center w-9 h-9 bg-green-900 rounded-full shadow-md -translate-y-1/2"><RotateCcw className="w-5 h-5 text-white" /></span>
                        <span className="ml-8">{t('re_record')}<span className="hidden sm:inline"> {t('recording')}</span></span>
                      </button>

                      {/* Play Button - creative: glassmorphism, icon with pulse, border */}
                      <button
                        onClick={() => new Audio(URL.createObjectURL(recordedBlob)).play()}
                        className="flex relative flex-col justify-center items-center w-40 h-16 text-base font-bold text-green-900 rounded-lg border-2 border-green-400 shadow-lg backdrop-blur-md transition-transform duration-200 bg-white/80 hover:bg-green-50 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-400 sm:w-44 sm:h-16 md:w-48 md:h-16"
                      >
                        <span className="flex absolute left-3 top-1/2 justify-center items-center w-9 h-9 bg-green-200 rounded-full animate-pulse -translate-y-1/2"><Play className="w-5 h-5 text-green-700" /></span>
                        <span className="ml-8">{t('listen_to_my_voice')}<span className="hidden sm:inline"> {t('to_my_voice')}</span></span>
                      </button>

                      {/* Upload Button - creative: diagonal stripes, icon with ring, shadow */}
                      <button
                        onClick={uploadRealTimeRecord}
                        disabled={loading}
                        className={`relative flex flex-col justify-center items-center w-40 h-16 text-base font-bold text-white bg-green-600 rounded-lg shadow-xl overflow-hidden border-b-4 border-green-900 hover:scale-105 hover:shadow-2xl transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 sm:w-44 sm:h-16 md:w-48 md:h-16 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span className="flex absolute left-3 top-1/2 justify-center items-center w-9 h-9 bg-gradient-to-tr from-green-400 to-green-800 rounded-full ring-2 ring-green-200 -translate-y-1/2"><Upload className="w-5 h-5 text-white" /></span>
                        <span className="ml-8">{loading ? t('uploading') : t('upload_realtime_record')}</span>
                        {/* Decorative diagonal stripes */}
                        <span className="pointer-events-none absolute inset-0 opacity-10 bg-[repeating-linear-gradient(135deg,white_0_8px,transparent_8px,transparent_16px)]"></span>
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Analysis Progress */}
            {loading && (
              <div className="p-6 mb-6 bg-blue-50 rounded-2xl">
                <div className="mb-4 text-center">
                  <div className="inline-flex justify-center items-center mb-3 w-12 h-12 bg-blue-500 rounded-full">
                    <Brain className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-blue-900">
                    {isRTL ? 'جاري التحليل بالذكاء الاصطناعي' : 'AI Analysis in Progress'}
                  </h3>
                  <p className="text-blue-700">{analysisStep}</p>
                </div>
                
                <div className="mb-2 w-full h-3 bg-blue-200 rounded-full">
                  <div 
                    className="h-3 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-center text-blue-600">{uploadProgress}%</p>
              </div>
            )}

            {/* Detected Verse */}
            {detectedVerse && (
              <div className="p-6 mb-6 bg-green-50 rounded-2xl">
                <div className="flex justify-center items-center mb-4">
                  <CheckCircle className="mr-3 w-8 h-8 text-green-600 rtl:mr-0 rtl:ml-3" />
                  <h3 className="text-xl font-semibold text-green-900">
                    {isRTL ? 'تم اكتشاف الآية' : 'Verse Detected'}
                  </h3>
                </div>
            
         
                
                <div className="mb-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(detectedVerse.confidence)}`}>
                    {isRTL ? `دقة الاكتشاف: ${detectedVerse.confidence}%` : `Detection Confidence: ${detectedVerse.confidence}%`}
                  </span>
                </div>
              
                <div className="p-6 bg-white rounded-xl border-2 border-green-200">
                  <h4 className="mb-3 text-lg font-semibold text-center text-gray-900">
                    {isRTL ? `الآية ${detectedVerse.verseNumber} من سورة الفاتحة` : `Verse ${detectedVerse.verseNumber} from Surah Al-Fatiha`}
                  </h4>
                  <p className="text-2xl leading-loose text-center text-gray-800 arabic-text">
  {rightWords.map((word, index) => (
    <span
      key={index}
      className={wrongWords.includes(word) ? 'text-red-500 font-bold' : ''}
    >
      {word}{' '}
    </span>
  ))}
</p>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <div className="p-6 bg-gradient-to-br rounded-2xl from-primary-50 to-secondary-50">
                <div className="flex justify-center items-center mb-6">
                  <div className={`flex justify-center items-center mr-4 w-16 h-16 bg-gradient-to-br rounded-full from-primary-500 to-secondary-500 rtl:mr-0 rtl:ml-4`}>
                    <NotepadText className="w-8 h-8 text-white" />
                  
                  </div>
             
                </div>

                <div className="p-6 bg-white rounded-xl">
                  <h4 className="flex items-center mb-3 font-semibold text-gray-900">
                    <AlertCircle className="mr-2 w-5 h-5 text-primary-600 rtl:mr-0 rtl:ml-2" />
                    {isRTL ? 'ملاحظات وتوجيهات' : 'Feedback & Guidance'}
                  </h4>
                  <span className={`leading-relaxed text-gray-700 arabic-text px-5 py-2 mt-5 rounded-full ${getConfidenceColor(detectedVerse.confidence)}`}>
                    {analysisResult.feedback}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
              <Mic className="mr-2 w-5 h-5 text-primary-600 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'نصائح للتسجيل' : 'Recording Tips'}
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-primary-500"></span>
                <span>{isRTL ? 'تأكد من وجودك في مكان هادئ' : 'Ensure you\'re in a quiet environment'}</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-primary-500"></span>
                <span>{isRTL ? 'اقرأ بوضوح وبطء مناسب' : 'Recite clearly and at appropriate pace'}</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-primary-500"></span>
                <span>{isRTL ? 'احرص على مخارج الحروف الصحيحة' : 'Focus on correct pronunciation'}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
              <Brain className="mr-2 w-5 h-5 text-secondary-600 rtl:mr-0 rtl:ml-2" />
              {isRTL ? 'كيف يعمل النظام' : 'How It Works'}
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-secondary-500"></span>
                <span>{isRTL ? 'تحليل الصوت باستخدام نموذج HuBERT' : 'Audio analysis using HuBERT model'}</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-secondary-500"></span>
                <span>{isRTL ? 'اكتشاف تلقائي للآية المتلوة' : 'Automatic verse detection'}</span>
              </li>
              <li className="flex items-start space-x-2 rtl:space-x-reverse">
                <span className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-secondary-500"></span>
                <span>{isRTL ? 'تقييم دقيق لقواعد التجويد' : 'Precise Tajweed evaluation'}</span>
              </li>
            </ul>
          </div>
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default CorrectRead;