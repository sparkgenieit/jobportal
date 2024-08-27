import { marked } from "marked";
import parse from 'html-react-parser';

export function markdownToText(markdownText) {
    return parse(marked(markdownText))
}

export function markdownToPlainText(markdownText, length) {
    let plainText = ""
    if (markdownText) {
        const htmlForm = marked(markdownText)
        const regex = /<[^>]*>|&#?[0-9]+;|&#x?[0-9a-fA-F]+;/g;
        plainText = htmlForm.replace(regex, '');
    }
    return plainText.length > length ? plainText.slice(0, length) + "..." : plainText
}