import {AddPostActionCreator, PostType, UpdateNewPostTextActionCreator} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {ReduxStateType} from "../../../Redux/Redux-Store";
import {connect} from "react-redux";
import {Dispatch} from "redux";

type MapStateToPropsType = {
    posts: PostType[]
    newPostText: string
}

type MapDispatchToPropsType = {
    updateNewPostText: (text: string) => void
    addPost: () => void
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        updateNewPostText: (text: string) => {
            dispatch(UpdateNewPostTextActionCreator(text))
        },
        addPost: () => {
            dispatch(AddPostActionCreator())
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;