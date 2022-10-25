import VideoCard from "../components/VideoCard"
import {useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { videoList } from "../store/actions/videoActions";
import ErrorBox from "../components/ErrorBox";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const Videos = () => {

  const [query, setQuery] = useState('');

  const videoListState = useSelector(state =>  state.videoListReducer)
  const { curPageVids, videos, loading, error } = videoListState;
  

  const totalPosts = videos.length;

  const [searchParams] = useSearchParams({});
  const page = [];
  for (const entry of searchParams.entries()) {
      page.push(entry)
  }

  const currentSearchParam = +searchParams.get('page');

  const dispatch = useDispatch();
  useEffect(()=>{
    if(!+searchParams.get('page')){
      dispatch(videoList(0));       
    }
    else if(searchParams.get('page')){
      dispatch(videoList(+searchParams.get('page')))
    }
  },[dispatch, searchParams.get('page')])

  console.log(query)
  console.log(videos[1].videoName)
    console.log(videos.filter( video => video.videoName.includes(query)))

  return (
    <div className="h-screen w-screen bg-theWhite  fixed top-10">
      <div className="w-full h-8 flex justify-center items-center pt-3">
      <span onClick={()=>setQuery('')} className="bg-superLightBlue rounded-l w-6 h-6 flex items-center justify-center sm:hover:cursor-pointer font-firstFont text-xs text-dark"><ClearRoundedIcon style={{fontSize:'14px'}}/></span>
      <input type='text' className="w-56 h-6 font-firstFont text-[12px] bg-superLightBlue text-right pr-2 outline-none " placeholder="جستجوی  بر اساس نام فیلم آموزشی" onChange={e=> setQuery(e.target.value)}/>
      <span className="bg-superLightBlue h-6 w-8 flex items-center justify-center text-xs rounded-r"><SearchOutlinedIcon/></span>
      <ul className="absolute w-64 bg-superLightBlue top-9 z-30 flex flex-col items-center text-xs">
        { query ? videos.filter( video => video.videoName.includes(query)).map( video => <li key={video.id} className='w-full text-center py-1 sm:hover:bg-lightBlue sm:hover:cursor-pointer font-firstFont'><Link to={`/videos/${video.id}`}>{video.videoName}</Link></li>) : null}
      </ul>
      </div>
      <div className=" flex flex-wrap justify-around  items-start gap-4 pb-24  pr-2 pl-2 pt-4  w-screen h-screen overflow-y-scroll">
      { loading ? <div className="w-full font-firstFont font-semibold text-dark text-center">... در حال دریافت</div> : error ? <ErrorBox error={error}/> 
      :(
        curPageVids.map(video => (
          <VideoCard key={video.id} video={video}/>
        ))
      )}
      <div className="w-full">
      <Pagination totalPosts={totalPosts} currentSearchParam={currentSearchParam}/>
      </div>
      </div>
    </div>
  )
}

export default Videos


