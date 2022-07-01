import {AddPost, PostType} from '../../../Redux/Profile-reducer';
import MyPosts from './MyPosts';
import {ReduxStateType} from '../../../Redux/Redux-Store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

type MapStateToPropsType = {
    posts: PostType[]
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

const mapStateToProps = (state: ReduxStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(AddPost(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;