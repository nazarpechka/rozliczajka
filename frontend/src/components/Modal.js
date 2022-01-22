const Modal = ({ hidden, children }) => {
  return (
    !hidden && (
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <div className="w-1/3 m-auto flex flex-col items-start bg-white rounded-md shadow-lg">
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
