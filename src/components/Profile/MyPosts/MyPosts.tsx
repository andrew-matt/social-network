import React from 'react'
import style from './MyPosts.module.css'
import {Post} from './Post/Post'
import {PostType} from 'components/Profile/profile-reducer'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {maxLength200, postRequired} from 'utils/validators/validators'
import {Textarea} from 'components/common/FormControls/FormControl'
import {reset} from 'redux-form';
import {useDispatch} from 'react-redux'

export type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
    ownerProfilePhoto: null | { small: string, large: string }
}

type MyPostsFormDataType = {
    newPostText: string
}

export const AddNewPostForm: React.FC<InjectedFormProps<MyPostsFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} spellCheck={'false'} className={style.formWrapper}>
            <Field
                name={'newPostText'}
                component={Textarea}
                validate={[postRequired, maxLength200]}
                placeholder={'Type a new post'}
                cols={50}
                rows={5}
                className={style.textArea}
            />
            <button className={style.button}>Add post</button>
        </form>
    )
}

export const AddNewPostReduxForm = reduxForm<MyPostsFormDataType>({form: 'ProfileAddNewPostForm', touchOnBlur: false})(AddNewPostForm)

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const dispatch = useDispatch();

    let onAddPost = (formData: MyPostsFormDataType) => {
        props.addPost(formData.newPostText)
        dispatch(reset('ProfileAddNewPostForm'))
    }

    let postElements = props.posts.map(post => <Post key={post.id} message={post.message}
                                                     likesCount={post.likesCount} ownerProfilePhoto={props.ownerProfilePhoto}/>)

    return (
        <div className={style.postsBlock}>
            <div className={style.postsTitle}>My posts</div>
            <AddNewPostReduxForm onSubmit={onAddPost}/>
            <div>
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts