import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostType} from '../../../Redux/Profile-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

export type MyPostsPropsType = {
    posts: Array<PostType>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () => void
}

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const onSubmit = (formData: MyPostsFormDataType) => {
        console.log(formData);
    };

    let postElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>
                    My posts
                </h3>
                <MyPostsReduxForm onSubmit={onSubmit}/>
                <div className={s.posts}>
                    {postElements}
                </div>
            </div>
        </div>
    );
};

type MyPostsFormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const MyPostsForm: React.FC<InjectedFormProps<MyPostsFormDataType> & MyPostsPropsType> = (props) => {

    let onAddPost = () => {
        props.addPost();
    };

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value);
    };

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name={'my posts'} component={'textarea'} onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
        </form>
    );
};

// @ts-ignore
export const MyPostsReduxForm = reduxForm<MyPostsFormDataType>({form: 'my posts'})(MyPostsForm);

export default MyPosts;