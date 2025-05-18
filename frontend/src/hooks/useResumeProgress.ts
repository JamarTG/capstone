import { Dispatch, SetStateAction, useEffect } from 'react'

//@ts-ignore
const useResumeProgress = (session:any,setCurrentIndex:Dispatch<SetStateAction<number>>) => {
  useEffect(() => {
    if (session?.session?.currentQuestionIndex !== undefined) {
      setCurrentIndex(session.session.currentQuestionIndex);
    }
  }, [session]);
}

export default useResumeProgress
