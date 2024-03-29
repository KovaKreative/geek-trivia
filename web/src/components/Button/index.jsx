export default function Button(props) {
  return (
    <button
      className="p-2 min-w-fit w-1/3 min-h-12 rounded-xl disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-yellow-500 bg-yellow-200 text-purple-700 text-2xl font-bold hover:bg-yellow-100 hover:text-purple-500 active:bg-yellow-400 active:text-purple-700 transition"
      onClick={
        e => {
          e.preventDefault();
          props.onClick();
        }
      }
      disabled={props.disabled}
      text={props.text}
    >
      {props.text || 'Button'}
    </button>
  );
}