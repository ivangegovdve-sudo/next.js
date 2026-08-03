import { Comment, Reaction } from '../entities'

export default function Page() {
  return (
    <>
      <p id="reaction">{Reaction.name}</p>
      <p id="comment">{Comment.name}</p>
    </>
  )
}
