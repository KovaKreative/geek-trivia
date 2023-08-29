export default function Button(props) {
  return (
    <button
      className="w-1/3 h-12 rounded-xl bg-yellow-300 text-purple-700 text-xl font-bold hover:bg-yellow-200 hover:text-purple-500 active:bg-yellow-400 active:text-purple-700  transition"
      onClick={props.onClick}
    >
      {props.text || 'Button'}
    </button>
  );
}