import React from 'react';
import s from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostType} from '../../../Redux/Profile-reducer';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../utils/validators';
import {Textarea} from '../../common/FormControls/FormControls';

export type MyPostsPropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

type MyPostsFormDataType = {
    newPostText: string
}

const maxLength10 = maxLengthCreator(10);

export const AddNewPostForm: React.FC<InjectedFormProps<MyPostsFormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field
                        name={'newPostText'}
                        component={Textarea}
                        validate={[required, maxLength10]}
                    />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
        </form>
    );
};

export const AddNewPostReduxForm = reduxForm<MyPostsFormDataType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    let onAddPost = (formData: MyPostsFormDataType) => {
        props.addPost(formData.newPostText);
    };

    let postElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

    return (
        <div className={s.postsBlock}>
            <div>
                <h3>
                    My posts
                </h3>
                <AddNewPostReduxForm onSubmit={onAddPost}/>
                <div className={s.posts}>
                    {postElements}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;