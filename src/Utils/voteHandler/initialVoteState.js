export const initialVoteState = ({ upVote = [], downVote = [] }) => {
  return {
    upVote: [],
    upVote_count: upVote?.length,
    upVote_active: false,
    downVote: [],
    downVote_count: downVote?.length,
    downVote_active: false,
  }
}
