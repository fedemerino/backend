export default function ConfirmModal({ isOpenModal, confirmAction, cancelAction }) {
    return (
        isOpenModal ?
            <div className='fixed justify-center items-center flex inset-0 bg-black bg-opacity-50 backdrop-blur-0'>
                <div className='w-[800px] h-[250px] flex justify-center items-center bg-white bg-opacity-90 text-black rounded-md flex-col'>
                    <h2>Confirm action</h2>
                    <h3>Are you sure you want to proceed?</h3>
                    <h3>This action cannot be undone</h3>
                    <div className='flex gap-5 text-white mt-5'>
                        <button
                            onClick={confirmAction}
                            className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-lg'>
                            Confirm
                        </button>
                        <button
                            onClick={cancelAction}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-lg">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            : null
    );
}
