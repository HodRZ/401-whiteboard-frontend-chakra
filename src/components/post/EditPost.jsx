import React from 'react';

function EditPost(props) {
    const handleEdit = (e) => {
        e.preventDefault();
        props.editPost(e);
    };
    return (
        <div >
            <div >
                <div >
                    <div >
                        <form id={props?.post?.id} onSubmit={handleEdit} >
                            <div>
                                {/* <label className='w-[10%]'>title</label> */}
                                <input type="text" name='title' defaultValue={props?.post?.title} />
                            </div>
                            {/* <label>give it your best</label> */}
                            <textarea type="text" name='content' defaultValue={props?.post?.content} />
                            <div className='flex justify-center gap-16 '>
                                <button>edit</button>
                                <button
                                    onClick={() => { props.setShowEdit(false); }}>cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPost;