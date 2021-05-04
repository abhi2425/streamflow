import React, { memo, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../../Components/FormComponents/FormInput/FormInput'
import PostBodyInput from '../../Components/PostsComponents/PostBodyInput/PostBodyInput'
import UploadImageInput from '../../Components/PostsComponents/UploadImageInput/UploadImageInput'
import { useGeneralContext } from '../../Contexts/GeneralContext'
import SaveAndCancel from '../../Components/UIComponents/SaveAndCancel/SaveAndCancel'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useUserContext } from '../../Contexts/UserContext'

const CreatePostVault = ({ post, editingMode }) => {
	const {
		userData: { username },
	} = useUserContext()
	const {
		createORupdatePost,
		isBtnLoading,
		user: { userName },
	} = useGeneralContext()
	const history = useHistory()
	const { register, errors, handleSubmit } = useForm({
		mode: 'onBlur',
	})
	const [titleError, setTitleError] = useState(false)

	let timer = null
	const onchangeHandler = (e) => {
		clearTimeout(timer)
		const title = e.target.value.replace(/\s/g, '-').toLowerCase()
		timer = setTimeout(async () => {
			try {
				const response = await axios.get(`/${userName}/post/${title}`)
				response && setTitleError(true)
			} catch (error) {
				setTitleError(false)
			}
		}, 2000)
	}
	const onSubmit = useCallback(
		async (data) => {
			const url = editingMode
				? `profile/post/update/${post?.title}`
				: 'profile/post/create'
			const method = editingMode ? 'PATCH' : 'POST'
			const success = editingMode ? 'Post Updated!' : 'Post Created!'
			const result = await createORupdatePost(method, url, success, data)
			result && history.push(`/profile/${username}`)
		},
		[editingMode, post?.title, createORupdatePost, history, username],
	)
	return (
		<form
			id='post'
			onSubmit={handleSubmit(onSubmit)}
			className='vault-style'
			style={{ width: '70rem' }}
		>
			<div className='form-action'>
				<FormInput
					label={`What's in your mind!`}
					name='title'
					type='text'
					placeholder='Just start typing...'
					reference={register({
						required: {
							message: 'Title is missing',
							value: true,
						},
						minLength: {
							message: 'Too Short title!',
							value: 6,
						},
					})}
					defaultValue={post && post.title?.replace(/-/g, ' ')}
					changeHandler={(e) => onchangeHandler(e)}
					error={errors}
				/>
				{titleError && (
					<p className='formError'>
						Title already taken! Plz choose different.
					</p>
				)}
			</div>
			<div className='form-action'>
				<PostBodyInput
					register={register}
					errors={errors}
					defaultValue={post && post.body}
					rows={editingMode ? '20' : '16'}
				/>
			</div>
			<div className='form-action'>
				<UploadImageInput register={register} />
			</div>
			<SaveAndCancel
				isBtnLoading={isBtnLoading}
				label={editingMode ? 'Update' : 'Save'}
			/>
		</form>
	)
}

export default memo(CreatePostVault)
