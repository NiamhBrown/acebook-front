import { Link } from 'react-router-dom';
import ProfilePicture from "./ProfilePicture/ProfilePicture";
import "../../css/post.css"


export const Friend = ({friend}) => {
    return (
        <div className="single-friend">
            <ProfilePicture userId={friend._id}/>
            <Link to = {`/profile/${friend._id}`} className='username-hyperlink'>{friend.forename} {friend.surname}</Link>
        </div>
    )

};