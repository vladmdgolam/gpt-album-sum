import { toast } from "react-hot-toast"

export const Explanation = ({
  content,
  title = "Explaination",
}: {
  content: string
  title?: string
}) => {
  return (
    <>
      <div>
        <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
          {title}
        </h2>
      </div>
      <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
        <div
          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
          onClick={() => {
            navigator.clipboard.writeText(content)
            toast("Explanation copied to clipboard", {
              icon: "✂️",
            })
          }}
        >
          <p>{content}</p>
        </div>
      </div>
    </>
  )
}
