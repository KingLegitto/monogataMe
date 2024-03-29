import { useState, useCallback, useEffect, useRef } from 'react'

import PlotElements from './PlotElements.jsx'
import { ZoomContext } from '../App.tsx'
import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSelector } from 'react-redux'


const StoryTimeline = ({points, setPoints, mouseTracking, entryCounter, setCounter, newPoints, setTracking, setMidPoint, track,
deletePoint, updatePoint, midPoint, mouseX, mouseY, showPoints}) => {
  
  const plotDragConstraints = useRef(null)

  const { workableArea } = useSelector((state) => state.overallStates)
  const {setSelectionArea, selectionArea, slider} = useContext(ZoomContext)
  
  // const [editModeLimiter, setEditModeLimiter] = useState(false)

  useEffect(()=>{
    document.querySelector('.zoom').style.transition = '0.3s'
  }, [])
  
  
  // FUNCTION TO HANDLE ADDING POINTS ON THE BACKGROUND ACCORDING TO THE MOUSE POSITION
   const handleBgClick = ()=>{

    if(mouseTracking == true){
      
      // alert('hello')

      setSelectionArea(false)
      setCounter(entryCounter + 1)
      document.querySelector('.bg').style.cursor = 'default'
  
      points.push({_id: entryCounter, x: midPoint?midPoint:mouseX, y: mouseY, pointTitle: '[ Empty... ]', pointDetails: '-----',
      bg: midPoint?'#000000bb':'#eeeeeee5', type: midPoint?'section':'plot'})
      setPoints(points)
      // console.log(points)
      newPoints.push({_type: 'plotPoints', x: midPoint?midPoint:mouseX, y: mouseY, pointTitle: '[ Empty... ]', pointDetails: '-----',
      bg: midPoint?'#000000bb':'#eeeeeee5', type: midPoint?'section':'plot'})

      document.querySelector('.bg').removeEventListener('click', track)
      setTracking(false)
      setMidPoint(false)
      // console.log(points)
    }
   }

  return ( 
    <>

    <motion.div className='colorHighLow duration-[0.5s] rounded-[50px] absolute z-[6] top-0 left-0 right-0 mx-auto'
    style={{opacity: selectionArea? 1: 0, height: workableArea.height, width: workableArea.width}}>

    </motion.div>
    
    

    {/* CLICKABLE BACKGROUND  ///////////////////////////////////////////////////////// */}
    <motion.div ref={plotDragConstraints} className='bg pointsParent rounded-[50px] absolute z-[7] left-0 right-0 mx-auto' onClick={handleBgClick}
    style={{height: workableArea.height, width: workableArea.width}}>
      {/* PLOT POINTS  //////////////////////////////////////////////////////// */}
      {showPoints && points && points.map((entry)=>{
        return(
              <PlotElements key={entry._id} plotDragConstraints={plotDragConstraints} points={points}
              bgColor={entry.bg} x={entry.x} y={entry.y} pointTitle={entry.pointTitle} pointDetails={entry.pointDetails}
              type={entry.type} deletePoint={deletePoint} updatePoint={updatePoint} keyID={entry._id}/>
        )
        })
      }
    </motion.div>
    

      
    </>

   );
}
 
export default StoryTimeline;