import '@mdxeditor/editor/style.css';
import styles from './editor.module.css';
import { BoldItalicUnderlineToggles, InsertTable, headingsPlugin, ListsToggle, MDXEditor, UndoRedo, listsPlugin, quotePlugin, tablePlugin, toolbarPlugin } from '@mdxeditor/editor';
import { useEffect, useRef } from 'react';

export default function MdxEditor({ value, setValue }) {
    const editorRef = useRef(null)
    useEffect(() => {
        editorRef.current?.setMarkdown(value)
    }, [value])
    const handleMarkdown = () => {
        const currentMarkdown = editorRef.current.getMarkdown();
        setValue(currentMarkdown);
    }
    return (
        <MDXEditor
            className={styles.editor}
            markdown=""
            ref={editorRef}
            onChange={() => { handleMarkdown() }}
            plugins={
                [
                    tablePlugin(),
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <>
                                {' '}
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <InsertTable />
                                <ListsToggle />
                            </>
                        )
                    })
                ]}
        />)
}