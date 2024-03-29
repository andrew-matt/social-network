import {addPost, PostType} from 'components/Profile/profile-reducer';
import MyPosts from './MyPosts';
import {AppRootStateType} from 'app/store';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

type MapStateToPropsType = {
    posts: PostType[]
}

type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPost(newPostText))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;