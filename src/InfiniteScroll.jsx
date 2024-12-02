import React, { useEffect, useState } from 'react'
import {CarsData} from "./data.js"

function InfiniteScroll() {
    const[content,setContent] = useState([])
    const[page,setPage] = useState(1)
    const[loading,setLoading] = useState(false)

    //Fetching data from api
    const fetchData = ()=>{
        setLoading(true)
        //console.log(data)
        setTimeout(()=>{
            setContent((pre)=>[...pre,...CarsData])
            setLoading(false)
        },1000)
    }

    // Handling the Scroll
    const handlescroll =()=>{
        const getContainerHeight = document.querySelector(".MainParent").scrollHeight
        const getWindowHeight = window.innerHeight + window.scrollY + 250
        //console.log(window.innerHeight,scrollY,getContainer.scrollHeight)
        if((getWindowHeight>getContainerHeight) && !loading){
            setPage((Pre)=>Pre+1)
        } 
    }

    // Scroll event
    useEffect(()=>{
        window.addEventListener("scroll",handlescroll)
        //console.log("mount")
        return()=>{
            window.removeEventListener("scroll",handlescroll)
            //console.log("removed")
        }
    },[loading])

    //Calling Api when page count Incremented
    useEffect(()=>{
        fetchData()
    },[page])


  return (
    <div className='MainParent'>
        <h2>React Infinite Scroll</h2>
        <div className='Content'>
            {content ? content.map((val,idx)=>(
                <div key={idx} className='card'>
                    <p>Id : {val.id}</p>
                    <p>Maker : {val.make}</p>
                    <p>Model : {val.model}</p>
                    <p>Transmission: {val.transmission}</p>
                    <p>Fuel Type : {val.fuelType}</p>
                    <p>Color : {val.color}</p>
                    <p>Price : Rs.{val.price}/-</p>
                </div>
            )):""}
    
            {loading ? <div className='Loading'>Loading....</div>:""}
        </div>
    </div>
  )
}

export default InfiniteScroll