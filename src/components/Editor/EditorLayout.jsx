import React from 'react'
import * as C from '../../styles/CommonStyle';
import * as E from '../../styles/EditorStyle';

function EditorLayout() {
    return (
        <C.StMainSection>
            <E.StEditorForm>
                <E.StEditorInputSection>
                    <C.StEditorInput type="text" name="title" value={title} placeholder="제목" onChange={onChangeHandler} />
                    <C.StEditorTextarea type="text" name="content" value={content} placeholder="내용" onChange={onChangeHandler} />
                </E.StEditorInputSection>
                <E.StEditorButtonSection>
                    <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} $color={"gray"} $hover={"black"} onClick={handleCancelButtonClick}>취소</C.StButton>
                    <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} onClick={handleButtonClick}>{isEdit ? "수정" : "작성"}</C.StButton>
                </E.StEditorButtonSection>
            </E.StEditorForm>
        </C.StMainSection>
    )
}

export default EditorLayout