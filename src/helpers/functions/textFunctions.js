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

export const validateEmailAddress = (emailAddress) => {
    var atSymbol = emailAddress.indexOf("@");
    var dotSymbol = emailAddress.lastIndexOf(".");
    var spaceSymbol = emailAddress.indexOf(" ");

    if ((atSymbol != -1) &&
        (atSymbol != 0) &&
        (dotSymbol != -1) &&
        (dotSymbol != 0) &&
        (dotSymbol > atSymbol + 1) &&
        (emailAddress.length > dotSymbol + 1) &&
        (spaceSymbol == -1)) {
        return true;
    } else {
        return false;
    }
}

export const validateIsNotEmpty = (value) => {
    value = value?.toString()
    if (!value || !value.trim()) {
        return false
    }
    return true
}

export const stringify = (object) => {
    return JSON.stringify(object)
}

export const parseString = (string) => {
    return JSON.parse(string)
}

export function getFileName(name) {
    const originalName = name?.split("_ON_")?.pop()
    if (originalName) {
        return originalName
    }
    return name
}

export function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

export const salaryPerAnnum = (rateperhour) => {
    const pA = (Math.round(rateperhour * 2080)).toString()
    if (pA.length > 3) {
        return Math.round(pA / 1000) + "K"
    } else {
        return pA
    }
}