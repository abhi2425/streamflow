export const voteReducer = (state, { type, payload }) => {
	switch (type) {
		case 'UP_VOTE_ADD':
			return {
				...state,
				upVote: [...state.upVote, payload],
				upVote_active: true,
				upVote_count: state.upVote_count + 1,
			}

		case 'UP_VOTE_REMOVE':
			return {
				...state,
				upVote: state.upVote.filter((name) => name !== payload),
				upVote_active: false,
				upVote_count: state.upVote_count - 1,
			}
		case 'DOWN_VOTE_ADD':
			return {
				...state,
				downVote: [...state.downVote, payload],
				downVote_active: true,
				downVote_count: state.downVote_count + 1,
			}

		case 'DOWN_VOTE_REMOVE':
			return {
				...state,
				downVote: state.downVote.filter((name) => name !== payload),
				downVote_active: false,
				downVote_count: state.downVote_count - 1,
			}
		case 'UPVOTED_ALREADY':
			return { ...state, upVote_active: true }
		case 'DOWNVOTED_ALREADY':
			return { ...state, downVote_active: true }
		default:
			return state
	}
}
