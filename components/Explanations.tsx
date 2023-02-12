import { Explanation } from "./Explanation"

export const Explanations = ({ explanations }: { explanations: string }) => {
  // split the string into an array of strings by '2.'
  const explanationsArray = explanations.split("2.")
  // if there is one element, return <Explanation/> with title "Explanation"
  // if there are two elements, return two <Explanation/> with title "Explanation" and "Ideas"

  return explanationsArray.length === 1 ? (
    <Explanation content={explanationsArray[0]} title="Explanation" />
  ) : (
    <>
      <Explanation content={explanationsArray[0]} title="Explanation" />
      <Explanation content={explanationsArray[1]} title="Puns" />
    </>
  )
}
