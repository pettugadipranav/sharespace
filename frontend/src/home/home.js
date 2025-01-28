import { useNavigate } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import Sidebar from "./Sidebar";
import Posts from "../post/Posts";
import Friendreq from "../friend/Friendreq";

export default function Home({user}){
    const history = useNavigate('');
    if (user === false) {
        history("/")
    }
    return (
        <>
            <HomeHeader user={user} />
              <div className='row justify-content-center d-flex pt-0'>
                <div className='col-12 col-lg-3 pt-3 '>
                      <Sidebar user={user} />
                      </div>
                      <div className='col-12 col-lg-6 pt-3'>
                      <div className="container d-flex justify-content-center">
                        <Posts user={user} state={false} />
                      </div>
                      </div>
                      <div className='col-12 col-lg-3 pt-3'>
                      <Friendreq user={user}/>
                      </div>
                
              </div>
        </>
    )
}