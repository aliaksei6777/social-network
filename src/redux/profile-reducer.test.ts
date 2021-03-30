import profileReducer, {PostType} from "./profile-reducer";


test('correct text should added in new post text', () => {

    const initialState = {
        posts: [
            {id: 1, message: "Hi how are you?", likeCount: 10},
            {id: 2, message: "It's my first post!", likeCount: 15},
            {id: 3, message: "It's my second post!", likeCount: 35},
        ]as Array<PostType>,
        newPostText: ''
    }

    const newText = 'Hello! How are you?'
    const endState = profileReducer(initialState, {type: "UPDATE-NEW-POST-TEXT", newPostText: newText})

    expect(endState.newPostText).toBe(newText)
})

test ('post should be added in profile post', () => {

    const initialState = {
        posts: [
            {id: 1, message: "Hi how are you?", likeCount: 10},
            {id: 2, message: "It's my first post!", likeCount: 15},
            {id: 3, message: "It's my second post!", likeCount: 35},
        ]as Array<PostType>,
        newPostText: 'Hello! How are you?'
    }

    const endState = profileReducer(initialState, {type: "ADD-POST"})
    expect(endState.posts.length).toBe(4)
    expect(endState.posts[3].message).toBe('Hello! How are you?')
    expect(endState.posts[3].id).toBe(4)
})