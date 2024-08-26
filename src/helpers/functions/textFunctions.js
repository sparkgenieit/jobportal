import { marked } from "marked";
import parse from 'html-react-parser';

export function markdownToText(markdownText) {
    return parse(marked(markdownText))
}