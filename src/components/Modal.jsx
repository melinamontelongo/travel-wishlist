export const Modal = ({ modalRef, body }) => {
    return (
        <div ref={modalRef} className="relative z-10 hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
            <div className="fixed inset-0 bg-gray-500 backdrop-blur-sm bg-opacity-50 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex md:min-h-full justify-center p-4 items-center sm:p-0">
                    <div className="relative rounded-lg shadow-xl transition-all sm:my-8 w-full md:w-3/4 lg:w-1/2 bg-zinc-900">
                        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4" >
                            <div>
                                <div className="mt-3 sm:mt-0 sm:ml-4 flex justify-center items-center">
                                    {body}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}